"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Trophy, TrendingUp, Download, X, BarChart3, Activity } from "lucide-react"

interface EventAnalyticsProps {
  eventId: string
  onClose: () => void
}

export function EventAnalytics({ eventId, onClose }: EventAnalyticsProps) {
  // Mock analytics data - in real app, this would come from your backend
  const analytics = {
    title: "AI Innovation Hackathon 2024",
    status: "active",
    totalParticipants: 247,
    totalTeams: 62,
    submissions: 45,
    completionRate: 73,
    registrationTrend: [
      { date: "Week 1", registrations: 45 },
      { date: "Week 2", registrations: 89 },
      { date: "Week 3", registrations: 156 },
      { date: "Week 4", registrations: 247 },
    ],
    trackDistribution: [
      { track: "AI/ML", participants: 89, percentage: 36 },
      { track: "Web3", participants: 67, percentage: 27 },
      { track: "Mobile", participants: 54, percentage: 22 },
      { track: "IoT", participants: 37, percentage: 15 },
    ],
    demographics: {
      students: 65,
      professionals: 30,
      others: 5,
    },
    engagement: {
      activeUsers: 189,
      avgSessionTime: "2h 34m",
      messagesSent: 1247,
      questionsAsked: 89,
    },
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Event Analytics
              </CardTitle>
              <CardDescription>{analytics.title}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalParticipants}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +12% from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Teams Formed</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalTeams}</div>
                <p className="text-xs text-muted-foreground">Avg 4 members per team</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Submissions</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.submissions}</div>
                <p className="text-xs text-muted-foreground">{analytics.completionRate}% completion rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.engagement.activeUsers}</div>
                <p className="text-xs text-muted-foreground">Last 24 hours</p>
              </CardContent>
            </Card>
          </div>

          {/* Registration Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Registration Progress</CardTitle>
              <CardDescription>Participant registration over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.registrationTrend.map((week, index) => (
                  <div key={week.date} className="flex items-center gap-4">
                    <div className="w-16 text-sm font-medium">{week.date}</div>
                    <div className="flex-1">
                      <Progress value={(week.registrations / analytics.totalParticipants) * 100} className="h-2" />
                    </div>
                    <div className="w-16 text-sm text-muted-foreground text-right">{week.registrations}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Track Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Track Distribution</CardTitle>
              <CardDescription>Participant distribution across event tracks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.trackDistribution.map((track) => (
                  <div key={track.track} className="flex items-center gap-4">
                    <div className="w-20 text-sm font-medium">{track.track}</div>
                    <div className="flex-1">
                      <Progress value={track.percentage} className="h-2" />
                    </div>
                    <div className="w-16 text-sm text-muted-foreground text-right">{track.participants}</div>
                    <Badge variant="outline" className="text-xs">
                      {track.percentage}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Engagement Metrics */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Participant Demographics</CardTitle>
                <CardDescription>Breakdown by participant type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Students</span>
                    <Badge variant="secondary">{analytics.demographics.students}%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Professionals</span>
                    <Badge variant="secondary">{analytics.demographics.professionals}%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Others</span>
                    <Badge variant="secondary">{analytics.demographics.others}%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Stats</CardTitle>
                <CardDescription>Platform usage and interaction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg Session Time</span>
                    <Badge variant="outline">{analytics.engagement.avgSessionTime}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Messages Sent</span>
                    <Badge variant="outline">{analytics.engagement.messagesSent}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Questions Asked</span>
                    <Badge variant="outline">{analytics.engagement.questionsAsked}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
