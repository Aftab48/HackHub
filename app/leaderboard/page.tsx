import type { Metadata } from "next"
import Leaderboard from "@/components/leaderboard/leaderboard"

export const metadata: Metadata = {
  title: "Leaderboard - Hackathon Platform",
  description: "View rankings and top performers across all tracks",
}

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <Leaderboard />
    </div>
  )
}
