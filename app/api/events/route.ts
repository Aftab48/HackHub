import { NextResponse } from "next/server";
import { mongoDb } from "@/db";

export async function GET() {
  try {
    const events = mongoDb.collection("events");

    const sampleEvents = [
      {
        title: "Hackathon 2025",
        description: "A national hackathon for student innovators",
        startDate: new Date("2025-09-01"),
        endDate: new Date("2025-09-03"),
        location: "IIT Bombay, Mumbai, India",
        type: "in-person",
        maxParticipants: 300,
        prizePool: 50000,
        tracks: ["AI", "Web3"],
        sponsors: ["Google", "Meta"],
        submissions: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Online ML Challenge",
        description: "Machine learning challenge hosted virtually",
        startDate: new Date("2025-10-10"),
        endDate: new Date("2025-10-15"),
        location: "IIT Delhi, New Delhi, India",
        type: "online",
        maxParticipants: 500,
        prizePool: 20000,
        tracks: ["Machine Learning", "Data Science"],
        sponsors: ["AWS", "OpenAI"],
        submissions: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Hybrid Startup Hack",
        description: "A hybrid hackathon for budding entrepreneurs",
        startDate: new Date("2025-11-05"),
        endDate: new Date("2025-11-07"),
        location: "IIM Bangalore, Karnataka, India",
        type: "hybrid",
        maxParticipants: 200,
        prizePool: 30000,
        tracks: ["FinTech", "EdTech"],
        sponsors: ["Microsoft", "Infosys"],
        submissions: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Cybersecurity CTF",
        description: "Capture-the-flag competition on real-world cyber threats",
        startDate: new Date("2025-08-20"),
        endDate: new Date("2025-08-21"),
        location: "VIT Vellore, Tamil Nadu, India",
        type: "in-person",
        maxParticipants: 150,
        prizePool: 15000,
        tracks: ["Cybersecurity", "Ethical Hacking"],
        sponsors: ["Cisco", "Kaspersky"],
        submissions: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "AI for Social Good",
        description: "Hackathon focused on AI solutions for societal impact",
        startDate: new Date("2025-12-01"),
        endDate: new Date("2025-12-03"),
        location: "IIT Madras, Chennai, India",
        type: "hybrid",
        maxParticipants: 250,
        prizePool: 40000,
        tracks: ["Healthcare", "Environment"],
        sponsors: ["UNICEF", "Google Research"],
        submissions: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Robotics Innovation Fest",
        description: "Showcase and build robotics solutions in teams",
        startDate: new Date("2026-01-15"),
        endDate: new Date("2026-01-17"),
        location: "BITS Pilani, Rajasthan, India",
        type: "in-person",
        maxParticipants: 100,
        prizePool: 35000,
        tracks: ["Robotics", "Automation"],
        sponsors: ["Boston Dynamics", "Tata"],
        submissions: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Blockchain Buildathon",
        description: "Web3 hackathon to build decentralized apps",
        startDate: new Date("2025-09-25"),
        endDate: new Date("2025-09-27"),
        location: "IIT Kharagpur, West Bengal, India",
        type: "online",
        maxParticipants: 400,
        prizePool: 60000,
        tracks: ["Blockchain", "Smart Contracts"],
        sponsors: ["Polygon", "Coinbase"],
        submissions: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Green Energy Hack",
        description: "Hackathon to innovate clean and green energy solutions",
        startDate: new Date("2026-02-10"),
        endDate: new Date("2026-02-12"),
        location: "IISc Bangalore, Karnataka, India",
        type: "hybrid",
        maxParticipants: 180,
        prizePool: 45000,
        tracks: ["Renewable Energy", "Sustainability"],
        sponsors: ["Siemens", "Reliance"],
        submissions: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    let insertedCount = 0;

    for (const event of sampleEvents) {
      const exists = await events.findOne({ title: event.title });
      if (!exists) {
        await events.insertOne(event);
        insertedCount++;
      }
    }

    return NextResponse.json({
      message: "✅ Seeding completed",
      inserted: insertedCount,
    });
  } catch (err) {
    console.error("❌ Error seeding events:", err);
    return NextResponse.json(
      { error: "Failed to seed events" },
      { status: 500 }
    );
  }
}
