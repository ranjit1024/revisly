"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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

export const description = "A pie chart with stacked sections"

const desktopData = [
  { month: "january", desktop: 30, fill: "var(--color-january)" },
  { month: "february", desktop: 205, fill: "var(--color-february)" },
  
]

const mobileData = [
  { month: "january", mobile: 80, fill: "var(--color-january)" },
  { month: "february", mobile: 200, fill: "var(--color-february)" },
 
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Session",
  },
  mobile: {
    label: "Missed",
  },
  january: {
    label: "Completed",
    color: "var(--chart-3)",
  },
  february: {
    label: "Missed",
    color: "var(--chart-5)",
  },
  
} satisfies ChartConfig

export function SuccessvsFail() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Attempted Vs Missed</CardTitle>
        <CardDescription>session Attempted vs session missed</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelKey="visitors"
                  nameKey="month"
                  indicator="line"
                  labelFormatter={(_, payload) => {
                    return chartConfig[
                      payload?.[0].dataKey as keyof typeof chartConfig
                    ].label
                  }}
                />
              }
            />
            <Pie data={desktopData} dataKey="desktop" outerRadius={120} />
            <Pie
              data={mobileData}
              dataKey="mobile"
              innerRadius={3000}
              outerRadius={4000}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Total session Attempted vs Total session missed <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total session Attempeted Vs session missed
        </div>
      </CardFooter>
    </Card>
  )
}
