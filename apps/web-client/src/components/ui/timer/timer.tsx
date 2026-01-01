"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw } from "lucide-react"
import { H2 } from "../typography"

interface StopwatchState {
  isRunning: boolean
  elapsedTime: number 
}

export function Timer() {
  const [state, setState] = useState<StopwatchState>({
    isRunning: false,
    elapsedTime: 0,
  })

  useEffect(() => {
    if (!state.isRunning) return

    const interval = setInterval(() => {
      setState((prev) => ({
        ...prev,
        elapsedTime: prev.elapsedTime + 10,
      }))
    }, 10)

    return () => clearInterval(interval)
  }, [state.isRunning])

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const milliseconds = Math.floor((ms % 1000) / 10)

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(2, "0")}`
  }

  const handleStartPause = () => {
    setState((prev) => ({
      ...prev,
      isRunning: !prev.isRunning,
    }))
  }

  const handleReset = () => {
    setState({
      isRunning: false,
      elapsedTime: 0,
    })
  }

  return (
    <div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle><H2>Timer</H2></CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 flex flex-row justify-center gap-8">
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold font-mono text-primary">{formatTime(state.elapsedTime)}</div>
              <Badge variant={state.isRunning ? "default" : "secondary"} className="mx-auto">
                {state.isRunning ? "Running" : "Paused"}
              </Badge>
            </div>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleStartPause}
                size="lg"
                className="rounded-full w-12 h-12 p-0"
                aria-label={state.isRunning ? "Pause timer" : "Start timer"}
              >
                {state.isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>

              <Button
                onClick={handleReset}
                size="sm"
                variant="outline"
                className="rounded-full w-12 h-12 p-0 bg-transparent"
                aria-label="Reset timer"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
