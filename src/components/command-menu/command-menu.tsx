"use client";

import React, { useEffect, useState } from "react";
import { CommandDialog, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { CommandIcon, Expand, Search, Shrink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import jsonFileCache from "@/lib/cache/fileCache.json";
import { FileCache, FileData } from "@/lib/types/fileCache";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { ResultGroup } from "@/components/command-menu/results/result-group";
import { History } from "@/components/command-menu/history/history";
import { HistoryType } from "@/lib/types/history";

export const CommandMenu = ({
  open,
  setOpen,
  fileCache,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fileCache: FileCache;
}) => {
  // const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<Record<string, FileData[]>>({});
  const [history, setHistory] = useState<HistoryType>({});
  useEffect(() => {
    // Filter fileCache based on the searchValue
    const filteredFiles = Object.values(fileCache).filter(
      (file) =>
        file.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        file.content.toLowerCase().includes(searchValue.toLowerCase()),
    );

    const groupedFiles = filteredFiles.reduce(
      (acc, file) => {
        const { parentName, ...rest } = file;
        if (!acc[parentName ?? ""]) {
          acc[parentName ?? ""] = [{ ...rest, parentName }];
        } else {
          acc[parentName ?? ""].push({ ...rest, parentName });
        }
        return acc;
      },
      {} as Record<string, FileData[]>,
    );
    setResults(groupedFiles);
  }, [searchValue, fileCache]);
  useEffect(() => {
    const localHistory = JSON.parse(localStorage.getItem("history") || "{}");
    setHistory(localHistory);
  }, []);
  const [expanded, setExpanded] = useState(false);
  return (
    <CommandDialog open={open} onOpenChange={setOpen} expanded={expanded}>
      <div className="flex items-center border-b-2 pl-3">
        <Search height={16} width={16} />
        <Input
          placeholder="Search in the documentation..."
          className="ml-1 py-6 border-0 rounded-none !shadow-none focus-visible:!shadow-none !ring-offset-0 !ring-0"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          variant="ghost"
          className="mr-12 px-2"
          size="icon"
          onClick={() => setExpanded((expanded) => !expanded)}
        >
          {expanded ? (
            <Shrink height={16} width={16} />
          ) : (
            <Expand height={16} width={16} />
          )}
        </Button>
      </div>

      <CommandList className={cn("p-2 h-full", expanded ? "" : "h-full")}>
        {searchValue.length === 0 ? (
          Object.keys(history || {}).length > 0 ? (
            <div
              className={cn(
                "flex flex-col w-full px-2 sm:px-3",
                expanded && "px-2 sm:px-10",
              )}
            >
              <History
                history={history}
                setOpen={setOpen}
                expanded={expanded}
              />
            </div>
          ) : (
            <div className="flex flex-col w-full justify-center py-6">
              <Typography variant="muted">No recent searches</Typography>
            </div>
          )
        ) : Object.keys(results || {}).length === 0 ? (
          Object.keys(results || {}).length === 0 && (
            <div className="flex items-center justify-center w-full h-20">
              <Typography variant="muted">
                No results for &quot;<strong>{searchValue}</strong>&quot;
              </Typography>
            </div>
          )
        ) : (
          Object.entries(results || {}).map(([key, fileGroup]) => (
            <ResultGroup
              results={fileGroup}
              key={`result_group_${key}_${searchValue}`}
              className={cn("mt-2 sm:mt-4", expanded && "px-2 sm:px-10")}
              keyword={searchValue}
              setOpen={setOpen}
            />
          ))
        )}
      </CommandList>
    </CommandDialog>
  );
};

export const CommandMenuTrigger = ({
  className = "",
}: {
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <>
      <CommandMenu
        open={open}
        setOpen={setOpen}
        fileCache={jsonFileCache as FileCache}
        key="command_menu"
      />
      <Button
        className={cn(
          className,
          "pr-1.5 h-8 sm:h-10 py-1 sm:py-2 px-2 sm:px-4",
        )}
        variant="outline"
        onClick={() => setOpen((open) => !open)}
      >
        <div className="flex items-center">
          <Typography variant="small" className="text-xs sm:text-sm">
            Search <span className="hidden sm:inline-flex">documentation</span>
          </Typography>
          <Badge className="ml-3 sm:ml-6 rounded px-1" variant="secondary">
            <CommandIcon className="mr-0.5 h-3 w-3" />K
          </Badge>
        </div>
      </Button>
    </>
  );
};
