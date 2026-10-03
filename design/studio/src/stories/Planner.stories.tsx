import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScreenPreview } from "../ScreenPreview";

const meta = {
  title: "Shipped baselines/Planner",
  component: ScreenPreview,
  args: { route: "/", language: "both", variant: "baseline", width: "phone" },
  argTypes: {
    route: { control: false, table: { disable: true } },
    variant: { control: false, table: { disable: true } },
    language: { control: "radio", options: ["both", "en", "fa"] },
    width: { control: "radio", options: ["phone", "wide"] },
  },
} satisfies Meta<typeof ScreenPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Populated: Story = { args: { variant: "baseline" } };
export const Sparse: Story = { args: { variant: "sparse" } };
export const ScheduleSheet: Story = { args: { variant: "schedule" } };
export const TemplateSheet: Story = { args: { variant: "template" } };
export const UnsavedDecision: Story = { args: { variant: "unsaved" } };
