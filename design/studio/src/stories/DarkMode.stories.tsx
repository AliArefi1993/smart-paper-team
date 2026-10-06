import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScreenPreview } from "../ScreenPreview";

const meta = {
  // Stable ID preserves links in the original shipped handoffs.
  id: "proposals-app-wide-dark-mode",
  title: "Shipped interaction references/App-wide dark mode",
  component: ScreenPreview,
  args: {
    route: "/summaries",
    language: "both",
    variant: "baseline",
    width: "phone",
    theme: "dark",
  },
  argTypes: {
    route: { control: false, table: { disable: true } },
    variant: { control: false, table: { disable: true } },
    language: { control: "radio", options: ["both", "en", "fa"] },
    width: { control: "radio", options: ["phone", "wide"] },
    theme: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof ScreenPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SummariesPopulated: Story = { args: { route: "/summaries", variant: "baseline" } };
export const SummariesEmpty: Story = { args: { route: "/summaries", variant: "empty" } };
export const SummariesFiltered: Story = { args: { route: "/summaries", variant: "filtered" } };
export const ReportSelection: Story = { args: { route: "/export", variant: "report" } };
export const ExportLocked: Story = { args: { route: "/export", variant: "locked" } };
export const ImportReplace: Story = { args: { route: "/export", variant: "replace" } };
export const FinancePopulated: Story = { args: { route: "/finance", variant: "baseline" } };
export const FinanceLocked: Story = { args: { route: "/finance", variant: "locked" } };
export const IdeasPopulated: Story = { args: { route: "/ideas", variant: "baseline" } };
export const IdeasEmpty: Story = { args: { route: "/ideas", variant: "empty" } };
export const TimerRunning: Story = { args: { route: "/timer", variant: "running" } };
export const SettingsOverview: Story = { args: { route: "/settings", variant: "baseline" } };
export const PlannerThemeContinuity: Story = { args: { route: "/", variant: "baseline" } };
export const SummariesWide: Story = { args: { route: "/summaries", variant: "baseline", width: "wide" } };
export const ReportWide: Story = { args: { route: "/export", variant: "report", width: "wide" } };
