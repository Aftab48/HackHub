// @lib/actions/auth.actions.ts

"use server";

import { mongoDb } from "@/db";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { signToken, verifyToken } from "@/lib/jwt";

interface User {
  _id?: ObjectId;
  email: string;
  name: string;
  password: string;
  role: "organizer" | "participant" | "judge";
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// ------------------
// 🔑 Cookie Helpers
// ------------------

async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

// ------------------
// 👤 Auth Actions
// ------------------

// Signup
export async function signupUser(user: User) {
  const users = mongoDb.collection<User>("users");

  const existing = await users.findOne({ email: user.email });
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const result = await users.insertOne({
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const newUser = {
    id: result.insertedId.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
  };

  const token = signToken(newUser);
  await setSessionCookie(token);

  return newUser;
}

// Login
export async function loginUser(email: string, password: string) {
  const users = mongoDb.collection<User>("users");

  const user = await users.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  const safeUser = {
    id: user._id?.toString()!,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
  };

  const token = signToken(safeUser);
  await setSessionCookie(token);

  return safeUser;
}

// Logout
export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

// Get user from session cookie
export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;

  return verifyToken<{
    id: string;
    email: string;
    name: string;
    role: "organizer" | "participant" | "judge";
    avatar?: string;
  }>(token);
}
