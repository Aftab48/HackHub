"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"
import { X, Upload, Github, LinkIcon, Video, ImageIcon, Loader2 } from "lucide-react"

interface ProjectSubmissionFormProps {
  eventId: string
  teamId?: string
  existingSubmission?: any
  onClose: () => void
  onSubmit: (submission: any) => void
}

export function ProjectSubmissionForm({
  eventId,
  teamId,
  existingSubmission,
  onClose,
  onSubmit,
}: ProjectSubmissionFormProps) {
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: existingSubmission?.title || "",
    description: existingSubmission?.description || "",
    category: existingSubmission?.category || "",
    track: existingSubmission?.track || "",
    githubUrl: existingSubmission?.githubUrl || "",
    demoUrl: existingSubmission?.demoUrl || "",
    videoUrl: existingSubmission?.videoUrl || "",
    presentationUrl: existingSubmission?.presentationUrl || "",
    technologies: existingSubmission?.technologies || [],
    challenges: existingSubmission?.challenges || "",
    accomplishments: existingSubmission?.accomplishments || "",
    learnings: existingSubmission?.learnings || "",
    nextSteps: existingSubmission?.nextSteps || "",
    additionalNotes: existingSubmission?.additionalNotes || "",
  })

  const [newTechnology, setNewTechnology] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState("")

  const steps = [
    { id: 1, title: "Project Details", description: "Basic information about your project" },
    { id: 2, title: "Links & Resources", description: "GitHub, demo, and presentation links" },
    { id: 3, title: "Project Story", description: "Challenges, accomplishments, and learnings" },
    { id: 4, title: "Review & Submit", description: "Final review before submission" },
  ]

  const categories = ["Web Application", "Mobile App", "AI/ML", "Blockchain", "IoT", "Game", "Other"]
  const tracks = ["AI/ML", "Web3", "Mobile", "IoT", "Climate Tech", "FinTech", "HealthTech"]

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData((prev) => ({ ...prev, technologies: [...prev.technologies, newTechnology.trim()] }))
      setNewTechnology("")
    }
  }

  const removeTechnology = (tech: string) => {
    setFormData((prev) => ({ ...prev, technologies: prev.technologies.filter((t) => t !== tech) }))
  }

  const handleFileUpload = async (file: File, type: string) => {
    setUploadProgress(0)
    // Simulate file upload
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // In real app, upload to your storage service
    setTimeout(() => {
      const mockUrl = `https://example.com/uploads/${file.name}`
      if (type === "video") {
        setFormData((prev) => ({ ...prev, videoUrl: mockUrl }))
      } else if (type === "presentation") {
        setFormData((prev) => ({ ...prev, presentationUrl: mockUrl }))
      }
    }, 2000)
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.title && formData.description && formData.category && formData.track
      case 2:
        return formData.githubUrl || formData.demoUrl
      case 3:
        return formData.challenges && formData.accomplishments
      default:
        return true
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length))
      setError("")
    } else {
      setError("Please fill in all required fields")
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    setError("")
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError("")

    try {
      // Simulate submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const submission = {
        ...formData,
        id: existingSubmission?.id || Date.now().toString(),
        eventId,
        teamId,
        userId: user?.id,
        submittedAt: new Date().toISOString(),
        status: "submitted",
        round: 1,
      }

      onSubmit(submission)
      onClose()
    } catch (err) {
      setError("Failed to submit project. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter your project title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what your project does and its main features..."
                rows={4}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="track">Track *</Label>
                <Select
                  value={formData.track}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, track: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select track" />
                  </SelectTrigger>
                  <SelectContent>
                    {tracks.map((track) => (
                      <SelectItem key={track} value={track}>
                        {track}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Technologies Used</Label>
              <div className="flex gap-2">
                <Input
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  placeholder="Add a technology"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                />
                <Button type="button" onClick={addTechnology}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                    {tech}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTechnology(tech)} />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub Repository *</Label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="githubUrl"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))}
                  placeholder="https://github.com/username/repository"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="demoUrl">Live Demo URL</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="demoUrl"
                  value={formData.demoUrl}
                  onChange={(e) => setFormData((prev) => ({ ...prev, demoUrl: e.target.value }))}
                  placeholder="https://your-demo.com"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="videoUrl">Demo Video</Label>
              <div className="space-y-2">
                <div className="relative">
                  <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="videoUrl"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, videoUrl: e.target.value }))}
                    placeholder="https://youtube.com/watch?v=... or upload file"
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">or</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("video-upload")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Video
                  </Button>
                  <input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "video")}
                  />
                </div>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="space-y-1">
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground">Uploading... {uploadProgress}%</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="presentationUrl">Presentation/Pitch Deck</Label>
              <div className="space-y-2">
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="presentationUrl"
                    value={formData.presentationUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, presentationUrl: e.target.value }))}
                    placeholder="https://docs.google.com/presentation/... or upload file"
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">or</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("presentation-upload")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                  <input
                    id="presentation-upload"
                    type="file"
                    accept=".pdf,.ppt,.pptx"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "presentation")}
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="challenges">Challenges Faced *</Label>
              <Textarea
                id="challenges"
                value={formData.challenges}
                onChange={(e) => setFormData((prev) => ({ ...prev, challenges: e.target.value }))}
                placeholder="What challenges did you encounter while building this project?"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accomplishments">Accomplishments *</Label>
              <Textarea
                id="accomplishments"
                value={formData.accomplishments}
                onChange={(e) => setFormData((prev) => ({ ...prev, accomplishments: e.target.value }))}
                placeholder="What are you most proud of accomplishing?"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="learnings">What You Learned</Label>
              <Textarea
                id="learnings"
                value={formData.learnings}
                onChange={(e) => setFormData((prev) => ({ ...prev, learnings: e.target.value }))}
                placeholder="What did you learn during this hackathon?"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nextSteps">Next Steps</Label>
              <Textarea
                id="nextSteps"
                value={formData.nextSteps}
                onChange={(e) => setFormData((prev) => ({ ...prev, nextSteps: e.target.value }))}
                placeholder="What's next for your project?"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => setFormData((prev) => ({ ...prev, additionalNotes: e.target.value }))}
                placeholder="Any additional information you'd like to share?"
                rows={3}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Review Your Submission</h3>
              <p className="text-muted-foreground">Please review all information before submitting</p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <strong>Title:</strong> {formData.title}
                  </div>
                  <div>
                    <strong>Category:</strong> {formData.category}
                  </div>
                  <div>
                    <strong>Track:</strong> {formData.track}
                  </div>
                  <div>
                    <strong>Technologies:</strong>{" "}
                    {formData.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="ml-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Links & Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {formData.githubUrl && (
                    <div>
                      <strong>GitHub:</strong> {formData.githubUrl}
                    </div>
                  )}
                  {formData.demoUrl && (
                    <div>
                      <strong>Demo:</strong> {formData.demoUrl}
                    </div>
                  )}
                  {formData.videoUrl && (
                    <div>
                      <strong>Video:</strong> {formData.videoUrl}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{existingSubmission ? "Edit Project Submission" : "Submit Your Project"}</CardTitle>
              <CardDescription>
                Step {currentStep} of {steps.length}: {steps[currentStep - 1].description}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-2 ${currentStep > step.id ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
              ))}
            </div>
            <Progress value={(currentStep / steps.length) * 100} className="h-2" />
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {renderStep()}

          <div className="flex justify-between pt-6">
            <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              Previous
            </Button>

            <div className="flex gap-2">
              {currentStep < steps.length ? (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {existingSubmission ? "Update Submission" : "Submit Project"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
