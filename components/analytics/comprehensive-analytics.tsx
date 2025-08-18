"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { Users, Trophy, Code, Activity, Star } from "lucide-react"

const registrationData = [
  { day: "Mon", registrations: 45 },
  { day: "Tue", registrations: 78 },
  { day: "Wed", registrations: 123 },
  { day: "Thu", registrations: 156 },
  { day: "Fri", registrations: 189 },
  { day: "Sat", registrations: 234 },
  { day: "Sun", registrations: 267 },
]

const trackData = [
  { name: "Web3 & Blockchain", value: 35, color: "#0ea5e9" },
  { name: "AI/ML", value: 28, color: "#f97316" },
  { name: "Mobile Development", value: 22, color: "#10b981" },
  { name: "IoT & Hardware", value: 15, color: "#8b5cf6" },
]

const submissionData = [
  { time: "9 AM", submissions: 12 },
  { time: "12 PM", submissions: 28 },
  { time: "3 PM", submissions: 45 },
  { time: "6 PM", submissions: 67 },
  { time: "9 PM", submissions: 89 },
  { time: "12 AM", submissions: 98 },
]

const engagementData = [
  { metric: "Chat Messages", value: 1247, change: "+12%" },
  { metric: "Team Formations", value: 89, change: "+8%" },
  { metric: "Project Views", value: 2341, change: "+15%" },
  { metric: "Mentor Sessions", value: 156, change: "+22%" },
]

export default function ComprehensiveAnalytics() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-muted-foreground">Total Participants</p>
                <p className="text-lg md:text-2xl font-bold">1,247</p>
                <p className="text-xs text-green-600">+12% from last event</p>
              </div>
              <Users className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-muted-foreground">Projects Submitted</p>
                <p className="text-lg md:text-2xl font-bold">298</p>
                <p className="text-xs text-green-600">+8% completion rate</p>
              </div>
              <Code className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-muted-foreground">Teams Formed</p>
                <p className="text-lg md:text-2xl font-bold">89</p>
                <p className="text-xs text-blue-600">Average 3.2 members</p>
              </div>
              <Trophy className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-muted-foreground">Avg. Score</p>
                <p className="text-lg md:text-2xl font-bold">8.4</p>
                <p className="text-xs text-green-600">+0.3 from last event</p>
              </div>
              <Star className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <div className="overflow-x-auto">
          <TabsList className="min-w-[400px] md:min-w-0">
            <TabsTrigger value="overview" className="text-xs md:text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="participants" className="text-xs md:text-sm">
              Participants
            </TabsTrigger>
            <TabsTrigger value="submissions" className="text-xs md:text-sm">
              Submissions
            </TabsTrigger>
            <TabsTrigger value="engagement" className="text-xs md:text-sm">
              Engagement
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Registration Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={registrationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Area type="monotone" dataKey="registrations" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Track Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={trackData}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                      fontSize={10}
                    >
                      {trackData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="participants" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Participant Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={registrationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Line type="monotone" dataKey="registrations" stroke="#f97316" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Demographics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Students</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Professionals</span>
                    <span>28%</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Freelancers</span>
                    <span>7%</span>
                  </div>
                  <Progress value={7} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg">Submission Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={submissionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="submissions" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {engagementData.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs md:text-sm font-medium text-muted-foreground">{item.metric}</p>
                      <p className="text-lg md:text-2xl font-bold">{item.value.toLocaleString()}</p>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {item.change}
                      </Badge>
                    </div>
                    <Activity className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
