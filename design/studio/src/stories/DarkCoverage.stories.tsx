import type { Meta, StoryObj } from "@storybook/react-vite";
import { DarkCoverage } from "../DarkCoverage";

const meta = {
  title: "Fixes/Dark coverage gaps",
  component: DarkCoverage,
  args: { language: "both", width: "phone", theme: "dark", coverage: "fixed" },
  argTypes: {
    language: { control: "radio", options: ["both", "en", "fa"] },
    width: { control: "radio", options: ["phone", "wide"] },
    theme: { control: "radio", options: ["light", "dark"] },
    coverage: { control: "radio", options: ["current", "fixed"] },
  },
} satisfies Meta<typeof DarkCoverage>;
export default meta;
type Story = StoryObj<typeof meta>;
export const CurrentLeaks: Story = { args: { coverage: "current" } };
export const FixedPhone: Story = {};
export const FixedWide: Story = { args: { width: "wide" } };
export const LightRegression: Story = { args: { theme: "light" } };
