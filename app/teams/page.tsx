import { TeamManagement } from "@/components/teams/team-management"
import { ProtectedRoute } from "@/components/protected-route"

export default function TeamsPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-4 sm:py-8 px-2 sm:px-4">
        <TeamManagement />
      </div>
    </ProtectedRoute>
  )
}
