"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, Star, TrendingUp, Users, Code } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  name: string
  avatar: string
  score: number
  track: string
  team?: string
  change: number
  badges: string[]
}

const overallLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Team Innovators",
    avatar: "/diverse-professional-team.png",
    score: 95.8,
    track: "AI/ML",
    team: "Team Innovators",
    change: 2,
    badges: ["Innovation", "Technical Excellence"],
  },
  {
    rank: 2,
    name: "Blockchain Builders",
    avatar: "/interconnected-blocks.png",
    score: 94.2,
    track: "Web3",
    team: "Blockchain Builders",
    change: -1,
    badges: ["Best Design", "People's Choice"],
  },
  {
    rank: 3,
    name: "Mobile Masters",
    avatar: "/modern-smartphone-display.png",
    score: 92.7,
    track: "Mobile",
    team: "Mobile Masters",
    change: 1,
    badges: ["User Experience"],
  },
  {
    rank: 4,
    name: "Sarah Chen",
    avatar: "/diverse-woman-portrait.png",
    score: 91.5,
    track: "IoT",
    change: 0,
    badges: ["Solo Developer"],
  },
  {
    rank: 5,
    name: "Code Crushers",
    avatar: "/abstract-code-flow.png",
    score: 90.3,
    track: "Web3",
    team: "Code Crushers",
    change: 3,
    badges: ["Rising Star"],
  },
]

const trackLeaderboards = {
  "AI/ML": overallLeaderboard.filter((entry) => entry.track === "AI/ML"),
  Web3: overallLeaderboard.filter((entry) => entry.track === "Web3"),
  Mobile: overallLeaderboard.filter((entry) => entry.track === "Mobile"),
  IoT: overallLeaderboard.filter((entry) => entry.track === "IoT"),
}

export default function Leaderboard() {
  const [selectedTrack, setSelectedTrack] = useState<string>("overall")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />
    } else if (change < 0) {
      return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
    }
    return <div className="h-4 w-4" />
  }

  const renderLeaderboard = (entries: LeaderboardEntry[]) => (
    <div className="space-y-4">
      {entries.map((entry, index) => (
        <Card
          key={index}
          className={`transition-all hover:shadow-md ${entry.rank <= 3 ? "border-primary/20 bg-primary/5" : ""}`}
        >
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center justify-center w-8 sm:w-12">{getRankIcon(entry.rank)}</div>

              <Avatar className="h-8 w-8 sm:h-12 sm:w-12">
                <AvatarImage src={entry.avatar || "/placeholder.svg"} />
                <AvatarFallback>{entry.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm sm:text-base truncate">{entry.name}</h3>
                  {entry.team && (
                    <Badge variant="outline" className="text-xs hidden sm:inline-flex">
                      <Users className="h-3 w-3 mr-1" />
                      Team
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Badge variant="secondary" className="text-xs">
                    {entry.track}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {getChangeIcon(entry.change)}
                    {entry.change !== 0 && (
                      <span className={entry.change > 0 ? "text-green-600" : "text-red-600"}>
                        {Math.abs(entry.change)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="hidden sm:flex gap-1 mt-2">
                  {entry.badges.map((badge, badgeIndex) => (
                    <Badge key={badgeIndex} variant="outline" className="text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg sm:text-2xl font-bold text-primary">{entry.score}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Leaderboard</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Top performers across all tracks</p>
        </div>
        <Button variant="outline" className="text-sm bg-transparent">
          <Code className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Export Results</span>
          <span className="sm:hidden">Export</span>
        </Button>
      </div>

      <Tabs value={selectedTrack} onValueChange={setSelectedTrack}>
        <TabsList className="grid w-full grid-cols-5 sm:grid-cols-5 h-auto overflow-x-auto">
          <TabsTrigger value="overall" className="text-xs sm:text-sm px-2 sm:px-4">
            Overall
          </TabsTrigger>
          <TabsTrigger value="AI/ML" className="text-xs sm:text-sm px-2 sm:px-4">
            AI/ML
          </TabsTrigger>
          <TabsTrigger value="Web3" className="text-xs sm:text-sm px-2 sm:px-4">
            Web3
          </TabsTrigger>
          <TabsTrigger value="Mobile" className="text-xs sm:text-sm px-2 sm:px-4">
            Mobile
          </TabsTrigger>
          <TabsTrigger value="IoT" className="text-xs sm:text-sm px-2 sm:px-4">
            IoT
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overall">{renderLeaderboard(overallLeaderboard)}</TabsContent>

        {Object.entries(trackLeaderboards).map(([track, entries]) => (
          <TabsContent key={track} value={track}>
            {renderLeaderboard(entries)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
