import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function extractTextFromMarkdown(markdownContent: string): string {
  const headingRegex = /^#+\s+(.*)/gm; // Matches Markdown headings
  const htmlTagRegex = /<[^>]*>/gm; // Matches HTML tags
  const urlRegex = /(https?:\/\/\S+)/gm; // Matches URLs starting with "http://" or "https://"
  let plainText = markdownContent.replace(headingRegex, "$1\n");
  plainText = plainText.replace(htmlTagRegex, "");
  plainText = plainText.replace(urlRegex, "");
  return plainText;
}

interface FileData {
  name: string;
  content: string;
  parentName: string | null;
  path: string;
}

// Read and flatten directory structure into an object of objects

let parentName: null | string = null;

function readAndFlattenDirectory(
  directoryPath: string,
  parentName: string | null = null,
): Record<string, FileData> {
  const files: Record<string, FileData> = {};

  const items = fs.readdirSync(directoryPath);

  items.forEach((item: any) => {
    const itemPath = path.join(directoryPath, item);
    const stats = fs.statSync(itemPath);
    if (
      item === "_meta.js" ||
      item === "_app.mdx" ||
      item === "getting-started.mdx"
    ) {
      return; // Skip processing _meta.js file-cache
    }
    if (stats.isDirectory()) {
      const pathParts = itemPath.split("pages/");
      const lastPart = pathParts.pop() || "";
      const dirParts = lastPart.split("/");
      const actualParentName = dirParts[0] || "";
      const nextParentName =
        parentName === null || actualParentName !== parentName
          ? actualParentName
          : parentName;
      const nestedFiles = readAndFlattenDirectory(itemPath, nextParentName);
      Object.assign(files, nestedFiles);
    } else {
      const content = fs.readFileSync(itemPath, "utf-8");
      const pathParts = itemPath.split("pages/");
      const lastPart = pathParts.pop() || "";
      const path = lastPart.replace(/\.(md|mdx)$/, "");
      files[path] = {
        name: itemPath
          .split("/")
          .pop()
          ?.replace(/\.(md|mdx)$/, "") || "",
        content: extractTextFromMarkdown(content),
        parentName: parentName,
        path,
      };
    }
  });

  return files;
}

function initializeFileCache() {
  const directoryPath = path.join(__dirname, "../../src/pages");
  const outputFilePath = path.join(
    __dirname,
    "../../src/lib/cache/fileCache.json",
  );

  const files = readAndFlattenDirectory(directoryPath, parentName);
  writeDataToFile(files, outputFilePath);
}

function writeDataToFile(data: any, outputFilePath: string): void {
  const jsonData = JSON.stringify(data, null, 2); // Pretty-print JSON
  fs.writeFileSync(outputFilePath, jsonData);
}

initializeFileCache();
