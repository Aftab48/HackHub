"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { EventRegistrationForm } from "@/components/registration/event-registration-form"
import { ProtectedRoute } from "@/components/protected-route"

export default function EventRegisterPage() {
  const params = useParams()
  const router = useRouter()
  const [showRegistrationForm, setShowRegistrationForm] = useState(true)

  // Mock event data - in real app, fetch based on params.id
  const event = {
    id: params.id as string,
    title: "AI Innovation Hackathon 2024",
    tracks: ["AI/ML", "Computer Vision", "NLP", "Robotics"],
    maxParticipants: "500",
  }

  const handleRegistrationSubmit = (registration: any) => {
    console.log("Registration submitted:", registration)
    // In real app, submit to backend
    router.push("/dashboard")
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        {showRegistrationForm && (
          <EventRegistrationForm event={event} onClose={() => router.back()} onSubmit={handleRegistrationSubmit} />
        )}
      </div>
    </ProtectedRoute>
  )
}
