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
  status?: "draft" | "published";
  participants?: number;
  submissions?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export async function createEvent(event: EventFormData) {
  try {
    const events = mongoDb.collection<EventFormData & { _id?: ObjectId }>(
      "events"
    );

    const result = await events.insertOne({
      ...event,
      status: event.status ?? "draft",
      participants: event.participants ?? 0,
      submissions: event.submissions ?? 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      id: result.insertedId.toString(),
      ...event,
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
    ...e,
  }));
}
