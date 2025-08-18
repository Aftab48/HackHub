"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EvaluationForm } from "./evaluation-form"
import { Clock, Users, Star, CheckCircle, AlertCircle } from "lucide-react"

interface JudgingQueueProps {
  eventId: string
}

export function JudgingQueue({ eventId }: JudgingQueueProps) {
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null)
  const [showEvaluationForm, setShowEvaluationForm] = useState(false)

  // Mock data - in real app, this would come from your backend
  const [submissions] = useState([
    {
      id: "1",
      title: "AI-Powered Healthcare Assistant",
      description:
        "A comprehensive healthcare assistant that uses machine learning to provide personalized health recommendations.",
      category: "AI/ML",
      track: "AI/ML",
      technologies: ["Python", "TensorFlow", "React", "Node.js"],
      githubUrl: "https://github.com/team/healthcare-ai",
      demoUrl: "https://healthcare-ai-demo.com",
      videoUrl: "https://youtube.com/watch?v=demo",
      teamName: "Team Alpha",
      teamMembers: [
        { name: "John Doe", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john" },
        { name: "Jane Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane" },
      ],
      challenges: "Integrating multiple ML models while maintaining performance",
      accomplishments: "Successfully created a working prototype with 85% accuracy",
      learnings: "Learned about model optimization and user experience design",
      nextSteps: "Plan to add more medical specialties and improve accuracy",
      submittedAt: "2024-03-15T14:30:00Z",
      status: "pending",
      priority: "high",
    },
    {
      id: "2",
      title: "Decentralized Social Network",
      description: "A blockchain-based social media platform that gives users complete control over their data.",
      category: "Blockchain",
      track: "Web3",
      technologies: ["Solidity", "React", "IPFS", "Ethereum"],
      githubUrl: "https://github.com/team/decentral-social",
      demoUrl: "https://decentral-social.eth",
      teamName: "Code Warriors",
      teamMembers: [{ name: "Alex Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex" }],
      challenges: "Handling scalability issues with blockchain transactions",
      accomplishments: "Built a fully functional decentralized platform",
      learnings: "Deep understanding of blockchain architecture",
      nextSteps: "Implement layer 2 solutions for better scalability",
      submittedAt: "2024-03-16T10:15:00Z",
      status: "in-progress",
      priority: "medium",
    },
    {
      id: "3",
      title: "Smart Environmental Monitor",
      description: "IoT-based environmental monitoring system that tracks air quality in real-time.",
      category: "IoT",
      track: "Climate Tech",
      technologies: ["Arduino", "Python", "React", "InfluxDB"],
      githubUrl: "https://github.com/team/env-monitor",
      videoUrl: "https://youtube.com/watch?v=env-demo",
      teamName: "Green Innovators",
      teamMembers: [
        { name: "Sarah Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" },
        { name: "Mike Brown", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike" },
      ],
      challenges: "Calibrating sensors for accurate readings",
      accomplishments: "Created a network of 10 monitoring stations",
      learnings: "Hardware-software integration best practices",
      nextSteps: "Scale to city-wide deployment",
      submittedAt: "2024-03-14T16:45:00Z",
      status: "completed",
      priority: "low",
      evaluation: {
        overallScore: 8.5,
        recommendation: "winner",
        evaluatedAt: "2024-03-17T09:30:00Z",
      },
    },
  ])

  const [evaluations] = useState([
    {
      submissionId: "3",
      overallScore: 8.5,
      recommendation: "winner",
      evaluatedAt: "2024-03-17T09:30:00Z",
    },
  ])

  const handleStartEvaluation = (submission: any) => {
    setSelectedSubmission(submission)
    setShowEvaluationForm(true)
  }

  const handleEvaluationSubmit = (evaluation: any) => {
    console.log("Evaluation submitted:", evaluation)
    // In real app, submit to backend
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "in-progress":
        return <AlertCircle className="h-4 w-4 text-blue-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const pendingSubmissions = submissions.filter((s) => s.status === "pending")
  const inProgressSubmissions = submissions.filter((s) => s.status === "in-progress")
  const completedSubmissions = submissions.filter((s) => s.status === "completed")

  const totalSubmissions = submissions.length
  const completedCount = completedSubmissions.length
  const progressPercentage = (completedCount / totalSubmissions) * 100

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Judging Progress</CardTitle>
          <CardDescription className="text-sm">Track your evaluation progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 md:space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs md:text-sm font-medium">Overall Progress</span>
              <span className="text-xs md:text-sm text-muted-foreground">
                {completedCount} of {totalSubmissions} evaluated
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
              <div>
                <div className="text-lg md:text-2xl font-bold text-yellow-600">{pendingSubmissions.length}</div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </div>
              <div>
                <div className="text-lg md:text-2xl font-bold text-blue-600">{inProgressSubmissions.length}</div>
                <div className="text-xs text-muted-foreground">In Progress</div>
              </div>
              <div>
                <div className="text-lg md:text-2xl font-bold text-green-600">{completedSubmissions.length}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submissions Tabs */}
      <Tabs defaultValue="pending" className="space-y-4 md:space-y-6">
        <TabsList className="grid w-full grid-cols-3 h-auto">
          <TabsTrigger value="pending" className="text-xs md:text-sm px-2 py-2">
            <span className="hidden sm:inline">Pending ({pendingSubmissions.length})</span>
            <span className="sm:hidden">Pending</span>
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="text-xs md:text-sm px-2 py-2">
            <span className="hidden sm:inline">In Progress ({inProgressSubmissions.length})</span>
            <span className="sm:hidden">Progress</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-xs md:text-sm px-2 py-2">
            <span className="hidden sm:inline">Completed ({completedSubmissions.length})</span>
            <span className="sm:hidden">Done</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-3 md:space-y-4">
          {pendingSubmissions.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8 md:py-12">
                <CheckCircle className="h-8 w-8 md:h-12 md:w-12 text-green-500 mb-4" />
                <h3 className="text-base md:text-lg font-medium mb-2">All caught up!</h3>
                <p className="text-sm md:text-base text-muted-foreground text-center">
                  No pending submissions to evaluate
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {pendingSubmissions.map((submission) => (
                <Card key={submission.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start">
                      <div className="flex flex-wrap items-center gap-2">
                        {getStatusIcon(submission.status)}
                        <Badge variant={getPriorityColor(submission.priority)} className="text-xs">
                          {submission.priority} priority
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {submission.track}
                        </Badge>
                      </div>
                      <Button onClick={() => handleStartEvaluation(submission)} size="sm" className="w-full sm:w-auto">
                        Start Evaluation
                      </Button>
                    </div>
                    <CardTitle className="text-lg md:text-xl truncate">{submission.title}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{submission.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-xs md:text-sm font-medium truncate">{submission.teamName}</span>
                        <div className="flex -space-x-1">
                          {submission.teamMembers?.slice(0, 3).map((member, index) => (
                            <Avatar key={index} className="h-5 w-5 md:h-6 md:w-6 border-2 border-background">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {submission.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {submission.technologies.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{submission.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="text-xs md:text-sm text-muted-foreground">
                        Submitted {new Date(submission.submittedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-3 md:space-y-4">
          {inProgressSubmissions.map((submission) => (
            <Card key={submission.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start">
                  <div className="flex flex-wrap items-center gap-2">
                    {getStatusIcon(submission.status)}
                    <Badge variant="secondary" className="text-xs">
                      In Progress
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {submission.track}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleStartEvaluation(submission)}
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    Continue
                  </Button>
                </div>
                <CardTitle className="text-lg md:text-xl truncate">{submission.title}</CardTitle>
                <CardDescription className="text-sm line-clamp-2">{submission.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs md:text-sm text-muted-foreground">
                  Started evaluation • {submission.teamName}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-3 md:space-y-4">
          {completedSubmissions.map((submission) => (
            <Card key={submission.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start">
                  <div className="flex flex-wrap items-center gap-2">
                    {getStatusIcon(submission.status)}
                    <Badge variant="outline" className="text-xs">
                      Completed
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {submission.track}
                    </Badge>
                    {submission.evaluation && (
                      <Badge
                        variant={
                          submission.evaluation.recommendation === "winner"
                            ? "default"
                            : submission.evaluation.recommendation === "consider"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {submission.evaluation.recommendation}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {submission.evaluation && (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{submission.evaluation.overallScore}</span>
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStartEvaluation(submission)}
                      className="w-full sm:w-auto"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-lg md:text-xl truncate">{submission.title}</CardTitle>
                <CardDescription className="text-sm line-clamp-2">{submission.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs md:text-sm text-muted-foreground">
                  Evaluated {submission.evaluation && new Date(submission.evaluation.evaluatedAt).toLocaleDateString()}{" "}
                  • {submission.teamName}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Evaluation Form Modal */}
      {showEvaluationForm && selectedSubmission && (
        <EvaluationForm
          submission={selectedSubmission}
          existingEvaluation={evaluations.find((e) => e.submissionId === selectedSubmission.id)}
          onClose={() => {
            setShowEvaluationForm(false)
            setSelectedSubmission(null)
          }}
          onSubmit={handleEvaluationSubmit}
        />
      )}
    </div>
  )
}
