import type { Metadata } from "next"
import RealTimeChat from "@/components/chat/real-time-chat"
import ProtectedRoute from "@/components/protected-route"

export const metadata: Metadata = {
  title: "Chat - Hackathon Platform",
  description: "Real-time communication with participants and teams",
}

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Real-time Chat</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Connect with participants, teams, and organizers
          </p>
        </div>
        <RealTimeChat />
      </div>
    </ProtectedRoute>
  )
}
