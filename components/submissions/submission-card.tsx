"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Github, ExternalLink, Video, FileText, Edit, Eye } from "lucide-react"

interface SubmissionCardProps {
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
    status: string
    submittedAt: string
    teamName?: string
    teamMembers?: Array<{ name: string; avatar?: string }>
    score?: number
    feedback?: string
  }
  onEdit?: (submissionId: string) => void
  onView?: (submissionId: string) => void
  showActions?: boolean
}

export function SubmissionCard({ submission, onEdit, onView, showActions = true }: SubmissionCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "default"
      case "under-review":
        return "secondary"
      case "reviewed":
        return "outline"
      case "winner":
        return "default"
      default:
        return "outline"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <div className="flex gap-2">
            <Badge variant={getStatusColor(submission.status)}>{submission.status}</Badge>
            <Badge variant="outline">{submission.track}</Badge>
          </div>
          {submission.score && (
            <Badge variant="secondary" className="font-bold">
              {submission.score}/100
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl">{submission.title}</CardTitle>
        <CardDescription className="line-clamp-2">{submission.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          Submitted {formatDate(submission.submittedAt)}
        </div>

        {submission.teamName && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Team: {submission.teamName}</h4>
            <div className="flex -space-x-2">
              {submission.teamMembers?.slice(0, 4).map((member, index) => (
                <Avatar key={index} className="h-6 w-6 border-2 border-background">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              {submission.teamMembers && submission.teamMembers.length > 4 && (
                <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                  +{submission.teamMembers.length - 4}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Category:</span>
            <Badge variant="outline" className="text-xs">
              {submission.category}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-1">
            {submission.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {submission.technologies.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{submission.technologies.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {submission.githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={submission.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-1" />
                Code
              </a>
            </Button>
          )}
          {submission.demoUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={submission.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Demo
              </a>
            </Button>
          )}
          {submission.videoUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={submission.videoUrl} target="_blank" rel="noopener noreferrer">
                <Video className="h-4 w-4 mr-1" />
                Video
              </a>
            </Button>
          )}
          {submission.presentationUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={submission.presentationUrl} target="_blank" rel="noopener noreferrer">
                <FileText className="h-4 w-4 mr-1" />
                Slides
              </a>
            </Button>
          )}
        </div>

        {submission.feedback && (
          <div className="p-3 bg-muted rounded-lg">
            <h4 className="font-medium text-sm mb-1">Judge Feedback</h4>
            <p className="text-sm text-muted-foreground">{submission.feedback}</p>
          </div>
        )}

        {showActions && (
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => onView?.(submission.id)} className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
            {submission.status === "submitted" && (
              <Button variant="outline" size="sm" onClick={() => onEdit?.(submission.id)} className="flex-1">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
