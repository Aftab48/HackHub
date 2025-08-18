"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProjectSubmissionForm } from "@/components/submissions/project-submission-form"
import { SubmissionCard } from "@/components/submissions/submission-card"
import { ProtectedRoute } from "@/components/protected-route"
import { Plus, Search } from "lucide-react"

export default function SubmissionsPage() {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false)
  const [editingSubmission, setEditingSubmission] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterTrack, setFilterTrack] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  // Mock submissions data
  const [submissions] = useState([
    {
      id: "1",
      title: "AI-Powered Healthcare Assistant",
      description:
        "A comprehensive healthcare assistant that uses machine learning to provide personalized health recommendations and symptom analysis.",
      category: "AI/ML",
      track: "AI/ML",
      technologies: ["Python", "TensorFlow", "React", "Node.js", "MongoDB"],
      githubUrl: "https://github.com/team/healthcare-ai",
      demoUrl: "https://healthcare-ai-demo.com",
      videoUrl: "https://youtube.com/watch?v=demo",
      presentationUrl: "https://docs.google.com/presentation/healthcare-ai",
      status: "submitted",
      submittedAt: "2024-03-15T14:30:00Z",
      teamName: "Team Alpha",
      teamMembers: [
        { name: "John Doe", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john" },
        { name: "Jane Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane" },
      ],
    },
    {
      id: "2",
      title: "Decentralized Social Network",
      description:
        "A blockchain-based social media platform that gives users complete control over their data and content.",
      category: "Blockchain",
      track: "Web3",
      technologies: ["Solidity", "React", "IPFS", "Ethereum", "Web3.js"],
      githubUrl: "https://github.com/team/decentral-social",
      demoUrl: "https://decentral-social.eth",
      status: "under-review",
      submittedAt: "2024-03-16T10:15:00Z",
      teamName: "Code Warriors",
      teamMembers: [{ name: "Alex Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex" }],
      score: 85,
      feedback: "Great concept and execution. The UI could be more intuitive, but the blockchain integration is solid.",
    },
    {
      id: "3",
      title: "Smart Environmental Monitor",
      description:
        "IoT-based environmental monitoring system that tracks air quality, temperature, and humidity in real-time.",
      category: "IoT",
      track: "Climate Tech",
      technologies: ["Arduino", "Python", "React", "InfluxDB", "Grafana"],
      githubUrl: "https://github.com/team/env-monitor",
      videoUrl: "https://youtube.com/watch?v=env-demo",
      status: "reviewed",
      submittedAt: "2024-03-14T16:45:00Z",
      teamName: "Green Innovators",
      teamMembers: [
        { name: "Sarah Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" },
        { name: "Mike Brown", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike" },
      ],
      score: 92,
      feedback: "Excellent project with real-world impact. Great documentation and presentation.",
    },
  ])

  const handleSubmissionSubmit = (submission: any) => {
    console.log("Submission:", submission)
    // In real app, submit to backend
  }

  const handleEditSubmission = (submissionId: string) => {
    setEditingSubmission(submissionId)
    setShowSubmissionForm(true)
  }

  const handleViewSubmission = (submissionId: string) => {
    console.log("View submission:", submissionId)
    // Navigate to detailed view
  }

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTrack = filterTrack === "all" || submission.track === filterTrack
    const matchesStatus = filterStatus === "all" || submission.status === filterStatus
    return matchesSearch && matchesTrack && matchesStatus
  })

  const submissionsByStatus = {
    all: filteredSubmissions,
    submitted: filteredSubmissions.filter((s) => s.status === "submitted"),
    "under-review": filteredSubmissions.filter((s) => s.status === "under-review"),
    reviewed: filteredSubmissions.filter((s) => s.status === "reviewed"),
    winner: filteredSubmissions.filter((s) => s.status === "winner"),
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-4 md:py-8 px-3 md:px-4 max-w-7xl">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
          <div className="w-full md:w-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Project Submissions</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Manage and track your hackathon project submissions
            </p>
          </div>
          <Button onClick={() => setShowSubmissionForm(true)} className="w-full md:w-auto mt-2 md:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            New Submission
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-4 md:mb-6">
          <CardContent className="pt-4 md:pt-6">
            <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search submissions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Select value={filterTrack} onValueChange={setFilterTrack}>
                  <SelectTrigger className="w-full sm:w-40 md:w-48">
                    <SelectValue placeholder="Filter by track" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tracks</SelectItem>
                    <SelectItem value="AI/ML">AI/ML</SelectItem>
                    <SelectItem value="Web3">Web3</SelectItem>
                    <SelectItem value="Mobile">Mobile</SelectItem>
                    <SelectItem value="Climate Tech">Climate Tech</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-40 md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="under-review">Under Review</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="winner">Winner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submissions Tabs */}
        <Tabs defaultValue="all" className="space-y-4 md:space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full min-w-max grid-cols-5 md:w-full">
              <TabsTrigger value="all" className="text-xs md:text-sm px-2 md:px-4">
                All ({submissionsByStatus.all.length})
              </TabsTrigger>
              <TabsTrigger value="submitted" className="text-xs md:text-sm px-2 md:px-4">
                Submitted ({submissionsByStatus.submitted.length})
              </TabsTrigger>
              <TabsTrigger value="under-review" className="text-xs md:text-sm px-2 md:px-4">
                Review ({submissionsByStatus["under-review"].length})
              </TabsTrigger>
              <TabsTrigger value="reviewed" className="text-xs md:text-sm px-2 md:px-4">
                Reviewed ({submissionsByStatus.reviewed.length})
              </TabsTrigger>
              <TabsTrigger value="winner" className="text-xs md:text-sm px-2 md:px-4">
                Winners ({submissionsByStatus.winner.length})
              </TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(submissionsByStatus).map(([status, statusSubmissions]) => (
            <TabsContent key={status} value={status}>
              {statusSubmissions.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-8 md:py-12">
                    <div className="text-center px-4">
                      <h3 className="text-base md:text-lg font-medium mb-2">No submissions found</h3>
                      <p className="text-sm md:text-base text-muted-foreground mb-4">
                        {status === "all"
                          ? "Submit your first project to get started"
                          : `No ${status.replace("-", " ")} submissions at the moment`}
                      </p>
                      {status === "all" && (
                        <Button onClick={() => setShowSubmissionForm(true)} className="w-full sm:w-auto">
                          <Plus className="h-4 w-4 mr-2" />
                          New Submission
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                /* Responsive grid layout for mobile screens */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {statusSubmissions.map((submission) => (
                    <SubmissionCard
                      key={submission.id}
                      submission={submission}
                      onEdit={handleEditSubmission}
                      onView={handleViewSubmission}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Submission Form Modal */}
        {showSubmissionForm && (
          <ProjectSubmissionForm
            eventId="1"
            teamId="1"
            existingSubmission={editingSubmission ? submissions.find((s) => s.id === editingSubmission) : undefined}
            onClose={() => {
              setShowSubmissionForm(false)
              setEditingSubmission(null)
            }}
            onSubmit={handleSubmissionSubmit}
          />
        )}
      </div>
    </ProtectedRoute>
  )
}
