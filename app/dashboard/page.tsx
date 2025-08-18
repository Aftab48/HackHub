"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Trophy, Settings, Plus, BarChart3 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    return <div>Loading...</div>
  }

  const renderDashboard = () => {
    switch (user.role) {
      case "organizer":
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Active Events</CardTitle>
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">+1 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Total Participants</CardTitle>
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">+180 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Submissions</CardTitle>
                  <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">+12 from yesterday</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Completion Rate</CardTitle>
                  <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">+5% from last event</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Recent Events</CardTitle>
                <CardDescription className="text-sm">Your latest hackathons and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { name: "AI Innovation Hackathon", status: "active", participants: 250 },
                    { name: "Web3 Developer Challenge", status: "upcoming", participants: 180 },
                    { name: "Climate Tech Solutions", status: "planning", participants: 0 },
                  ].map((event, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg gap-2 sm:gap-0"
                    >
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-sm sm:text-base truncate">{event.name}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">{event.participants} participants</p>
                      </div>
                      <Badge variant={event.status === "active" ? "default" : "secondary"} className="text-xs w-fit">
                        {event.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "participant":
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Events Joined</CardTitle>
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Lifetime participation</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Team Members</CardTitle>
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground">Current team size</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Submissions</CardTitle>
                  <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">Projects submitted</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">My Teams</CardTitle>
                <CardDescription className="text-sm">Current and past team memberships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { name: "Team Alpha", event: "AI Innovation Hackathon", status: "active" },
                    { name: "Code Warriors", event: "Web3 Developer Challenge", status: "registered" },
                    { name: "Green Innovators", event: "Climate Tech Solutions", status: "completed" },
                  ].map((team, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg gap-2 sm:gap-0"
                    >
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-sm sm:text-base truncate">{team.name}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{team.event}</p>
                      </div>
                      <Badge variant={team.status === "active" ? "default" : "secondary"} className="text-xs w-fit">
                        {team.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "judge":
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Events Judged</CardTitle>
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">Total events</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Projects Reviewed</CardTitle>
                  <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">Lifetime reviews</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Pending Reviews</CardTitle>
                  <Settings className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">Awaiting evaluation</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Judging Queue</CardTitle>
                <CardDescription className="text-sm">Projects awaiting your evaluation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { name: "AI-Powered Healthcare Assistant", team: "Team Alpha", event: "AI Innovation Hackathon" },
                    { name: "Decentralized Social Network", team: "Code Warriors", event: "Web3 Developer Challenge" },
                    { name: "Carbon Footprint Tracker", team: "Green Innovators", event: "Climate Tech Solutions" },
                  ].map((project, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg gap-2 sm:gap-0"
                    >
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-sm sm:text-base truncate">{project.name}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">
                          {project.team} • {project.event}
                        </p>
                      </div>
                      <Button size="sm" className="w-full sm:w-auto text-xs">
                        Review
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return <div>Invalid role</div>
    }
  }

  return (
    <div className="container mx-auto py-4 md:py-8 px-2 md:px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4 md:gap-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {user.role === "organizer" && "Organizer Dashboard"}
            {user.role === "participant" && "Participant Dashboard"}
            {user.role === "judge" && "Judge Dashboard"}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            {user.role === "organizer" && "Manage your events, participants, and analytics"}
            {user.role === "participant" && "Track your teams, submissions, and progress"}
            {user.role === "judge" && "Review projects and manage your judging queue"}
          </p>
        </div>
        {user.role === "organizer" && (
          <Button className="w-full md:w-auto text-sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        )}
      </div>

      {renderDashboard()}
    </div>
  )
}
