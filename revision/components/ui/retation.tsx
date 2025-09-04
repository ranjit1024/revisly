"use client"

import { CartesianGrid, LabelList, Line, LineChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A line chart with a custom label"

const chartData = [
  { browser: "chrome", visitors: 100, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 30, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 10, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 80, fill: "var(--color-edge)" },
  { browser: "edge", visitors: 50, fill: "var(--color-edge)" },
  { browser: "edge", visitors: 30, fill: "var(--color-chrome)" },
  { browser: "edge", visitors: 100, fill: "var(--color-chrome)" },
  { browser: "edge", visitors: 10, fill: "var(--color-chrome)" },
  { browser: "edge", visitors: 50, fill: "var(--color-chrome)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "var(--chart-2)",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function Retation() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Cureent Revision</CardTitle>
        <CardDescription>Topic Name</CardDescription>
      </CardHeader>
      <CardContent className="h-45">
        <ChartContainer config={chartConfig} className="h-40 w-full">
          <LineChart
          
            height={10}
            accessibilityLayer
            data={chartData}
            margin={{
              top: 24,
              left: 24,
              right: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="visitors"
                  hideLabel
                />
              }
            />
            <Line
            
             
          
              dataKey="visitors"
              type="natural"
              stroke="var(--color-chart-5)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-chart-4)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                dataKey="browser"
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>

    </Card>
  )
}
