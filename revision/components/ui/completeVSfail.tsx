"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Cell } from "recharts"
import { getCompleted, getFailed } from "@/lib/actions/dashBoard"
import { useState, useEffect } from "react"
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

const chartConfig = {
  count: {
    label: "Sessions",
  },
  completed: {
    label: "Completed",
    color: "hsl(173, 100%, 40%)",
  },
  failed: {
    label: "Failed",
    color: "hsl(0, 0%, 50%)",
  },
} satisfies ChartConfig

export function SuccessvsFail() {
  const [sessionData, setSessionData] = useState<{
    name: string
    count: number
    fill: string
  }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      try {
        const completed = await getCompleted()
        const failed = await getFailed()
        
        setSessionData([
          { name: "Completed", count: completed.length,fill:"#12436d" },
          { name: "Failed", count: failed.length, fill: "#f46a25" }
        ])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Attempted Vs Missed</CardTitle>
        <CardDescription>Session Attempted vs Session Missed</CardDescription>
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
                  labelKey="name"
                  nameKey="name"
                  indicator="line"
                />
              }
            />
            <Pie 
              data={sessionData} 
              dataKey="count" 
              nameKey="name"
              outerRadius={120}
            >
              {sessionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Total Session Attempted vs Total Session Missed <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total sessions attempted vs sessions missed
        </div>
      </CardFooter>
    </Card>
  )
}
