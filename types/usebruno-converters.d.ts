declare module '@usebruno/converters' {
  export function postmanToBruno(collection: any, options?: { useWorkers?: boolean }): Promise<any>;
}
