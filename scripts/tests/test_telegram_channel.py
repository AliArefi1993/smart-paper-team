"""Offline regression tests for external publication/credential boundaries."""
import importlib.util
import io
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch, Mock
import urllib.error

spec = importlib.util.spec_from_file_location("telegram_channel", Path(__file__).parents[1] / "telegram-channel.py")
publisher = importlib.util.module_from_spec(spec)
spec.loader.exec_module(publisher)


class PublicationTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name).resolve()
        stdout = patch("sys.stdout", new_callable=io.StringIO)
        stdout.start()
        self.addCleanup(stdout.stop)
        self.ledger = self.root / "ledger.json"
        self.patch = patch.object(publisher, "LEDGER", self.ledger)
        self.patch.start()
        self.addCleanup(self.patch.stop)
        self.identity = {"channel_id": -100123}
        self.response = {"message_id": 12, "chat": {"id": -100123}}

    def send(self, pin=False):
        publisher.publish("fake-credential", self.identity, "welcome", "سلام", None, pin)

    @patch.object(publisher, "api")
    def test_completed_key_cannot_duplicate_or_change_content(self, api):
        api.return_value = self.response
        self.send()
        self.send()
        self.assertEqual(api.call_count, 1)
        with self.assertRaises(publisher.SafeError):
            publisher.publish("fake", self.identity, "welcome", "سلام دیگر", None, False)
        self.assertEqual(api.call_count, 1)

    @patch.object(publisher, "api", side_effect=publisher.SafeError("ambiguous delivery"))
    def test_ambiguous_delivery_blocks_resend(self, api):
        with self.assertRaises(publisher.SafeError):
            self.send()
        self.assertEqual(json.loads(self.ledger.read_text())["entries"]["welcome"]["status"], "pending")
        with self.assertRaises(publisher.SafeError):
            self.send()
        self.assertEqual(api.call_count, 1)

    @patch.object(publisher, "api")
    def test_failed_pin_retains_message_id_without_reposting(self, api):
        api.side_effect = [self.response, publisher.SafeError("pin failed")]
        with self.assertRaises(publisher.SafeError):
            self.send(pin=True)
        entry = json.loads(self.ledger.read_text())["entries"]["welcome"]
        self.assertEqual(entry["status"], "posted")
        self.assertEqual(entry["message_id"], 12)
        with self.assertRaises(publisher.SafeError):
            self.send(pin=True)
        self.assertEqual(api.call_count, 2)

    @patch.object(publisher, "api")
    def test_wrong_delivery_channel_cannot_be_marked_published(self, api):
        api.return_value = {"message_id": 12, "chat": {"id": -100999}}
        with self.assertRaises(publisher.SafeError):
            self.send()
        self.assertEqual(json.loads(self.ledger.read_text())["entries"]["welcome"]["status"], "pending")

    def test_concurrent_publication_lock_preserves_existing_lock(self):
        lock = self.ledger.with_suffix(".lock")
        lock.write_text("")
        with self.assertRaises(publisher.SafeError):
            self.send()
        self.assertTrue(lock.exists())

    def test_persian_prose_and_limits(self):
        text = self.root / "post.txt"
        text.write_text("سلام\nhttps://github.com/example/app")
        self.assertIn("سلام", publisher.persian_text(text, 100))
        text.write_text("سلام Download now")
        with self.assertRaises(publisher.SafeError):
            publisher.persian_text(text, 100)
        text.write_text("سلام " + "۱" * 100)
        with self.assertRaises(publisher.SafeError):
            publisher.persian_text(text, 100)

    def test_artifact_hash_mismatch_is_blocked(self):
        record = self.root / "releases/release.md"
        artifact = self.root / "releases/artifacts/test.apk"
        artifact.parent.mkdir(parents=True)
        artifact.write_bytes(b"wrong artifact")
        record.write_text("Status: Published\n| APK path | `releases/artifacts/test.apk` |\n| APK SHA-256 | `0000` |\n| APK size | 14 bytes |\n")
        with patch.object(publisher, "ROOT", self.root), patch.object(publisher.subprocess, "run", return_value=Mock(returncode=0)):
            with self.assertRaisesRegex(publisher.SafeError, "hash"):
                publisher.release_document(record)

    def test_credential_permissions_block_before_reading_token(self):
        config = self.root / ".env.telegram.local"
        config.write_text("dummy")
        config.chmod(0o644)
        with patch.object(publisher, "ROOT", self.root):
            with self.assertRaisesRegex(publisher.SafeError, "owner-only"):
                publisher.credentials()

    def test_http_error_does_not_expose_credential(self):
        secret = "not-a-real-secret"
        error = urllib.error.HTTPError("https://api.telegram.org/bot" + secret, 401, secret, {}, None)
        opener = Mock()
        opener.open.side_effect = error
        with patch.object(publisher.urllib.request, "build_opener", return_value=opener):
            with self.assertRaises(publisher.SafeError) as caught:
                publisher.api(secret, "getMe", {})
        self.assertNotIn(secret, str(caught.exception))
        self.assertIn("401", str(caught.exception))

    @patch.object(publisher, "api")
    def test_unexpected_bot_cannot_access_channel(self, api):
        api.return_value = {"username": "different_bot"}
        with self.assertRaises(publisher.SafeError):
            publisher.verify("fake")
        self.assertEqual(api.call_count, 1)


if __name__ == "__main__":
    unittest.main()
