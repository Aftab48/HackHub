"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateEventForm } from "@/components/event-management/create-event-form"
import { EventCard } from "@/components/event-management/event-card"
import { EventAnalytics } from "@/components/event-management/event-analytics"
import { ProtectedRoute } from "@/components/protected-route"
import { Plus, Search, Filter } from "lucide-react"

export default function EventManagePage() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "AI Innovation Hackathon 2024",
      description:
        "Build the future of AI with cutting-edge tools and technologies. Join developers, designers, and innovators.",
      startDate: "2024-03-15T09:00",
      endDate: "2024-03-17T18:00",
      location: "San Francisco, CA",
      type: "hybrid",
      participants: 247,
      maxParticipants: "500",
      prizePool: "$50,000",
      status: "active",
      submissions: 45,
      tracks: ["AI/ML", "Computer Vision", "NLP", "Robotics"],
    },
    {
      id: "2",
      title: "Web3 Developer Challenge",
      description:
        "Create decentralized applications that change the world. Focus on DeFi, NFTs, and blockchain innovation.",
      startDate: "2024-04-22T10:00",
      endDate: "2024-04-24T20:00",
      location: "Virtual Event",
      type: "online",
      participants: 189,
      maxParticipants: "300",
      prizePool: "$30,000",
      status: "upcoming",
      submissions: 0,
      tracks: ["Web3", "DeFi", "NFTs", "Smart Contracts"],
    },
    {
      id: "3",
      title: "Climate Tech Solutions",
      description: "Develop technology solutions for environmental challenges and sustainability.",
      startDate: "2024-05-10T08:00",
      endDate: "2024-05-12T19:00",
      location: "Austin, TX",
      type: "offline",
      participants: 0,
      maxParticipants: "400",
      prizePool: "$75,000",
      status: "draft",
      submissions: 0,
      tracks: ["Climate Tech", "Sustainability", "Green Energy", "IoT"],
    },
  ])

  const handleCreateEvent = (newEvent: any) => {
    setEvents((prev) => [newEvent, ...prev])
  }

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const eventsByStatus = {
    all: filteredEvents,
    active: filteredEvents.filter((e) => e.status === "active"),
    upcoming: filteredEvents.filter((e) => e.status === "upcoming"),
    draft: filteredEvents.filter((e) => e.status === "draft"),
    completed: filteredEvents.filter((e) => e.status === "completed"),
  }

  return (
    <ProtectedRoute requiredRole="organizer">
      <div className="container mx-auto py-4 md:py-8 px-2 md:px-4">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Event Management</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Create and manage your hackathons and tech events
            </p>
          </div>
          <Button onClick={() => setShowCreateForm(true)} className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-4 md:mb-6">
          <CardContent className="pt-4 md:pt-6">
            <div className="flex flex-col gap-3 md:flex-row md:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="w-full md:w-auto bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Events Tabs */}
        <Tabs defaultValue="all" className="space-y-4 md:space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-5 min-w-[500px] md:min-w-0">
              <TabsTrigger value="all" className="text-xs md:text-sm">
                All ({eventsByStatus.all.length})
              </TabsTrigger>
              <TabsTrigger value="active" className="text-xs md:text-sm">
                Active ({eventsByStatus.active.length})
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="text-xs md:text-sm">
                Upcoming ({eventsByStatus.upcoming.length})
              </TabsTrigger>
              <TabsTrigger value="draft" className="text-xs md:text-sm">
                Drafts ({eventsByStatus.draft.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-xs md:text-sm">
                Completed ({eventsByStatus.completed.length})
              </TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(eventsByStatus).map(([status, statusEvents]) => (
            <TabsContent key={status} value={status}>
              {statusEvents.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-8 md:py-12">
                    <div className="text-center">
                      <h3 className="text-base md:text-lg font-medium mb-2">No events found</h3>
                      <p className="text-sm md:text-base text-muted-foreground mb-4">
                        {status === "all"
                          ? "Create your first event to get started"
                          : `No ${status} events at the moment`}
                      </p>
                      {status === "all" && (
                        <Button onClick={() => setShowCreateForm(true)} className="w-full md:w-auto">
                          <Plus className="h-4 w-4 mr-2" />
                          Create Event
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {statusEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onManage={(eventId) => console.log("Manage event:", eventId)}
                      onAnalytics={(eventId) => setShowAnalytics(eventId)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Create Event Modal */}
        {showCreateForm && <CreateEventForm onClose={() => setShowCreateForm(false)} onSubmit={handleCreateEvent} />}

        {/* Analytics Modal */}
        {showAnalytics && <EventAnalytics eventId={showAnalytics} onClose={() => setShowAnalytics(null)} />}
      </div>
    </ProtectedRoute>
  )
}
