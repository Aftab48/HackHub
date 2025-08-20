// Shared event data
interface EventFormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  type: "online" | "in-person" | "hybrid";
  maxParticipants: number;
  prizePool: number;
  tracks: string[];
  sponsors: string[];
  status?: EventStatus;
  participants?: number;
  submissions?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type EventStatus = "draft" | "active" | "completed" | "upcoming";

// This is only used on the SERVER (raw MongoDB objects)
type EventDb = EventFormData & { _id: ObjectId };

// This is what CLIENT components should use (serializable)
type EventWithId = EventFormData & { id: string };

interface EventRegistrationForm {
  participantName: string;
  email: string;
  phone: string;
  organization: string;
  experience: Experience;
  track: string;
  motivation: string;
  skills: string[];
  dietaryRestrictions: string;
  emergencyContact: string;
  teamName?: string;
  teamDescription?: string;
  lookingForTeammates?: boolean;
  teamSize?: string;
}

type Experience =
  | "Beginner (0-1 years)"
  | "Intermediate (2-4 years)"
  | "Advanced (5+ years)";

interface TeamForm {
  teamName: string;
  eventId: string;
  userId: string;
}
