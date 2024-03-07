import { FileData } from "@/lib/types/fileCache";
import React from "react";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import { ResultItem } from "@/components/command-menu/results/result-item";

export const ResultGroup = ({
  className,
  keyword,
  results,
  setOpen,
}: {
  className?: string;
  keyword: string;
  results: FileData[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className={cn(className)}>
      <div className="flex flex-col sm:my-1 pl-3">
        <Typography variant="h4" className="capitalize">
          {results[0]?.parentName?.replace("_", " ")}
        </Typography>
        <div className="flex flex-col w-full mt-1 sm:mt-2">
          {results.map((result) => (
            <ResultItem
              result={result}
              keyword={keyword}
              key={`result_item_${result.path}`}
              setOpen={setOpen}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
