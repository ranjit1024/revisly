"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import {Pie, PieChart } from "recharts"
import { getCompleted, getFailed } from "@/lib/actions/dashBoard"
import { useState,useEffect } from "react"
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



const chartConfig = {

  session: {
    label: "Completed",
    color: "green",
  },
  fail: {
    label: "Failed",
    color: "red",
  },
 
  
} satisfies ChartConfig

export function SuccessvsFail() {
  const[sessionData, setSessionData] = useState<{
    count:number,
    fill:string
  }[]>([])
      useEffect(()=>{
        async function getData() {
          const completed = await getCompleted();
          const failed = await getFailed();
          setSessionData(prev => [...prev, {count:completed.length,fill:"green"},{count:failed.length,fill:"red"} ])
        }
        getData()

      },[])
      useEffect(()=>{
        console.log(sessionData)
      },[sessionData])
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
                  
                />
              }
            />
            <Pie data={sessionData} dataKey="count" outerRadius={120} />
         
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
