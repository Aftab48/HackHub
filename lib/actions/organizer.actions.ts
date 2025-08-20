"use server";

import { mongoDb } from "@/db";
import { ObjectId } from "mongodb";

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
  status?: "draft" | "active" | "completed" | "upcoming";
  participants?: number;
  submissions?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export async function createEvent(event: EventFormData, userId: string) {
  try {
    const events = mongoDb.collection<
      EventFormData & { organizerId: ObjectId }
    >("events");

    const now = new Date();

    const result = await events.insertOne({
      ...event,
      organizerId: new ObjectId(userId),
      status: event.status ?? "draft",
      participants: event.participants ?? 0,
      submissions: event.submissions ?? 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      id: result.insertedId.toString(),
      title: event.title,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      location: event.location,
      type: event.type,
      maxParticipants: event.maxParticipants,
      prizePool: event.prizePool,
      tracks: event.tracks,
      sponsors: event.sponsors,
      status: "draft",
      participants: 0,
      submissions: 0,
      createdAt: now,
      updatedAt: now,
    };
  } catch (err) {
    console.error("❌ Error creating event:", err);
    throw new Error("Failed to create event");
  }
}

export async function getEvents() {
  const events = mongoDb.collection<EventFormData & { _id?: ObjectId }>(
    "events"
  );
  const results = await events.find().toArray();

  return results.map((e) => ({
    id: e._id?.toString(),
    title: e.title,
    description: e.description,
    startDate: e.startDate,
    endDate: e.endDate,
    location: e.location,
    type: e.type,
    maxParticipants: e.maxParticipants,
    prizePool: e.prizePool,
    tracks: e.tracks,
    sponsors: e.sponsors,
    status: e.status ?? "draft",
    participants: e.participants ?? 0,
    submissions: e.submissions ?? 0,
    createdAt: e.createdAt,
    updatedAt: e.updatedAt,
  }));
}

export async function updateEventStatus(
  eventId: string,
  newStatus: EventStatus
) {
  const events = mongoDb.collection("events");

  await events.updateOne(
    { _id: new ObjectId(eventId) },
    { $set: { status: newStatus, updatedAt: new Date() } }
  );

  return { success: true };
}

export async function getEventsByOrganizer(userId: string) {
  // Find events where the user is the organizer
  const events = await mongoDb
    .collection("events")
    .find({ organizerId: new ObjectId(userId) })
    .toArray();

  // Convert to plain JS objects
  return events.map((e) => ({
    _id: e._id.toString(),
    title: e.title,
    description: e.description,
    startDate: new Date(e.startDate).toISOString(),
    endDate: new Date(e.endDate).toISOString(),
    location: e.location,
    type: e.type,
    maxParticipants: e.maxParticipants,
    prizePool: e.prizePool,
    tracks: e.tracks,
    sponsors: e.sponsors,
    status: e.status,
    participants: e.participants,
    submissions: e.submissions,
    createdAt: new Date(e.createdAt).toISOString(),
    updatedAt: new Date(e.updatedAt).toISOString(),
    organizerId: e.organizerId.toString(),
  }));
}
