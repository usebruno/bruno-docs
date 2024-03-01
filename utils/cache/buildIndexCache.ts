// @ts-ignore
const fs = require("fs");
// @ts-ignore
const path = require("path");

interface FileData {
  name: string;
  path: string;
}

interface IndexCache {
  name: string;
  children: FileData[];
}

function readMetaFile(directoryPath: string): { [key: string]: string } {
  const metaPath = path.join(directoryPath, "_meta.json");
  if (fs.existsSync(metaPath)) {
    const metaContent = fs.readFileSync(metaPath, "utf-8");
    return JSON.parse(metaContent);
  }
  return {};
}

function buildIndexCache(directoryPath: string): IndexCache[] {
  const indexCache: IndexCache[] = [];

  const rootMeta = readMetaFile(directoryPath);
  const metaEntries = Object.entries(rootMeta);

  metaEntries.forEach(([folder, folderName]: [string, string]) => {
    const itemPath = path.join(directoryPath, folder);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      const meta = readMetaFile(itemPath);
      const children = Object.keys(meta).map(
        (child) =>
          ({
            name: child,
            path: path.join(folder, child) as string,
          }) as FileData,
      );

      indexCache.push({
        name: folderName,
        children: children,
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
