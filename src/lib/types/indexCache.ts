export type Folder = {
  name: string;
  children: FileData[];
};

export type FileData = {
  name: string;
  path: string;
};

export type IndexCache = Folder[];
