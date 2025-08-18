"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { JudgingQueue } from "@/components/judging/judging-queue"
import { ProtectedRoute } from "@/components/protected-route"
import { BarChart3, Clock, Trophy, Users, Star } from "lucide-react"

export default function JudgingPage() {
  const [selectedEvent, setSelectedEvent] = useState("1")

  // Mock events data
  const events = [
    {
      id: "1",
      title: "AI Innovation Hackathon 2024",
      status: "judging",
      totalSubmissions: 45,
      evaluatedSubmissions: 23,
      deadline: "2024-03-20T23:59:59Z",
    },
    {
      id: "2",
      title: "Web3 Developer Challenge",
      status: "upcoming",
      totalSubmissions: 32,
      evaluatedSubmissions: 0,
      deadline: "2024-04-25T23:59:59Z",
    },
  ]

  // Mock judging stats
  const judgingStats = {
    totalAssigned: 45,
    completed: 23,
    inProgress: 3,
    pending: 19,
    averageScore: 7.2,
    topScore: 9.4,
  }

  const currentEvent = events.find((e) => e.id === selectedEvent)

  return (
    <ProtectedRoute requiredRole="judge">
      <div className="container mx-auto py-4 md:py-8 px-2 md:px-4">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Judging Dashboard</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Evaluate hackathon submissions and provide feedback
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Badge variant="secondary" className="w-fit">
              Judge
            </Badge>
            <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
              <BarChart3 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">View Analytics</span>
              <span className="sm:hidden">Analytics</span>
            </Button>
          </div>
        </div>

        {/* Event Selection */}
        <Card className="mb-4 md:mb-6">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Select Event</CardTitle>
            <CardDescription className="text-sm">Choose an event to start judging submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((event) => (
                <Card
                  key={event.id}
                  className={`cursor-pointer transition-colors ${
                    selectedEvent === event.id ? "ring-2 ring-primary" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedEvent(event.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base md:text-lg truncate">{event.title}</CardTitle>
                        <CardDescription className="text-xs md:text-sm">
                          {event.evaluatedSubmissions} of {event.totalSubmissions} submissions evaluated
                        </CardDescription>
                      </div>
                      <Badge variant={event.status === "judging" ? "default" : "secondary"} className="w-fit text-xs">
                        {event.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs md:text-sm">
                        <span>Progress</span>
                        <span>{Math.round((event.evaluatedSubmissions / event.totalSubmissions) * 100)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${(event.evaluatedSubmissions / event.totalSubmissions) * 100}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                        <span className="truncate">Deadline: {new Date(event.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {currentEvent && currentEvent.status === "judging" && (
          <>
            {/* Judging Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs md:text-sm font-medium">Total Assigned</CardTitle>
                  <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg md:text-2xl font-bold">{judgingStats.totalAssigned}</div>
                  <p className="text-xs text-muted-foreground">Submissions to evaluate</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs md:text-sm font-medium">Completed</CardTitle>
                  <Trophy className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg md:text-2xl font-bold">{judgingStats.completed}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((judgingStats.completed / judgingStats.totalAssigned) * 100)}% complete
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs md:text-sm font-medium">Average Score</CardTitle>
                  <Star className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg md:text-2xl font-bold">{judgingStats.averageScore}</div>
                  <p className="text-xs text-muted-foreground">Out of 10</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs md:text-sm font-medium">Top Score</CardTitle>
                  <Star className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg md:text-2xl font-bold">{judgingStats.topScore}</div>
                  <p className="text-xs text-muted-foreground">Highest rated</p>
                </CardContent>
              </Card>
            </div>

            {/* Judging Queue */}
            <JudgingQueue eventId={selectedEvent} />
          </>
        )}

        {currentEvent && currentEvent.status === "upcoming" && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8 md:py-12 px-4">
              <Clock className="h-8 w-8 md:h-12 md:w-12 text-muted-foreground mb-4" />
              <h3 className="text-base md:text-lg font-medium mb-2 text-center">Judging Not Started</h3>
              <p className="text-sm md:text-base text-muted-foreground text-center mb-4">
                This event is not ready for judging yet. Check back after the submission deadline.
              </p>
              <p className="text-xs md:text-sm text-muted-foreground text-center">
                Deadline: {new Date(currentEvent.deadline).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </ProtectedRoute>
  )
}
