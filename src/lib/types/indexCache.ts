export type SubDirectory = {
  name: string;
  children: (FileData | SubDirectory)[];
};

export type FileData = {
  name: string;
  path: string;
};

export type IndexCache = {
  name: string;
  children: (FileData | SubDirectory)[];
};
