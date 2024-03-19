export type FileData = {
  name: string;
  content: string;
  parentName: string | null;
  path: string;
};

export type FileCache = Record<string, FileData>;
