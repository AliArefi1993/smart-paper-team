import type { Meta, StoryObj } from "@storybook/react-vite";
import { AuditFollowups } from "../AuditFollowups";
const meta = {
  title: "Proposals/Audit followups",
  component: AuditFollowups,
  args: {
    language: "en",
    width: "phone",
    theme: "light",
    screen: "ideas",
    start: "branch",
  },
  argTypes: {
    language: { control: "radio", options: ["en", "fa"] },
    width: { control: "radio", options: ["phone", "wide"] },
    theme: { control: "radio", options: ["light", "dark"] },
    screen: { control: "radio", options: ["ideas", "settings", "finance"] },
    start: {
      control: "select",
      options: [
        "new",
        "edit",
        "branch",
        "missing",
        "conflict",
        "error",
        "confirm",
        "saved",
        "invalid",
        "loading",
        "cleanup",
        "read-error",
        "note-error",
      ],
    },
  },
} satisfies Meta<typeof AuditFollowups>;
export default meta;
type Story = StoryObj<typeof meta>;
export const EnglishPhone: Story = {};
export const PersianPhoneDark: Story = {
  args: { language: "fa", theme: "dark", start: "edit" },
};
export const EnglishWideDark: Story = {
  args: { width: "wide", theme: "dark", start: "confirm" },
};
export const PersianWideLight: Story = {
  args: { language: "fa", width: "wide", start: "missing" },
};
export const NewRecovery: Story = { args: { start: "new" } };
export const StaleEdit: Story = { args: { start: "conflict" } };
export const StorageError: Story = { args: { start: "error" } };
export const SettingsLongPhone: Story = { args: { screen: "settings" } };
export const SettingsPersianDark: Story = {
  args: { screen: "settings", language: "fa", theme: "dark" },
};
export const SettingsInvalid: Story = {
  args: { screen: "settings", start: "invalid" },
};
export const FinanceConfirmation: Story = {
  args: { screen: "finance", start: "confirm" },
};
export const FinancePersianDark: Story = {
  args: { screen: "finance", start: "confirm", language: "fa", theme: "dark" },
};

export const CleanupFailure: Story = { args: { start: "cleanup" } };
export const ReadFailure: Story = { args: { start: "read-error", language: "fa" } };
export const NoteSaveFailure: Story = { args: { start: "note-error" } };
