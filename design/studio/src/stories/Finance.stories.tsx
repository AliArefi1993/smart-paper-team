import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScreenPreview } from "../ScreenPreview";

const meta = {
  title: "Shipped baselines/Finance",
  component: ScreenPreview,
  args: {
    route: "/finance",
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

export const Unlocked: Story = { args: { variant: "baseline" } };
export const Locked: Story = { args: { variant: "locked" } };
export const Empty: Story = { args: { variant: "empty" } };
export const EditIncome: Story = { args: { variant: "edit" } };
export const Validation: Story = { args: { variant: "invalid" } };
