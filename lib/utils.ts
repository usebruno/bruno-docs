import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const displaySentenceWithKeyword = ({
  text,
  keyword,
}: {
  text: string;
  keyword: string;
}) => {
  const sentences = text.split(/[.!?]|\n/);
  for (const sentence of sentences) {
    if (sentence.toLowerCase().includes(keyword.toLowerCase())) {
      const words = sentence.split(/\s+/);
      const keywordIndex = words.findIndex((word) =>
        word.toLowerCase().includes(keyword.toLowerCase()),
      );
      const contextRange = 5; // Number of words before and after the keyword
      const startIndex = Math.max(0, keywordIndex - contextRange);
      const endIndex = Math.min(words.length - 1, keywordIndex + contextRange);
      const contextWords = words.slice(startIndex, endIndex + 1);
      return contextWords.join(" ");
    }
  }
  return;
};
