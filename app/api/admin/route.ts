// app/api/admin/populate-submissions/route.ts
import { mongoDb } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await mongoDb
      .collection("events")
      .find({ status: "active" })
      .toArray();

    const bulkUpdates = [];

    for (const event of events) {
      const participants = event.participants ?? 0;
      if (participants <= 0) continue;

      const submissions = Math.floor(Math.random() * (participants + 1)); // 0 to participants

      bulkUpdates.push({
        updateOne: {
          filter: { _id: event._id },
          update: { $set: { submissions } },
        },
      });
    }

    if (bulkUpdates.length > 0) {
      await mongoDb.collection("events").bulkWrite(bulkUpdates);
    }

    return NextResponse.json({
      success: true,
      updated: bulkUpdates.length,
      message: `✅ Populated submissions for ${bulkUpdates.length} active events.`,
    });
  } catch (err) {
    console.error("❌ Failed to update submissions:", err);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
