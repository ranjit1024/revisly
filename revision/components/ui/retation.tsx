"use client"
import {  Progress } from "@/lib/actions/dashBoard";
import { CartesianGrid, LabelList, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { JsonValue } from "@prisma/client/runtime/library";
interface sessionType {
   id: string;
        email: string;
        topic: string;
        time: Date;
         status: "PENDING" | "MISSED" | "COMPLETED";
        score: number;
        sessionNumber: number;
        revisionid: string;
        reminderDate: Date;
        answer: JsonValue | null;
}
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

import { useEffect, useState } from "react"
export const description = "A line chart with a custom label"
const chartConfig = {
  score: {
    label: "Score",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function Retation() {
  const [data,setData] = useState<sessionType[]|null>()
  useEffect(()=>{
    async function Data() {
      const reposense = await Progress();
      setData(reposense.completed)
    }
    Data()
  },[])
  const chartData = data;
  console.log(data)
  return (
    <ResponsiveContainer>
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Cureent Quiz Data</CardTitle>
        <CardDescription>All completed quiz result</CardDescription>
      </CardHeader>
      <CardContent className="h-[100%]">
        <ChartContainer config={chartConfig} className="h-60 w-full">
         <LineChart
            data={data ?? []}
            margin={{
              left:-30,
              bottom:0,
              top:22,
              right:10
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis 
              dataKey={"sessionNumber"}
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              
            />
            <YAxis
              
              tickLine={false}
              axisLine={false}
              tickMargin={14}
              
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelKey="sessionNumber"
                />
              }
            />
            <Line
              dataKey="score"
              type="natural"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={{
                fill: "var(--chart-1)",
                r: 4,
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
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>

    </Card>
    </ResponsiveContainer>
  )
}

// const chartData = [
//   { browser: "chrome", visitors: 100, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 30, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 10, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 80, fill: "var(--color-edge)" },
//   { browser: "edge", visitors: 50, fill: "var(--color-edge)" },
//   { browser: "edge", visitors: 30, fill: "var(--color-chrome)" },
//   { browser: "edge", visitors: 100, fill: "var(--color-chrome)" },
//   { browser: "edge", visitors: 10, fill: "var(--color-chrome)" },
//   { browser: "edge", visitors: 50, fill: "var(--color-chrome)" },
// ]