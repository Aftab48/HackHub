"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { Users, UserPlus, Mail, Crown, Settings, Search } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  email: string
  role: "leader" | "member"
  skills: string[]
  avatar?: string
  joinedAt: string
}

interface Team {
  id: string
  name: string
  description: string
  eventId: string
  eventTitle: string
  members: TeamMember[]
  maxMembers: number
  isOpen: boolean
  createdAt: string
}

export function TeamManagement() {
  const { user } = useAuth()
  const [inviteEmail, setInviteEmail] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data - in real app, this would come from your backend
  const [myTeams] = useState<Team[]>([
    {
      id: "1",
      name: "Team Alpha",
      description: "Building an AI-powered healthcare assistant",
      eventId: "1",
      eventTitle: "AI Innovation Hackathon 2024",
      maxMembers: 4,
      isOpen: true,
      createdAt: "2024-03-01T10:00:00Z",
      members: [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          role: "leader",
          skills: ["React", "Node.js", "AI/ML"],
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
          joinedAt: "2024-03-01T10:00:00Z",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          role: "member",
          skills: ["Python", "Machine Learning", "Data Science"],
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
          joinedAt: "2024-03-02T14:30:00Z",
        },
      ],
    },
  ])

  const [availableTeams] = useState<Team[]>([
    {
      id: "2",
      name: "Code Warriors",
      description: "Creating a decentralized social media platform",
      eventId: "2",
      eventTitle: "Web3 Developer Challenge",
      maxMembers: 5,
      isOpen: true,
      createdAt: "2024-03-05T09:00:00Z",
      members: [
        {
          id: "3",
          name: "Alex Johnson",
          email: "alex@example.com",
          role: "leader",
          skills: ["Solidity", "Web3", "React"],
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
          joinedAt: "2024-03-05T09:00:00Z",
        },
      ],
    },
    {
      id: "3",
      name: "Green Innovators",
      description: "Developing IoT solutions for environmental monitoring",
      eventId: "3",
      eventTitle: "Climate Tech Solutions",
      maxMembers: 4,
      isOpen: true,
      createdAt: "2024-03-10T11:00:00Z",
      members: [
        {
          id: "4",
          name: "Sarah Wilson",
          email: "sarah@example.com",
          role: "leader",
          skills: ["IoT", "Python", "Hardware"],
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
          joinedAt: "2024-03-10T11:00:00Z",
        },
        {
          id: "5",
          name: "Mike Brown",
          email: "mike@example.com",
          role: "member",
          skills: ["Embedded Systems", "C++", "Sensors"],
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
          joinedAt: "2024-03-11T16:20:00Z",
        },
      ],
    },
  ])

  const handleInviteMember = (teamId: string) => {
    if (!inviteEmail) return
    // In real app, send invitation
    console.log(`Inviting ${inviteEmail} to team ${teamId}`)
    setInviteEmail("")
  }

  const handleJoinTeam = (teamId: string) => {
    console.log(`Joining team ${teamId}`)
  }

  const filteredAvailableTeams = availableTeams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Team Management</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Manage your teams and find new teammates</p>
      </div>

      <Tabs defaultValue="my-teams" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2 h-auto">
          <TabsTrigger value="my-teams" className="text-xs sm:text-sm px-2 py-2">
            <span className="hidden sm:inline">My Teams ({myTeams.length})</span>
            <span className="sm:hidden">My Teams({myTeams.length})</span>
          </TabsTrigger>
          <TabsTrigger value="find-teams" className="text-xs sm:text-sm px-2 py-2">
            <span className="hidden sm:inline">Find Teams ({filteredAvailableTeams.length})</span>
            <span className="sm:hidden">Find Teams ({filteredAvailableTeams.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-teams" className="space-y-4 sm:space-y-6">
          {myTeams.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
                <Users className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
                <h3 className="text-base sm:text-lg font-medium mb-2">No teams yet</h3>
                <p className="text-sm sm:text-base text-muted-foreground text-center mb-4 px-4">
                  Join a team or create one when registering for an event
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {myTeams.map((team) => (
                <Card key={team.id}>
                  <CardHeader className="pb-3 sm:pb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-base sm:text-lg">
                          <span className="truncate">{team.name}</span>
                          <Badge variant="outline" className="text-xs w-fit">
                            <span className="truncate">{team.eventTitle}</span>
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-sm mt-1">{team.description}</CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" className="self-start sm:self-auto">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {team.members.length} / {team.maxMembers} members
                        </span>
                      </div>
                      <Badge variant={team.isOpen ? "default" : "secondary"} className="w-fit">
                        {team.isOpen ? "Open" : "Closed"}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-sm sm:text-base">Team Members</h4>
                      <div className="space-y-2">
                        {team.members.map((member) => (
                          <div
                            key={member.id}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg gap-3"
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm truncate">{member.name}</span>
                                  {member.role === "leader" && (
                                    <Crown className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                                  )}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {member.skills.slice(0, 2).map((skill) => (
                                    <Badge key={skill} variant="outline" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                  {member.skills.length > 2 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{member.skills.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground sm:ml-3">
                              {new Date(member.joinedAt).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {team.isOpen && team.members.length < team.maxMembers && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm sm:text-base">Invite Members</h4>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Input
                            placeholder="Enter email address"
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                            className="text-sm"
                          />
                          <Button onClick={() => handleInviteMember(team.id)} className="sm:w-auto">
                            <Mail className="h-4 w-4 mr-2" />
                            Invite
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="find-teams" className="space-y-4 sm:space-y-6">
          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search teams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 text-sm"
                />
              </div>
            </CardContent>
          </Card>

          {filteredAvailableTeams.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
                <Users className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
                <h3 className="text-base sm:text-lg font-medium mb-2">No teams found</h3>
                <p className="text-sm sm:text-base text-muted-foreground text-center px-4">
                  {searchQuery ? "Try adjusting your search terms" : "No teams are currently looking for members"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {filteredAvailableTeams.map((team) => (
                <Card key={team.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3 sm:pb-6">
                    <div className="flex justify-between items-start">
                      <div className="min-w-0 flex-1">
                        <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-base sm:text-lg">
                          <span className="truncate">{team.name}</span>
                          <Badge variant="outline" className="text-xs w-fit">
                            <span className="truncate">{team.eventTitle}</span>
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-sm mt-1">{team.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {team.members.length} / {team.maxMembers} members
                        </span>
                      </div>
                      <Badge variant="default" className="w-fit">
                        Looking for members
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Current Members</h4>
                      <div className="flex -space-x-2">
                        {team.members.slice(0, 3).map((member) => (
                          <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                        {team.members.length > 3 && (
                          <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                            +{team.members.length - 3}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Skills Needed</h4>
                      <div className="flex flex-wrap gap-1">
                        {["UI/UX", "Backend", "Mobile"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button onClick={() => handleJoinTeam(team.id)} className="w-full">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Request to Join
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
