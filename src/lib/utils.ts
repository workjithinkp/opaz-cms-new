import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Replace pipe characters (|) with HTML line breaks (<br>)
 * Useful for content that uses | as a line break delimiter
 */
export function replaceLineBreaks(text: string | undefined | null): string {
  if (!text) return ''
  return text.replace(/\|/g, '<br>')
}
