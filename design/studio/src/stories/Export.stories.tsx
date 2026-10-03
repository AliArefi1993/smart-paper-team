import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScreenPreview } from "../ScreenPreview";

const meta = {
  title: "Shipped baselines/Export",
  component: ScreenPreview,
  args: {
    route: "/export",
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

export const Overview: Story = { args: { variant: "baseline" } };
export const Locked: Story = { args: { variant: "locked" } };
export const AiReport: Story = { args: { variant: "report" } };
export const ImportReplaceDecision: Story = { args: { variant: "replace" } };
export const Validation: Story = { args: { variant: "invalid" } };
