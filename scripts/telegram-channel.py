#!/usr/bin/env python3
"""Publish reviewed Persian channel content; credentials stay local and unprinted."""
import argparse
from contextlib import contextmanager
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
import uuid

ROOT = Path(__file__).resolve().parent.parent
CHANNEL = "@smart_paper_app"
BOT = "smart_paper_smart_bot"
LEDGER = ROOT / "docs/growth/telegram-publications.json"


class SafeError(Exception):
    pass


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def credentials():
    path = ROOT / ".env.telegram.local"
    if path.stat().st_mode & 0o077:
        raise SafeError("Credential file must have owner-only permissions.")
    ignored = subprocess.run(["git", "check-ignore", "-q", str(path)], cwd=ROOT)
    if ignored.returncode:
        raise SafeError("Credential file must be excluded from Git.")
    config = dict(line.split("=", 1) for line in path.read_text().splitlines() if "=" in line)
    if config.get("TELEGRAM_CHANNEL") != CHANNEL or config.get("TELEGRAM_BOT_USERNAME") != BOT:
        raise SafeError("Unexpected bot/channel configuration.")
    token = config.get("TELEGRAM_BOT_TOKEN", "")
    if not re.fullmatch(r"[0-9]+:[A-Za-z0-9_-]+", token):
        raise SafeError("Missing or malformed local credential.")
    return token


def api(token, method, values, document=None):
    if document is None:
        body = urllib.parse.urlencode(values).encode()
        content_type = "application/x-www-form-urlencoded"
    else:
        boundary = uuid.uuid4().hex
        parts = []
        for name, value in values.items():
            parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="{name}"\r\n\r\n{value}\r\n'.encode())
        path, data = document
        parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="document"; filename="{path.name}"\r\nContent-Type: application/vnd.android.package-archive\r\n\r\n'.encode())
        parts.extend([data, f"\r\n--{boundary}--\r\n".encode()])
        body = b"".join(parts)
        content_type = "multipart/form-data; boundary=" + boundary
    request = urllib.request.Request(
        "https://api.telegram.org/bot" + token + "/" + method,
        data=body, headers={"Content-Type": content_type}, method="POST",
    )
    try:
        with urllib.request.build_opener(NoRedirect()).open(request, timeout=180 if document else 25) as response:
            result = json.load(response)
    except urllib.error.HTTPError as error:
        raise SafeError(f"Telegram {method} returned HTTP {error.code}; no automatic retry.") from None
    except Exception as error:
        reason = getattr(error, "reason", error)
        raise SafeError(f"Telegram {method} failed ({type(reason).__name__}); delivery may be unknown; no automatic retry.") from None
    if not result.get("ok"):
        raise SafeError(f"Telegram {method} rejected the request; no automatic retry.")
    return result["result"]


def verify(token):
    me = api(token, "getMe", {})
    if me.get("username") != BOT:
        raise SafeError("Authenticated bot does not match the expected publisher.")
    chat = api(token, "getChat", {"chat_id": CHANNEL})
    if chat.get("type") != "channel" or chat.get("username") != CHANNEL[1:]:
        raise SafeError("Target channel identity mismatch.")
    member = api(token, "getChatMember", {"chat_id": chat["id"], "user_id": me["id"]})
    if member.get("status") != "administrator" or not member.get("can_post_messages"):
        raise SafeError("Bot lacks channel administrator/posting permission.")
    return {"bot": BOT, "channel": CHANNEL, "channel_id": chat["id"],
            "can_edit_messages": bool(member.get("can_edit_messages")),
            "can_delete_messages": bool(member.get("can_delete_messages"))}


def local_path(value):
    path = (ROOT / value).resolve()
    if not path.is_relative_to(ROOT):
        raise SafeError("Content and release files must be inside the team workspace.")
    return path


def persian_text(path, limit):
    text = path.read_text().strip()
    without_urls = re.sub(r"https://[^\s]+", "", text)
    if not re.search(r"[\u0600-\u06ff]", text) or re.search(r"[A-Za-z]", without_urls):
        raise SafeError("Channel prose must be Persian; Latin text is permitted only inside URLs.")
    if len(text.encode("utf-16-le")) // 2 > limit:
        raise SafeError("Channel text exceeds Telegram's message/caption limit.")
    if re.search(r"\d{6,}:[A-Za-z0-9_-]{20,}", text):
        raise SafeError("Possible credential detected in outgoing text.")
    return text


def release_document(record):
    source = record.read_text()
    if not re.search(r"^Status: Published", source, re.M):
        raise SafeError("APK requires a published release record.")
    def field(label):
        match = re.search(r"^\| " + re.escape(label) + r" \| ([^|]+) \|", source, re.M)
        if not match:
            raise SafeError("Release record is missing an APK identity field.")
        return match[1].strip().strip("`")
    path = local_path(field("APK path"))
    if not path.is_relative_to(ROOT / "releases/artifacts") or path.suffix != ".apk":
        raise SafeError("APK must be a committed release artifact.")
    if not re.fullmatch(r"[A-Za-z0-9._-]+", path.name):
        raise SafeError("Invalid APK filename.")
    for item in (record, path):
        relative = str(item.relative_to(ROOT))
        tracked = subprocess.run(["git", "ls-files", "--error-unmatch", relative], cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        unchanged = subprocess.run(["git", "diff", "--quiet", "HEAD", "--", relative], cwd=ROOT)
        if tracked.returncode or unchanged.returncode:
            raise SafeError("Release record and APK must match committed HEAD.")
    data = path.read_bytes()
    digest = hashlib.sha256(data).hexdigest()
    if digest != field("APK SHA-256") or str(len(data)) != field("APK size").split()[0].replace(",", ""):
        raise SafeError("APK size/hash does not match the published release record.")
    return path, data


def save_ledger(value):
    temp = LEDGER.with_suffix(".tmp")
    temp.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n")
    os.replace(temp, LEDGER)


@contextmanager
def ledger_lock():
    path = LEDGER.with_suffix(".lock")
    try:
        fd = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    except FileExistsError:
        raise SafeError("Publisher lock exists; verify process ownership before clearing it.") from None
    os.close(fd)
    try:
        yield
    finally:
        path.unlink()


def publish(token, identity, key, text, document, pin):
    payload = {"text": text, "apk_sha256": hashlib.sha256(document[1]).hexdigest() if document else None, "pin": pin}
    digest = hashlib.sha256(json.dumps(payload, sort_keys=True).encode()).hexdigest()
    with ledger_lock():
        ledger = json.loads(LEDGER.read_text()) if LEDGER.exists() else {"channel": CHANNEL, "entries": {}}
        if ledger.get("channel") != CHANNEL:
            raise SafeError("Publication ledger channel mismatch.")
        existing = ledger["entries"].get(key)
        if existing:
            if existing.get("payload_sha256") == digest and existing.get("status") == "published":
                print(json.dumps({"already_published": True, "link": existing["link"]}))
                return
            raise SafeError("Publication key already exists or delivery is uncertain; inspect channel and ledger before any retry.")
        entry = {"status": "pending", "payload_sha256": digest, "attempted_at": datetime.now(timezone.utc).isoformat()}
        ledger["entries"][key] = entry
        save_ledger(ledger)  # Journal before sending: never blindly retry an ambiguous delivery.
        values = {"chat_id": identity["channel_id"], "disable_notification": "true", "protect_content": "false"}
        if document:
            values["caption"] = text
            result = api(token, "sendDocument", values, document)
            if result.get("document", {}).get("file_size") != len(document[1]):
                raise SafeError("Uploaded file response has an unexpected size; inspect channel before retry.")
        else:
            values.update({"text": text, "link_preview_options": json.dumps({"is_disabled": True})})
            result = api(token, "sendMessage", values)
        if result.get("chat", {}).get("id") != identity["channel_id"]:
            raise SafeError("Telegram response channel mismatch; inspect delivery before retry.")
        entry.update({"status": "posted", "message_id": result["message_id"], "link": f"https://t.me/{CHANNEL[1:]}/{result['message_id']}"})
        save_ledger(ledger)
        if pin:
            api(token, "pinChatMessage", {"chat_id": identity["channel_id"], "message_id": result["message_id"], "disable_notification": "true"})
        entry.update({"status": "published", "pinned": pin})
        save_ledger(ledger)
        print(json.dumps({"published": True, "link": entry["link"], "pinned": pin}))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=["verify", "preview", "publish"])
    parser.add_argument("--key")
    parser.add_argument("--text")
    parser.add_argument("--release-record", help="Attach the matching committed signed APK.")
    parser.add_argument("--pin", action="store_true")
    args = parser.parse_args()
    if args.command == "verify":
        print(json.dumps(verify(credentials()), ensure_ascii=False))
        return
    if not args.text or not args.key or not re.fullmatch(r"[a-z0-9-]+", args.key):
        raise SafeError("Preview/publish require --text and a stable lowercase --key.")
    document = release_document(local_path(args.release_record)) if args.release_record else None
    text = persian_text(local_path(args.text), 1024 if document else 4096)
    if args.command == "preview":
        print(json.dumps({"channel": CHANNEL, "key": args.key, "text": text, "apk": document[0].name if document else None, "pin": args.pin}, ensure_ascii=False))
        return
    token = credentials()
    identity = verify(token)
    if args.pin and not identity["can_edit_messages"]:
        raise SafeError("Pinning channel posts requires edit permission.")
    publish(token, identity, args.key, text, document, args.pin)


if __name__ == "__main__":
    try:
        main()
    except SafeError as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
    except Exception as error:
        print(f"Publisher stopped ({type(error).__name__}); details withheld to protect credentials.", file=sys.stderr)
        sys.exit(1)
