"use client";

import React, { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { CommandIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useConfig } from "nextra-theme-docs";
import { Item } from "nextra/dist/normalize-pages";

export const CommandMenu = ({
  open,
  setOpen,
  directories,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  directories?: Item[];
}) => {
  // const [open, setOpen] = useState(false);

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
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Type a command or search..."
        className="my-2"
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {directories?.map((directory) => (
          <CommandGroup key={directory.url} heading={directory.title}>
            {directory.items?.map((item) => (
              <CommandItem key={item.url}>{item.title}</CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
};

export const CommandMenuTrigger = ({
  className = "",
  directories,
  ...props
}: {
  className?: string;
  directories?: Item[];
}) => {
  console.log("i received it", directories, props);
  const [open, setOpen] = useState(false);
  return (
    <>
      <CommandMenu open={open} setOpen={setOpen} directories={directories} />
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
