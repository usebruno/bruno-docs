import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface FileData {
  name: string;
  path: string;
}

interface SubDirectory {
  name: string;
  children?: (FileData | SubDirectory)[];
  path?: string;
}

interface IndexCache {
  name: string;
  children?: (FileData | SubDirectory)[];
  path?: string;
}

function readMetaFile(directoryPath: string): { [key: string]: string } {
  const metaJsPath = path.join(directoryPath, "_meta.js");
  if (fs.existsSync(metaJsPath)) {
    const metaContent = fs.readFileSync(metaJsPath, "utf-8");
    try {
      // Remove export default and trailing semicolon, then parse the object
      const cleanContent = metaContent
        .replace(/export\s+default\s+/, '')
        .replace(/;[\s]*$/, '')
        .trim();
      return JSON.parse(cleanContent);
    } catch (error) {
      console.error(`Error parsing meta file at ${metaJsPath}:`, error);
      return {};
    }
  }
  return {};
}

function isDirectory(directoryPath: string): boolean {
  const metaJsPath = path.join(directoryPath, "_meta.js");
  return fs.existsSync(metaJsPath) && fs.statSync(metaJsPath).isFile();
}

function buildIndexCache(
  directoryPath: string,
  relativePath = "",
): IndexCache[] {
  const indexCache: IndexCache[] = [];
  if (!fs.existsSync(directoryPath)) {
    return indexCache; // Return empty cache if directory doesn't exist
  }

  const meta = readMetaFile(directoryPath);
  // Iterate over the entries in the meta file to maintain order
  Object.entries(meta).forEach(([itemName, itemDisplayName]) => {
    const itemPath = path.join(directoryPath, itemName);
    if (isDirectory(itemPath)) {
      const children = buildIndexCache(
        itemPath,
        path.join(relativePath, itemName),
      );
      indexCache.push({
        name: itemDisplayName,
        children: children,
      });
    } else {
      // Assuming it's a file if it's not a directory
      const fileName = path.basename(itemName, path.extname(itemName));
      if (fileName === "_meta" || fileName === "_app") return;
      indexCache.push({
        name: itemDisplayName,
        path: path.join(relativePath, fileName === "index" ? "" : fileName),
      });
    }
  });

  return indexCache;
}

function initializeIndexCache() {
  const directoryPath = path.join(__dirname, "../../content");
  const outputFilePath = path.join(
    __dirname,
    "../../src/lib/cache/indexCache.json",
  );

  const indexCache = buildIndexCache(directoryPath);
  writeDataToFile(indexCache, outputFilePath);
}

function writeDataToFile(data: any, outputFilePath: string): void {
  const jsonData = JSON.stringify(data, null, 2); // Pretty-print JSON
  fs.writeFileSync(outputFilePath, jsonData);
}

initializeIndexCache();
