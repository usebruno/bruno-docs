export type HistoryItem = {
  name: string;
  path: string;
  timestamp: number;
};

export type HistoryType = Record<string, HistoryItem>;
