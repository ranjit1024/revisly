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

export function SessionHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Last five session </CardTitle>
        <CardDescription>Score of last 5 session</CardDescription>
      </CardHeader>
      <CardContent className="">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            className="w-10"
            
            margin={{
              top: 20,
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
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={10} >
              <LabelList

                position="top"
                offset={12}
                className=""
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Showing total score for last 5 session
           <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
        </div>
      </CardFooter>
    </Card>
  )
}
