"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { createEvent } from "@/lib/actions/organizer.actions";

interface CreateEventFormProps {
  onClose: () => void;
  onSubmit: (event: any) => void;
}

export function CreateEventForm({ onClose }: CreateEventFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    type: "online" as "online" | "in-person" | "hybrid",
    maxParticipants: 0,
    prizePool: 0,
    tracks: [] as string[],
    sponsors: [] as string[],
  });

  const [newTrack, setNewTrack] = useState("");
  const [newSponsor, setNewSponsor] = useState("");

  const addTrack = () => {
    if (newTrack.trim() && !formData.tracks.includes(newTrack.trim())) {
      setFormData((prev) => ({
        ...prev,
        tracks: [...prev.tracks, newTrack.trim()],
      }));
      setNewTrack("");
    }
  };

  const removeTrack = (track: string) => {
    setFormData((prev) => ({
      ...prev,
      tracks: prev.tracks.filter((t) => t !== track),
    }));
  };

  const addSponsor = () => {
    if (newSponsor.trim() && !formData.sponsors.includes(newSponsor.trim())) {
      setFormData((prev) => ({
        ...prev,
        sponsors: [...prev.sponsors, newSponsor.trim()],
      }));
      setNewSponsor("");
    }
  };

  const removeSponsor = (sponsor: string) => {
    setFormData((prev) => ({
      ...prev,
      sponsors: prev.sponsors.filter((s) => s !== sponsor),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newEvent = await createEvent({
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        status: "draft",
        participants: 0,
        submissions: 0,
      });

      console.log("✅ Event created:", newEvent);
      onClose();
    } catch (err) {
      console.error("❌ Failed to create event:", err);
      alert("Failed to create event. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 md:p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
        <CardHeader className="pb-4 md:pb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg md:text-xl">
                Create New Event
              </CardTitle>
              <CardDescription className="text-sm md:text-base">
                Set up your hackathon or tech event
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-4 md:px-6">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm md:text-base">
                  Event Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="AI Innovation Hackathon"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm md:text-base">
                  Event Type
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      type: value as "online" | "in-person" | "hybrid",
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="in-person">In-Person</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm md:text-base">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe your event, goals, and what participants can expect..."
                rows={3}
                required
                className="text-sm md:text-base"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm md:text-base">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-sm md:text-base">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm md:text-base">
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  placeholder="San Francisco, CA or Virtual"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="maxParticipants"
                  className="text-sm md:text-base"
                >
                  Max Participants
                </Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  value={formData.maxParticipants}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      maxParticipants: Number(e.target.value),
                    }))
                  }
                  placeholder="500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prizePool" className="text-sm md:text-base">
                Prize Pool
              </Label>
              <Input
                id="prizePool"
                value={formData.prizePool}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    prizePool: Number(e.target.value),
                  }))
                }
                placeholder="$50,000"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm md:text-base">Event Tracks</Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  value={newTrack}
                  onChange={(e) => setNewTrack(e.target.value)}
                  placeholder="Add a track (e.g., AI/ML, Web3, Mobile)"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTrack())
                  }
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={addTrack}
                  className="w-full sm:w-auto"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tracks.map((track) => (
                  <Badge
                    key={track}
                    variant="secondary"
                    className="flex items-center gap-1 text-xs"
                  >
                    <span className="truncate max-w-[120px]">{track}</span>
                    <X
                      className="h-3 w-3 cursor-pointer flex-shrink-0"
                      onClick={() => removeTrack(track)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm md:text-base">Sponsors</Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  value={newSponsor}
                  onChange={(e) => setNewSponsor(e.target.value)}
                  placeholder="Add a sponsor"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addSponsor())
                  }
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={addSponsor}
                  className="w-full sm:w-auto"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.sponsors.map((sponsor) => (
                  <Badge
                    key={sponsor}
                    variant="outline"
                    className="flex items-center gap-1 text-xs"
                  >
                    <span className="truncate max-w-[120px]">{sponsor}</span>
                    <X
                      className="h-3 w-3 cursor-pointer flex-shrink-0"
                      onClick={() => removeSponsor(sponsor)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button type="submit" className="flex-1">
                Create Event
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 sm:flex-none bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
