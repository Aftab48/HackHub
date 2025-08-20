// @/lib/server-utils.ts

import { ObjectId } from "mongodb";

/**
 * Convert a MongoDB document into a plain JSON-safe object.
 * - ObjectId → string
 * - Date → ISO string
 */
export function serializeDoc<T extends Record<string, any>>(doc: T | null) {
  if (!doc) return null;

  return Object.fromEntries(
    Object.entries(doc).map(([k, v]) => {
      if (v instanceof ObjectId) return [k, v.toString()];
      if (v instanceof Date) return [k, v.toISOString()];
      return [k, v];
    })
  ) as Record<string, any>;
}

/**
 * Convert multiple docs at once
 */
export function serializeDocs<T extends Record<string, any>>(docs: T[]) {
  return docs.map((d) => serializeDoc(d));
}

/**
 * Convert string → ObjectId
 */
export function toObjectId(str: string) {
  return new ObjectId(str);
}
