import type { Metadata } from "next"
import ComprehensiveAnalytics from "@/components/analytics/comprehensive-analytics"
import ProtectedRoute from "@/components/protected-route"

export const metadata: Metadata = {
  title: "Analytics - Hackathon Platform",
  description: "Comprehensive analytics and insights for your hackathon events",
}

export default function AnalyticsPage() {
  return (
    <ProtectedRoute allowedRoles={["organizer"]}>
      <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-2">
            Comprehensive insights and metrics for your hackathon events
          </p>
        </div>
        <ComprehensiveAnalytics />
      </div>
    </ProtectedRoute>
  )
}
