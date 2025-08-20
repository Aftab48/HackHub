"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Trophy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getEvents } from "@/lib/actions/organizer.actions";
import { formatDate } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { getRegisteredEventsForUser } from "@/lib/actions/participants.actions";

export default function EventsPage() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [events, setEvents] = useState<EventWithId[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error("❌ Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClick = (item: EventWithId) => {
    if (item.status === "upcoming") {
      setOpen(true);
    } else if (item.status === "active") {
      router.push(`/events/${item.id}/register`);
    }
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const eventsByStatus = {
    all: filteredEvents,
    active: filteredEvents.filter((e) => e.status === "active"),
    upcoming: filteredEvents.filter((e) => e.status === "upcoming"),
    draft: filteredEvents.filter((e) => e.status === "draft"),
    completed: filteredEvents.filter((e) => e.status === "completed"),
  };

  const { user } = useAuth();

  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    const fetchRegistrations = async () => {
      try {
        const events = await getRegisteredEventsForUser(user.id);
        const ids = events.map((e) => e._id); // extract only the IDs
        setRegisteredEventIds(ids);
      } catch (error) {
        console.error("❌ Failed to fetch user registrations:", error);
      }
    };

    fetchRegistrations();
  }, [user]);

  const userHasRegistered = (eventId: string) =>
    registeredEventIds.includes(eventId);

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Discover Events</h1>
          <p className="text-muted-foreground">
            Find and join amazing hackathons and tech events
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsByStatus.all
          .filter(
            (event) => event.status === "active" || event.status === "upcoming"
          )
          .sort((a, b) => {
            if (a.status === "active" && b.status !== "active") return -1;
            if (b.status === "active" && a.status !== "active") return 1;
            return 0;
          })
          .map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge
                    variant={
                      event.status === "active" ? "default" : "secondary"
                    }
                  >
                    {event.status === "active" ? "Open" : "Upcoming"}
                  </Badge>
                  <Trophy className="h-5 w-5 text-secondary" />
                </div>
                <CardTitle className="text-xl">{event.title}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formatDate(event.startDate)} - {formatDate(event.endDate)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {event.participants} participants
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Trophy className="h-4 w-4" />${event.prizePool} in prizes
                  </div>

                  <div className="flex flex-wrap gap-1 mt-4">
                    {event.tracks.map((track) => (
                      <Badge key={track} variant="outline" className="text-xs">
                        {track}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    className="w-full cursor-pointer mt-4"
                    onClick={() => handleClick(event)}
                    disabled={userHasRegistered(event.id)}
                  >
                    {userHasRegistered(event.id)
                      ? "Registered"
                      : event.status === "active"
                      ? "Register Now"
                      : "Learn More"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Details will be shared soon</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
