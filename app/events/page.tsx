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
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EventsPage() {
  type Event = {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    participants: number;
    prizes: string;
    status: string;
    tags: string[];
  };

  const events = [
    {
      id: 1,
      title: "AI Innovation Hackathon 2024",
      description:
        "Build the future of AI with cutting-edge tools and technologies",
      date: "March 15-17, 2024",
      location: "San Francisco, CA",
      participants: 250,
      prizes: "$50,000",
      status: "upcoming",
      tags: ["AI", "Machine Learning", "Innovation"],
    },
    {
      id: 2,
      title: "Web3 Developer Challenge",
      description: "Create decentralized applications that change the world",
      date: "April 22-24, 2024",
      location: "Virtual Event",
      participants: 180,
      prizes: "$30,000",
      status: "registration-open",
      tags: ["Web3", "Blockchain", "DeFi"],
    },
    {
      id: 3,
      title: "Climate Tech Solutions",
      description: "Develop technology solutions for environmental challenges",
      date: "May 10-12, 2024",
      location: "Austin, TX",
      participants: 320,
      prizes: "$75,000",
      status: "upcoming",
      tags: ["Climate", "Sustainability", "GreenTech"],
    },
  ];

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClick = (item: Event) => {
    if (item.status === "upcoming") {
      setOpen(true);
    } else if (item.status === "registration-open") {
      router.push(`/events/${item.id}/register`);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Discover Events</h1>
          <p className="text-muted-foreground">
            Find and join amazing hackathons and tech events
          </p>
        </div>
        <Button className="mt-4 md:mt-0">Create Event</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge
                  variant={
                    event.status === "registration-open"
                      ? "default"
                      : "secondary"
                  }
                >
                  {event.status === "registration-open" ? "Open" : "Upcoming"}
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
                  {event.date}
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
                  <Trophy className="h-4 w-4" />
                  {event.prizes} in prizes
                </div>

                <div className="flex flex-wrap gap-1 mt-4">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button
                  className="w-full cursor-pointer mt-4"
                  onClick={() => handleClick(event)}
                >
                  {event.status === "registration-open"
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
