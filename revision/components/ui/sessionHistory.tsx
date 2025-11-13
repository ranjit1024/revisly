"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { Last5Score } from "@/lib/actions/dashBoard"
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
import { useEffect, useState } from "react"


export const description = "A bar chart with a label"



const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#7F22FE",
  },
} satisfies ChartConfig

export function SessionHistory() {
  const [scores, setScores] = useState<{score:number|null,topic:string}[]>();
  useEffect(()=>{
    async function getData() {
      const data =await Last5Score();
      console.log(data)
      setScores(data)
    }
    getData()
  },[])
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
            data={scores}
            className="w-10"
            
            margin={{
              top: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
            className="w-fit h-fit"
              dataKey="topic"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
             
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="score" fill="var(--color-desktop)" radius={10} >
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
