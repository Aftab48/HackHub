// @/lib/utils.ts

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

//tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * JSON stringify with indentation (safe log/debug)
 */
export function toJson(value: any) {
  return JSON.stringify(value, null, 2);
}

/**
 * Parse JSON back into object
 */
export function fromJson<T = any>(str: string): T {
  return JSON.parse(str) as T;
}

/**
 * Convert string → Date (ISO or timestamp)
 */
export function toDate(str: string) {
  return new Date(str);
}

/**
 * Convert Date → string (ISO)
 */
export function dateToString(date: Date) {
  return date.toISOString();
}
