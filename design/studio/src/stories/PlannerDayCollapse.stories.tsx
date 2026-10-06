import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlannerDayCollapse } from "../PlannerDayCollapse";

const meta = {
  // Stable ID preserves links in the original shipped handoffs.
  id: "proposals-planner-day-minimization",
  title: "Shipped interaction references/Planner day minimization",
  component: PlannerDayCollapse,
  args: { language: "both", width: "phone", theme: "light", start: "selected" },
  argTypes: {
    language: { control: "radio", options: ["both", "en", "fa"] },
    width: { control: "radio", options: ["phone", "wide"] },
    theme: { control: "radio", options: ["light", "dark"] },
    start: {
      control: "select",
      options: [
        "selected",
        "all-collapsed",
        "unsaved",
        "empty",
        "loading",
        "load-error",
        "save-error",
      ],
    },
  },
} satisfies Meta<typeof PlannerDayCollapse>;
export default meta;
type Story = StoryObj<typeof meta>;
export const SelectedDay: Story = {};
export const AllDaysMinimized: Story = { args: { start: "all-collapsed" } };
export const UnsavedDraft: Story = { args: { start: "unsaved" } };
export const SaveError: Story = { args: { start: "save-error" } };
export const EmptyWeek: Story = { args: { start: "empty" } };
export const Loading: Story = { args: { start: "loading" } };
export const LoadError: Story = { args: { start: "load-error" } };
export const PhoneDark: Story = {
  args: { theme: "dark", start: "all-collapsed" },
};
export const WideLight: Story = { args: { width: "wide" } };
export const WideDark: Story = {
  args: { width: "wide", theme: "dark", start: "all-collapsed" },
};
