"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Cell } from "recharts"
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

export const description = "A bar chart"



const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartBarDefault({revisionData}:{revisionData:any}) {
  console.log(revisionData)
  return (
    <Card className="w-[100%] h-85 max-md:h-[10%] shadow-none bg-lime-50 border border-gray-50">
      <CardHeader>
        <CardTitle>Session score</CardTitle>
        <CardDescription>score of the Last 5 sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={revisionData} className="-mt-1 max-md:-mt-4">
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="topic"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice()}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
             <Bar dataKey="score" radius={13} barSize={40}>
             
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  )
}
