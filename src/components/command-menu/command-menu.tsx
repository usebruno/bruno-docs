"use client";

import React, { useEffect, useState } from "react";
import { CommandDialog, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { CommandIcon, Search } from "lucide-react";
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

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div className="flex items-center border-b-2 pl-3">
        <Search height={16} width={16} />
        <Input
          placeholder="Search in the documentation..."
          className="ml-1 py-6 border-0 rounded-none !shadow-none focus-visible:!shadow-none !ring-offset-0 !ring-0"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <CommandList className="p-2">
        {searchValue.length === 0 ? (
          Object.keys(history || {}).length > 0 ? (
            <div className="flex flex-col w-full">
              <History history={history} setOpen={setOpen} />
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
              className="mt-4"
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
        className={cn(className, "pr-1.5")}
        variant="outline"
        onClick={() => setOpen((open) => !open)}
      >
        <div className="flex items-center">
          Search documentation
          <Badge className="ml-6 rounded px-1" variant="secondary">
            <CommandIcon size={12} className="mr-0.5" />K
          </Badge>
        </div>
      </Button>
    </>
  );
};
