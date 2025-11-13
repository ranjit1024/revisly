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
    color: "teal",
  },
} satisfies ChartConfig

export function MSessionHistory() {
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
    <Card className="h-75">
      <CardHeader>
        <CardTitle>Last five session </CardTitle>
        <CardDescription>Score of last 5 session</CardDescription>
      </CardHeader>
      <CardContent className="">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={scores}
            className=""
            
            margin={{
              top:0
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
            className="w-fit h-fit "
              dataKey="topic"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="score" fill="var(--color-desktop)" radius={10} className="size-fit" >
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
