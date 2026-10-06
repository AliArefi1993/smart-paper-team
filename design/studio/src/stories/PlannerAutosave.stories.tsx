import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlannerAutosave } from "../PlannerAutosave";
const meta = {
  title: "Proposals/Planner automatic saving",
  component: PlannerAutosave,
  args: { language: "en", width: "phone", theme: "light", start: "saved" },
  argTypes: {
    language: { control: "radio", options: ["en", "fa"] },
    width: { control: "radio", options: ["phone", "wide"] },
    theme: { control: "radio", options: ["light", "dark"] },
    start: {
      control: "select",
      options: [
        "dirty",
        "saving",
        "saved",
        "error",
        "loading",
        "empty",
        "writing",
        "schedule",
      ],
    },
  },
} satisfies Meta<typeof PlannerAutosave>;
export default meta;
type Story = StoryObj<typeof meta>;
export const EnglishPhoneLight: Story = {};
export const PersianPhoneLight: Story = { args: { language: "fa" } };
export const EnglishPhoneDark: Story = { args: { theme: "dark" } };
export const PersianPhoneDark: Story = {
  args: { language: "fa", theme: "dark" },
};
export const EnglishWideLight: Story = { args: { width: "wide" } };
export const PersianWideLight: Story = {
  args: { width: "wide", language: "fa" },
};
export const EnglishWideDark: Story = {
  args: { width: "wide", theme: "dark" },
};
export const PersianWideDark: Story = {
  args: { width: "wide", language: "fa", theme: "dark" },
};
export const PendingChanges: Story = { args: { start: "dirty" } };
export const Saving: Story = { args: { start: "saving", language: "fa" } };
export const StorageError: Story = { args: { start: "error" } };
export const PersianStorageError: Story = {
  args: { start: "error", language: "fa", theme: "dark" },
};
export const FullWriting: Story = { args: { start: "writing" } };
export const PersianFullWriting: Story = {
  args: { start: "writing", language: "fa", theme: "dark" },
};
export const ScheduleDraft: Story = { args: { start: "schedule" } };
export const PersianScheduleDraft: Story = {
  args: { start: "schedule", language: "fa" },
};
export const Loading: Story = { args: { start: "loading" } };
export const EmptyWeek: Story = { args: { start: "empty" } };
