"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart with a label"

const chartData = [
  { month: "January", desktop: 10},
  { month: "February", desktop: 7 },
  { month: "March", desktop: 5 },
  { month: "April", desktop: 8 },
  { month: "May", desktop: 8 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#7F22FE",
  },
} satisfies ChartConfig

export function MSessionHistory() {
  return (
    <Card className="h-75">
      <CardHeader>
        <CardTitle>Last five session </CardTitle>
        <CardDescription>Score of last 5 session</CardDescription>
      </CardHeader>
      <CardContent className="">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            className="max-sm:mt-4 "
            
            margin={{
              top:0
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
            className="w-fit h-fit"
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={10} className="size-fit" >
              <LabelList

                position="top"
                offset={12}
                className="top-1"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
     
    </Card>
  )
}
