import { MongoClient } from "mongodb";

export async function GET() {
  const uri = process.env.MONGODB_URI as string;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("admin");
    const result = await db.command({ ping: 1 });

    return Response.json({ success: true, result });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
