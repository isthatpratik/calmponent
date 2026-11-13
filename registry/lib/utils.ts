import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Joins class names and resolves Tailwind CSS conflicts.
 * The last conflicting class wins: cn("p-2", "p-4") returns "p-4".
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
