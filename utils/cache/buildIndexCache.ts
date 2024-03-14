// @ts-ignore
const fs = require("fs");
// @ts-ignore
const path = require("path");

interface FileData {
  name: string;
  path: string;
}
interface SubDirectory {
  name: string;
  children: (FileData | SubDirectory)[];
}

interface IndexCache {
  name: string;
  children: (FileData | SubDirectory)[];
}

function readMetaFile(directoryPath: string): { [key: string]: string } {
  const metaPath = path.join(directoryPath, "_meta.json");
  if (fs.existsSync(metaPath)) {
    const metaContent = fs.readFileSync(metaPath, "utf-8");
    return JSON.parse(metaContent);
  }
  return {};
}

function isDirectory(directoryPath: string): boolean {
  const metaPath = path.join(directoryPath, "_meta.json");
  return fs.existsSync(metaPath) && fs.statSync(metaPath).isFile();
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
        // @ts-ignore
        path: path.join(relativePath, fileName === "index" ? "" : fileName),
      });
    }
  });

  return indexCache;
}

function initializeIndexCache() {
  const directoryPath = path.join(__dirname, "../../src/pages");
  const outputFilePath = path.join(
    __dirname,
    "../../src/lib/cache/indexCache.json",
  );

  const indexCache = buildIndexCache(directoryPath);
  writeDataToFile(indexCache, outputFilePath);
}

// @ts-ignore
function writeDataToFile(data: any, outputFilePath: string): void {
  const jsonData = JSON.stringify(data, null, 2); // Pretty-print JSON

  fs.writeFileSync(outputFilePath, jsonData);
}

initializeIndexCache();
