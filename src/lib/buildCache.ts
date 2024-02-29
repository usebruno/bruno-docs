const fs = require("fs");
const path = require("path");

// Function to read Markdown file and extract pure text
function extractTextFromMarkdown(markdownContent: string): string {
  // Regular expression to match Markdown headings and HTML tags
  const headingRegex = /^#+\s+(.*)/gm; // Matches Markdown headings
  const htmlTagRegex = /<[^>]*>/gm; // Matches HTML tags

  // Replace Markdown headings with their content
  let plainText = markdownContent.replace(headingRegex, "$1\n");

  // Remove HTML tags
  plainText = plainText.replace(htmlTagRegex, "");

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
    if (item === "_meta.json" || item === "_app.mdx") {
      return; // Skip processing _meta.json file
    }
    if (stats.isDirectory()) {
      const actualParentName = itemPath.split("pages/").pop().split("/")?.[0];
      const nextParentName =
        parentName === null || actualParentName !== parentName
          ? actualParentName
          : parentName;
      const nestedFiles = readAndFlattenDirectory(itemPath, nextParentName);
      Object.assign(files, nestedFiles);
    } else {
      const content = fs.readFileSync(itemPath, "utf-8");
      const path = itemPath
        .split("pages/")
        .pop()
        .replace(/\.[^.]+$/, "");
      files[path] = {
        name: itemPath
          .split("/")
          .pop()
          .replace(/\.[^.]+$/, ""),
        content: extractTextFromMarkdown(content),
        parentName: parentName,
        path,
      };
      // parentName = null;
    }
  });

  return files;
}

// Entry point
function initializeFileCache() {
  const directoryPath = path.join(__dirname, "../pages");
  const outputFilePath = path.join(__dirname, "fileCache.json");

  const files = readAndFlattenDirectory(directoryPath, parentName);
  writeDataToFile(files, outputFilePath);
}

// Write data to file
function writeDataToFile(data: any, outputFilePath: string): void {
  const jsonData = JSON.stringify(data, null, 2); // Pretty-print JSON

  fs.writeFileSync(outputFilePath, jsonData);
}

initializeFileCache();
