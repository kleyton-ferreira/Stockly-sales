"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartLegendContent,
} from "@/app/_components/ui/chart";
import { DayTotalRevenue } from "@/app/_data-access/dashboard/get-dashboard";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  totalRevenue: {
    label: "Receita",
    color: "#00A180", // ou qualquer cor, ex: "#00A180"
  },
} satisfies ChartConfig;

interface RevenueChartProps {
  data: DayTotalRevenue[];
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-0 w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartLegendContent />} />
        <Bar
          dataKey="totalRevenue"
          fill="var(--color-totalRevenue)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default RevenueChart;
