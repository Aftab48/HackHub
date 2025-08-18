"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"
import { X, Star, Github, ExternalLink, Video, FileText, Loader2 } from "lucide-react"

interface EvaluationFormProps {
  submission: {
    id: string
    title: string
    description: string
    category: string
    track: string
    technologies: string[]
    githubUrl?: string
    demoUrl?: string
    videoUrl?: string
    presentationUrl?: string
    teamName?: string
    teamMembers?: Array<{ name: string; avatar?: string }>
    challenges: string
    accomplishments: string
    learnings: string
    nextSteps: string
  }
  existingEvaluation?: any
  onClose: () => void
  onSubmit: (evaluation: any) => void
}

export function EvaluationForm({ submission, existingEvaluation, onClose, onSubmit }: EvaluationFormProps) {
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const [scores, setScores] = useState({
    innovation: existingEvaluation?.scores?.innovation || [7],
    technical: existingEvaluation?.scores?.technical || [7],
    design: existingEvaluation?.scores?.design || [7],
    impact: existingEvaluation?.scores?.impact || [7],
    presentation: existingEvaluation?.scores?.presentation || [7],
  })

  const [feedback, setFeedback] = useState({
    strengths: existingEvaluation?.feedback?.strengths || "",
    improvements: existingEvaluation?.feedback?.improvements || "",
    overall: existingEvaluation?.feedback?.overall || "",
    privateNotes: existingEvaluation?.feedback?.privateNotes || "",
  })

  const [recommendation, setRecommendation] = useState(existingEvaluation?.recommendation || "consider")

  const criteria = [
    {
      key: "innovation",
      title: "Innovation & Creativity",
      description: "How original and creative is the solution?",
      weight: 0.25,
    },
    {
      key: "technical",
      title: "Technical Implementation",
      description: "Quality of code, architecture, and technical execution",
      weight: 0.25,
    },
    {
      key: "design",
      title: "User Experience & Design",
      description: "Usability, interface design, and user experience",
      weight: 0.2,
    },
    {
      key: "impact",
      title: "Impact & Feasibility",
      description: "Potential real-world impact and market viability",
      weight: 0.2,
    },
    {
      key: "presentation",
      title: "Presentation Quality",
      description: "Clarity of explanation, demo quality, and communication",
      weight: 0.1,
    },
  ]

  const calculateOverallScore = () => {
    return criteria.reduce((total, criterion) => {
      return total + scores[criterion.key as keyof typeof scores][0] * criterion.weight
    }, 0)
  }

  const handleScoreChange = (criterionKey: string, value: number[]) => {
    setScores((prev) => ({ ...prev, [criterionKey]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError("")

    if (!feedback.overall.trim()) {
      setError("Overall feedback is required")
      setIsSubmitting(false)
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const evaluation = {
        id: existingEvaluation?.id || Date.now().toString(),
        submissionId: submission.id,
        judgeId: user?.id,
        judgeName: user?.name,
        scores,
        feedback,
        recommendation,
        overallScore: Math.round(calculateOverallScore() * 10) / 10,
        evaluatedAt: new Date().toISOString(),
        status: "completed",
      }

      onSubmit(evaluation)
      onClose()
    } catch (err) {
      setError("Failed to submit evaluation. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
      <Card className="w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <CardHeader className="pb-4 sm:pb-6">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg sm:text-xl truncate">Evaluate Project</CardTitle>
              <CardDescription className="text-sm">Provide detailed evaluation and feedback</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="shrink-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 sm:space-y-8">
          {/* Project Overview */}
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-lg sm:text-xl break-words">{submission.title}</CardTitle>
                  <CardDescription className="mt-2 text-sm break-words">{submission.description}</CardDescription>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Badge variant="outline" className="text-xs">
                    {submission.category}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {submission.track}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {submission.teamName && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm sm:text-base break-words">Team: {submission.teamName}</h4>
                  <div className="flex flex-wrap items-center gap-2">
                    {submission.teamMembers?.map((member, index) => (
                      <div key={index} className="flex items-center gap-2 min-w-0">
                        <Avatar className="h-5 w-5 sm:h-6 sm:w-6 shrink-0">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs sm:text-sm truncate">{member.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-medium text-sm sm:text-base">Technologies Used</h4>
                <div className="flex flex-wrap gap-1">
                  {submission.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                {submission.githubUrl && (
                  <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm bg-transparent">
                    <a href={submission.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span className="truncate">Code</span>
                    </a>
                  </Button>
                )}
                {submission.demoUrl && (
                  <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm bg-transparent">
                    <a href={submission.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span className="truncate">Demo</span>
                    </a>
                  </Button>
                )}
                {submission.videoUrl && (
                  <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm bg-transparent">
                    <a href={submission.videoUrl} target="_blank" rel="noopener noreferrer">
                      <Video className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span className="truncate">Video</span>
                    </a>
                  </Button>
                )}
                {submission.presentationUrl && (
                  <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm bg-transparent">
                    <a href={submission.presentationUrl} target="_blank" rel="noopener noreferrer">
                      <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span className="truncate">Slides</span>
                    </a>
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="font-medium mb-2 text-sm sm:text-base">Challenges Faced</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground break-words">{submission.challenges}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-sm sm:text-base">Accomplishments</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground break-words">{submission.accomplishments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scoring Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Evaluation Criteria</CardTitle>
              <CardDescription className="text-sm">Rate each criterion on a scale of 1-10</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {criteria.map((criterion) => (
                <div key={criterion.key} className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm sm:text-base break-words">{criterion.title}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground break-words">{criterion.description}</p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        Weight: {(criterion.weight * 100).toFixed(0)}%
                      </Badge>
                    </div>
                    <div className="text-center sm:text-right shrink-0">
                      <div className="text-xl sm:text-2xl font-bold text-primary">
                        {scores[criterion.key as keyof typeof scores][0]}
                      </div>
                      <div className="text-xs text-muted-foreground">/ 10</div>
                    </div>
                  </div>
                  <div className="px-1 sm:px-3">
                    <Slider
                      value={scores[criterion.key as keyof typeof scores]}
                      onValueChange={(value) => handleScoreChange(criterion.key, value)}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Poor (1)</span>
                      <span className="hidden sm:inline">Average (5)</span>
                      <span className="sm:hidden">Avg (5)</span>
                      <span className="hidden sm:inline">Excellent (10)</span>
                      <span className="sm:hidden">Exc (10)</span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-3 sm:p-4 bg-muted rounded-lg">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="font-medium text-sm sm:text-base">Overall Weighted Score:</span>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                    <span className="text-xl sm:text-2xl font-bold text-primary">
                      {calculateOverallScore().toFixed(1)}
                    </span>
                    <span className="text-muted-foreground text-sm sm:text-base">/ 10</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Detailed Feedback</CardTitle>
              <CardDescription className="text-sm">
                Provide constructive feedback to help participants improve
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="strengths" className="text-sm sm:text-base">
                  Strengths & Highlights
                </Label>
                <Textarea
                  id="strengths"
                  value={feedback.strengths}
                  onChange={(e) => setFeedback((prev) => ({ ...prev, strengths: e.target.value }))}
                  placeholder="What did the team do particularly well?"
                  rows={3}
                  className="text-sm resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="improvements" className="text-sm sm:text-base">
                  Areas for Improvement
                </Label>
                <Textarea
                  id="improvements"
                  value={feedback.improvements}
                  onChange={(e) => setFeedback((prev) => ({ ...prev, improvements: e.target.value }))}
                  placeholder="What could be improved or done differently?"
                  rows={3}
                  className="text-sm resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="overall" className="text-sm sm:text-base">
                  Overall Comments *
                </Label>
                <Textarea
                  id="overall"
                  value={feedback.overall}
                  onChange={(e) => setFeedback((prev) => ({ ...prev, overall: e.target.value }))}
                  placeholder="Provide your overall assessment and recommendations..."
                  rows={4}
                  required
                  className="text-sm resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="privateNotes" className="text-sm sm:text-base">
                  Private Notes (Internal Only)
                </Label>
                <Textarea
                  id="privateNotes"
                  value={feedback.privateNotes}
                  onChange={(e) => setFeedback((prev) => ({ ...prev, privateNotes: e.target.value }))}
                  placeholder="Internal notes for other judges and organizers..."
                  rows={2}
                  className="text-sm resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Recommendation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Final Recommendation</CardTitle>
              <CardDescription className="text-sm">Your recommendation for this submission</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <Button
                  type="button"
                  variant={recommendation === "winner" ? "default" : "outline"}
                  onClick={() => setRecommendation("winner")}
                  className="flex-1 text-xs sm:text-sm"
                >
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  <span className="truncate">Recommend as Winner</span>
                </Button>
                <Button
                  type="button"
                  variant={recommendation === "consider" ? "default" : "outline"}
                  onClick={() => setRecommendation("consider")}
                  className="flex-1 text-xs sm:text-sm"
                >
                  <span className="truncate">Consider for Awards</span>
                </Button>
                <Button
                  type="button"
                  variant={recommendation === "pass" ? "default" : "outline"}
                  onClick={() => setRecommendation("pass")}
                  className="flex-1 text-xs sm:text-sm"
                >
                  Pass
                </Button>
              </div>
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 text-sm">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {existingEvaluation ? "Update Evaluation" : "Submit Evaluation"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="text-sm bg-transparent">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
