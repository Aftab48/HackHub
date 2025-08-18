"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Award, Share2, Eye } from "lucide-react"

interface Certificate {
  id: string
  participantName: string
  eventName: string
  track: string
  achievement: string
  date: string
  rank?: number
}

export default function CertificateGenerator() {
  const [certificates] = useState<Certificate[]>([
    {
      id: "1",
      participantName: "Sarah Chen",
      eventName: "TechHack 2024",
      track: "AI/ML",
      achievement: "Winner",
      date: "2024-03-15",
      rank: 1,
    },
    {
      id: "2",
      participantName: "Alex Rodriguez",
      eventName: "TechHack 2024",
      track: "Web3",
      achievement: "Runner-up",
      date: "2024-03-15",
      rank: 2,
    },
    {
      id: "3",
      participantName: "Team Innovators",
      eventName: "TechHack 2024",
      track: "Mobile",
      achievement: "Best Innovation",
      date: "2024-03-15",
    },
  ])

  const [newCertificate, setNewCertificate] = useState({
    participantName: "",
    eventName: "TechHack 2024",
    track: "",
    achievement: "",
    customMessage: "",
  })

  const generateCertificate = () => {
    console.log("[v0] Generating certificate:", newCertificate)
    // Certificate generation logic would go here
  }

  const downloadCertificate = (certificateId: string) => {
    console.log("[v0] Downloading certificate:", certificateId)
    // Download logic would go here
  }

  const shareCertificate = (certificateId: string) => {
    console.log("[v0] Sharing certificate:", certificateId)
    // Share logic would go here
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Certificate Generator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Award className="h-4 w-4 sm:h-5 sm:w-5" />
              Generate Certificate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <Label htmlFor="participantName" className="text-sm">
                Participant Name
              </Label>
              <Input
                id="participantName"
                value={newCertificate.participantName}
                onChange={(e) =>
                  setNewCertificate((prev) => ({
                    ...prev,
                    participantName: e.target.value,
                  }))
                }
                placeholder="Enter participant name"
                className="text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventName" className="text-sm">
                Event Name
              </Label>
              <Input
                id="eventName"
                value={newCertificate.eventName}
                onChange={(e) =>
                  setNewCertificate((prev) => ({
                    ...prev,
                    eventName: e.target.value,
                  }))
                }
                className="text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="track" className="text-sm">
                Track
              </Label>
              <Select
                value={newCertificate.track}
                onValueChange={(value) =>
                  setNewCertificate((prev) => ({
                    ...prev,
                    track: value,
                  }))
                }
              >
                <SelectTrigger className="text-sm sm:text-base">
                  <SelectValue placeholder="Select track" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AI/ML">AI/ML</SelectItem>
                  <SelectItem value="Web3">Web3 & Blockchain</SelectItem>
                  <SelectItem value="Mobile">Mobile Development</SelectItem>
                  <SelectItem value="IoT">IoT & Hardware</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="achievement" className="text-sm">
                Achievement
              </Label>
              <Select
                value={newCertificate.achievement}
                onValueChange={(value) =>
                  setNewCertificate((prev) => ({
                    ...prev,
                    achievement: value,
                  }))
                }
              >
                <SelectTrigger className="text-sm sm:text-base">
                  <SelectValue placeholder="Select achievement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Winner">Winner</SelectItem>
                  <SelectItem value="Runner-up">Runner-up</SelectItem>
                  <SelectItem value="Third Place">Third Place</SelectItem>
                  <SelectItem value="Best Innovation">Best Innovation</SelectItem>
                  <SelectItem value="Best Design">Best Design</SelectItem>
                  <SelectItem value="People's Choice">People's Choice</SelectItem>
                  <SelectItem value="Participation">Participation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customMessage" className="text-sm">
                Custom Message (Optional)
              </Label>
              <Textarea
                id="customMessage"
                value={newCertificate.customMessage}
                onChange={(e) =>
                  setNewCertificate((prev) => ({
                    ...prev,
                    customMessage: e.target.value,
                  }))
                }
                placeholder="Add a custom message for the certificate"
                rows={3}
                className="text-sm sm:text-base"
              />
            </div>

            <Button onClick={generateCertificate} className="w-full text-sm sm:text-base">
              <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Generate Certificate
            </Button>
          </CardContent>
        </Card>

        {/* Certificate Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Certificate Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-primary/20 rounded-lg p-4 sm:p-8 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="space-y-2 sm:space-y-4">
                <Award className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-primary" />
                <h2 className="text-lg sm:text-2xl font-bold">Certificate of Achievement</h2>
                <p className="text-sm sm:text-lg">This is to certify that</p>
                <p className="text-lg sm:text-2xl font-bold text-primary truncate">
                  {newCertificate.participantName || "[Participant Name]"}
                </p>
                <p className="text-sm sm:text-lg">has successfully</p>
                <p className="text-base sm:text-xl font-semibold truncate">
                  {newCertificate.achievement || "[Achievement]"}
                </p>
                <p className="text-sm sm:text-lg">in the {newCertificate.track || "[Track]"} track</p>
                <p className="text-sm sm:text-lg">at {newCertificate.eventName}</p>
                {newCertificate.customMessage && (
                  <p className="text-xs sm:text-sm italic text-muted-foreground mt-2 sm:mt-4">
                    "{newCertificate.customMessage}"
                  </p>
                )}
                <div className="pt-2 sm:pt-4 border-t">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Generated on {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Existing Certificates */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Generated Certificates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg gap-3 sm:gap-4"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <Award className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base truncate">{cert.participantName}</h3>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {cert.track}
                      </Badge>
                      <span className="truncate">{cert.achievement}</span>
                      {cert.rank && (
                        <Badge variant="outline" className="text-xs">
                          Rank #{cert.rank}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm bg-transparent">
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => shareCertificate(cert.id)}
                    className="text-xs sm:text-sm"
                  >
                    <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Share
                  </Button>
                  <Button size="sm" onClick={() => downloadCertificate(cert.id)} className="text-xs sm:text-sm">
                    <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
