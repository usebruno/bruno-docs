const fs = require("fs");
const path = require("path");

// Function to read Markdown file and extract pure text
function extractTextFromMarkdown(markdownContent: string): string {
  // Read the content of the Markdown fil
  // Regular expression to match Markdown headings and HTML tags
  const headingRegex = /^#+\s+(.*)/gm; // Matches Markdown headings
  const htmlTagRegex = /<[^>]*>/gm; // Matches HTML tags

  // Replace Markdown headings with their content
  let plainText = markdownContent.replace(headingRegex, "$1\n");

  // Remove HTML tags
  plainText = plainText.replace(htmlTagRegex, "").replace(/\n/g, " ");

  return plainText;
}

// @ts-ignore

interface FileData {
  path: string;
  name: string;
  content: string;
}

interface DirectoryData {
  name: string;
  files: FileData[];
  directories?: DirectoryData[];
}
let directoryData: DirectoryData | null = null;
let directoryPath = path.join(__dirname, "../pages");
let outputFilePath = path.join(__dirname, "empty.json");

function initializeFileCache(): void {
  directoryData = readDirectory(directoryPath);
  writeDataToFile(directoryData, outputFilePath);
}

function readDirectory(directoryPath: string): DirectoryData {
  const directoryName = path.basename(directoryPath);
  const files: FileData[] = [];
  const directories: DirectoryData[] = [];

  const items = fs.readdirSync(directoryPath);

  items.forEach((item: any) => {
    const itemPath = path.join(directoryPath, item);
    const stats = fs.statSync(itemPath);
    if (item === "_meta.json" || item === "_app.mdx") {
      return; // Skip processing _meta.json file
    }
    if (stats.isDirectory()) {
      directories.push(readDirectory(itemPath));
    } else {
      const content = fs.readFileSync(itemPath, "utf-8");
      const fileData: FileData = {
        path: itemPath
          .split("pages/")
          .pop()
          .replace(/\.[^.]+$/, ""),
        name: itemPath
          .split("/")
          .pop()
          .replace(/\.[^.]+$/, ""),
        content: extractTextFromMarkdown(content),
      };
      files.push(fileData);
    }
  });
  return directories.length === 0
    ? { name: directoryName, files }
    : { name: directoryName, files, directories };
}

function writeDataToFile(data: any, outputFilePath: string): void {
  const jsonData = JSON.stringify(data, null, 2); // Pretty-print JSON

  fs.writeFileSync(outputFilePath, jsonData);
}

function getDirectoryData(): DirectoryData | null {
  return directoryData;
}

initializeFileCache();
