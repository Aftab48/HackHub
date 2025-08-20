"use server";

import { mongoDb } from "@/db";

export async function testDb() {
  const testCol = mongoDb.collection("test");

  const insertRes = await testCol.insertOne({
    msg: "hello cosmos",
    ts: new Date(),
  });

  const found = await testCol.findOne({ _id: insertRes.insertedId });

  return {
    ok: true,
    insertedId: insertRes.insertedId.toString(),
    found: found
      ? {
          _id: found._id.toString(),
          msg: found.msg,
          ts: found.ts.toISOString(),
        }
      : null,
  };
}
