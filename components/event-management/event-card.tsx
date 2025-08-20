"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Settings,
  BarChart3,
} from "lucide-react";

interface EventCardProps {
  event: EventWithId;
  onManage: (eventId: string) => void;
  onAnalytics: (eventId: string) => void;
}

export function EventCard({ event, onManage, onAnalytics }: EventCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "upcoming":
        return "secondary";
      case "draft":
        return "outline";
      case "completed":
        return "secondary";
      default:
        return "outline";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3 md:pb-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant={getStatusColor(event.status!)} className="text-xs">
            {event.status}
          </Badge>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onAnalytics(event.id)}
              className="h-8 w-8 p-0"
            >
              <BarChart3 className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onManage(event.id)}
              className="h-8 w-8 p-0"
            >
              <Settings className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>
        </div>
        <CardTitle className="text-lg md:text-xl leading-tight">
          {event.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {event.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 md:space-y-3">
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
            <Calendar className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
            <span className="truncate">
              {formatDate(event.startDate)} - {formatDate(event.endDate)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
            <Users className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
            <span className="truncate">
              {event.participants} participants
              {event.maxParticipants && ` / ${event.maxParticipants} max`}
            </span>
          </div>
          {event.prizePool && (
            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
              <Trophy className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
              <span className="truncate">{event.prizePool} in prizes</span>
            </div>
          )}

          <div className="flex flex-wrap gap-1 mt-3 md:mt-4">
            {event.tracks.slice(0, 2).map((track) => (
              <Badge
                key={track}
                variant="outline"
                className="text-xs truncate max-w-[80px] md:max-w-none"
              >
                {track}
              </Badge>
            ))}
            {event.tracks.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{event.tracks.length - 2}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-4 pt-2 text-center">
            <div>
              <div className="text-lg md:text-2xl font-bold text-primary">
                {event.participants}
              </div>
              <div className="text-xs text-muted-foreground">Participants</div>
            </div>
            <div>
              <div className="text-lg md:text-2xl font-bold text-secondary">
                {event.submissions}
              </div>
              <div className="text-xs text-muted-foreground">Submissions</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
