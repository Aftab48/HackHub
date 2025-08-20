// @lib/actions/participants.actions.ts

"use server";

import { mongoDb } from "@/db";
import { ObjectId } from "mongodb";

export async function getEventById(id: string) {
  try {
    const event = await mongoDb
      .collection("events")
      .findOne({ _id: new ObjectId(id) });

    if (!event) throw new Error("Event not found");

    return {
      id: event._id.toString(),
      title: event.title,
      tracks: event.tracks,
      maxParticipants: event.maxParticipants,
      status: event.status,
    };
  } catch (err) {
    console.error("Failed to fetch event:", err);
    throw err;
  }
}

export async function saveRegistration(
  eventId: string,
  form: EventRegistrationForm,
  userId: string
) {
  const parsedEventId = new ObjectId(eventId);
  const parsedUserId = new ObjectId(userId);

  await mongoDb.collection("registrations").insertOne({
    ...form,
    eventId: parsedEventId,
    userId: parsedUserId,
    createdAt: new Date(),
  });

  return { success: true };
}

export async function getRegisteredEventsForUser(userId: string) {
  const registrations = await mongoDb
    .collection("registrations")
    .find({ userId: new ObjectId(userId) })
    .toArray();

  const eventIds = registrations.map((r) => r.eventId);

  const events = await mongoDb
    .collection("events")
    .find({ _id: { $in: eventIds } })
    .toArray();

  return events.map((e) => ({
    ...e,
    _id: e._id.toString(),
    startDate: new Date(e.startDate).toISOString(),
    endDate: new Date(e.endDate).toISOString(),
    createdAt: new Date(e.createdAt).toISOString(),
    updatedAt: new Date(e.updatedAt).toISOString(),
  }));
}

export async function createTeam(form: TeamForm) {
  try {
    const teams = mongoDb.collection("teams");

    const now = new Date();

    const result = await teams.insertOne({
      teamName: form.teamName,
      eventId: new ObjectId(form.eventId),
      members: [new ObjectId(form.userId)],
      status: "active",
      createdAt: now,
      updatedAt: now,
    });

    return {
      id: result.insertedId.toString(),
      teamName: form.teamName,
      eventId: form.eventId, // keep as string
      members: [form.userId], // convert to string array
      status: "active",
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };
  } catch (err) {
    console.error("❌ Failed to create team:", err);
    throw new Error("Failed to create team");
  }
}
