"use client";

import { FileData } from "@/lib/types/fileCache";
import React from "react";
import { cn, displaySentenceWithKeyword } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import { HistoryItem } from "@/lib/types/history";

const FormattedSentence = ({
  sentence,
  keyword,
  className,
}: {
  sentence: string;
  keyword: string;
  className?: string;
}) => {
  const regex = new RegExp(keyword, "gi");
  const splitted = sentence.split(regex);
  return splitted ? (
    <Typography
      variant="muted"
      className={cn("mt-2 line-clamp-1 truncate", className)}
    >
      {splitted[0]}
      <strong className="text-amber-500">{keyword}</strong>
      {splitted[1]}
    </Typography>
  ) : (
    <Typography
      variant="muted"
      className={cn("mt-2 line-clamp-1 truncate", className)}
    >
      {sentence}
    </Typography>
  );
};

export const ResultItem = ({
  className,
  keyword,
  result,
  setOpen,
}: {
  className?: string;
  keyword: string;
  result: FileData;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const sentence = displaySentenceWithKeyword({
    text: result.content,
    keyword,
  });
  const computedHeight = sentence ? "h-20" : "h-12";
  const namePath = result.path?.split("/").slice(1).join(" > ");
  // {result.name?.replace("_", " ")}
  // a function to set the local storage and write path and name inside it
  const handleHistory = () => {
    const history = JSON.parse(localStorage.getItem("history") || "{}");
    history[result.path] = {
      name: result.name,
      path: result.path,
      timestamp: new Date().getTime(),
    } as HistoryItem;
    localStorage.setItem("history", JSON.stringify(history));
    setOpen(false);
  };
  return (
    <div className={cn(computedHeight, "flex items-center w-full")}>
      <div
        className={cn(
          computedHeight,
          "min-w-[2px] bg-slate-100 dark:bg-slate-600 mr-4",
        )}
      />
      <Button
        asChild
        variant="secondary"
        className={cn(
          sentence ? "h-18" : "h-10",
          "overflow-hidden flex items-center justify-start w-full px-3 my-1 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 group",
          className,
        )}
        onClick={handleHistory}
      >
        <Link href={`/${result.path}`}>
          <div className="flex items-center p-1 rounded-lg border bg-white dark:bg-slate-900 shadow-lg">
            <FileText height={20} width={20} strokeWidth={1} />
          </div>
          <div className="flex flex-col mx-4 items-start justify-center overflow-hidden grow">
            <Badge
              variant="secondary"
              className="bg-slate-200 dark:bg-slate-700 capitalize"
            >
              {namePath}
            </Badge>
            {sentence && (
              <FormattedSentence sentence={sentence} keyword={keyword} />
            )}
          </div>
          <ChevronRight height={20} width={20} strokeWidth={2} />
        </Link>
      </Button>
    </div>
  );
};
