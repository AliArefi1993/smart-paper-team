import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScreenPreview } from "../ScreenPreview";

const meta = {
  title: "Shipped baselines/Timer",
  component: ScreenPreview,
  args: {
    route: "/timer",
    language: "both",
    variant: "baseline",
    width: "phone",
  },
  argTypes: {
    route: { control: false, table: { disable: true } },
    variant: { control: false, table: { disable: true } },
    language: { control: "radio", options: ["both", "en", "fa"] },
    width: { control: "radio", options: ["phone", "wide"] },
  },
} satisfies Meta<typeof ScreenPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ready: Story = { args: { variant: "baseline" } };
export const Running: Story = { args: { variant: "running" } };
export const Paused: Story = { args: { variant: "paused" } };
export const Completed: Story = { args: { variant: "completed" } };
export const InvalidDuration: Story = { args: { variant: "invalid" } };
