import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScreenPreview } from "../ScreenPreview";

const meta = {
  title: "Shipped baselines/Settings",
  component: ScreenPreview,
  args: {
    route: "/settings",
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

export const Default: Story = { args: { variant: "baseline" } };
export const Edit: Story = { args: { variant: "edit" } };
export const Validation: Story = { args: { variant: "validation" } };
export const UnsavedDecision: Story = { args: { variant: "unsaved" } };
