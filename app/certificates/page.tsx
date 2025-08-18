import type { Metadata } from "next"
import CertificateGenerator from "@/components/certificates/certificate-generator"
import ProtectedRoute from "@/components/protected-route"

export const metadata: Metadata = {
  title: "Certificates - Hackathon Platform",
  description: "Generate and manage certificates for hackathon participants",
}

export default function CertificatesPage() {
  return (
    <ProtectedRoute allowedRoles={["organizer"]}>
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Certificate Management</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            Generate and manage certificates for participants and winners
          </p>
        </div>
        <CertificateGenerator />
      </div>
    </ProtectedRoute>
  )
}
