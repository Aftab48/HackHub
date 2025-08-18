"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"
import { X, Users, User } from "lucide-react"

interface EventRegistrationFormProps {
  event: {
    id: string
    title: string
    tracks: string[]
    maxParticipants?: string
  }
  onClose: () => void
  onSubmit: (registration: any) => void
}

export function EventRegistrationForm({ event, onClose, onSubmit }: EventRegistrationFormProps) {
  const { user } = useAuth()
  const [registrationType, setRegistrationType] = useState<"individual" | "team">("individual")
  const [formData, setFormData] = useState({
    participantName: user?.name || "",
    email: user?.email || "",
    phone: "",
    organization: "",
    experience: "",
    track: "",
    motivation: "",
    skills: [] as string[],
    dietaryRestrictions: "",
    emergencyContact: "",
    teamName: "",
    teamDescription: "",
    lookingForTeammates: false,
    preferredTeamSize: "4",
  })

  const [newSkill, setNewSkill] = useState("")
  const [error, setError] = useState("")

  const skillSuggestions = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "Machine Learning",
    "UI/UX Design",
    "Mobile Development",
    "Blockchain",
    "Data Science",
    "DevOps",
  ]

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, skill] }))
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.track) {
      setError("Please select a track")
      return
    }

    if (formData.skills.length === 0) {
      setError("Please add at least one skill")
      return
    }

    const registration = {
      ...formData,
      eventId: event.id,
      userId: user?.id,
      registrationType,
      registeredAt: new Date().toISOString(),
      status: "registered",
    }

    onSubmit(registration)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Register for {event.title}</CardTitle>
              <CardDescription>Complete your registration to join this event</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Registration Type */}
            <div className="space-y-3">
              <Label>Registration Type</Label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={registrationType === "individual" ? "default" : "outline"}
                  onClick={() => setRegistrationType("individual")}
                  className="flex-1"
                >
                  <User className="h-4 w-4 mr-2" />
                  Individual
                </Button>
                <Button
                  type="button"
                  variant={registrationType === "team" ? "default" : "outline"}
                  onClick={() => setRegistrationType("team")}
                  className="flex-1"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Team
                </Button>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.participantName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, participantName: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization/School</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData((prev) => ({ ...prev, organization: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Event Specific */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Event Details</h3>
              <div className="space-y-2">
                <Label htmlFor="track">Select Track</Label>
                <Select
                  value={formData.track}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, track: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your track" />
                  </SelectTrigger>
                  <SelectContent>
                    {event.tracks.map((track) => (
                      <SelectItem key={track} value={track}>
                        {track}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, experience: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (2-4 years)</SelectItem>
                    <SelectItem value="advanced">Advanced (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Skills & Technologies</Label>
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill(newSkill))}
                  />
                  <Button type="button" onClick={() => addSkill(newSkill)}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skillSuggestions.slice(0, 5).map((skill) => (
                    <Button
                      key={skill}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addSkill(skill)}
                      className="text-xs"
                    >
                      + {skill}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">Why do you want to participate?</Label>
                <Textarea
                  id="motivation"
                  value={formData.motivation}
                  onChange={(e) => setFormData((prev) => ({ ...prev, motivation: e.target.value }))}
                  placeholder="Tell us about your motivation and what you hope to achieve..."
                  rows={3}
                />
              </div>
            </div>

            {/* Team Information */}
            {registrationType === "team" && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Team Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="teamName">Team Name</Label>
                  <Input
                    id="teamName"
                    value={formData.teamName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, teamName: e.target.value }))}
                    placeholder="Enter your team name"
                    required={registrationType === "team"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teamDescription">Team Description</Label>
                  <Textarea
                    id="teamDescription"
                    value={formData.teamDescription}
                    onChange={(e) => setFormData((prev) => ({ ...prev, teamDescription: e.target.value }))}
                    placeholder="Describe your team's vision and approach..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teamSize">Preferred Team Size</Label>
                  <Select
                    value={formData.preferredTeamSize}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, preferredTeamSize: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 members</SelectItem>
                      <SelectItem value="3">3 members</SelectItem>
                      <SelectItem value="4">4 members</SelectItem>
                      <SelectItem value="5">5 members</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Individual looking for team */}
            {registrationType === "individual" && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lookingForTeammates"
                  checked={formData.lookingForTeammates}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, lookingForTeammates: checked as boolean }))
                  }
                />
                <Label htmlFor="lookingForTeammates">I'm looking for teammates</Label>
              </div>
            )}

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Additional Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dietary">Dietary Restrictions</Label>
                  <Input
                    id="dietary"
                    value={formData.dietaryRestrictions}
                    onChange={(e) => setFormData((prev) => ({ ...prev, dietaryRestrictions: e.target.value }))}
                    placeholder="Any dietary restrictions or allergies"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency">Emergency Contact</Label>
                  <Input
                    id="emergency"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData((prev) => ({ ...prev, emergencyContact: e.target.value }))}
                    placeholder="Emergency contact number"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                Complete Registration
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
