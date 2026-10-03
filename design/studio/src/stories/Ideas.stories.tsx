import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScreenPreview } from "../ScreenPreview";

const meta = {
  title: "Shipped baselines/Ideas",
  component: ScreenPreview,
  args: {
    route: "/ideas",
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

export const Populated: Story = { args: { variant: "baseline" } };
export const Empty: Story = { args: { variant: "empty" } };
export const NoSearchMatches: Story = { args: { variant: "search" } };
export const Edit: Story = { args: { variant: "edit" } };
export const DeleteDecision: Story = { args: { variant: "delete" } };
