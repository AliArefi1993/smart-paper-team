import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlannerCalm } from "../PlannerCalm";

const meta = {
  // Stable ID preserves links in the original shipped handoffs.
  id: "proposals-planner-calm-flow",
  title: "Shipped interaction references/Planner calm flow",
  component: PlannerCalm,
  args: { language: "both", start: "overview" },
  argTypes: {
    language: { control: "radio", options: ["both", "en", "fa"] },
    start: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof PlannerCalm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { args: { start: "overview" } };
export const MainOpen: Story = { args: { start: "main" } };
export const LastSectionOpen: Story = { args: { start: "last" } };
export const LongWriting: Story = { args: { start: "long" } };
export const SparseDay: Story = { args: { start: "sparse" } };
export const UnsavedChanges: Story = { args: { start: "unsaved" } };
export const SaveError: Story = { args: { start: "error" } };
