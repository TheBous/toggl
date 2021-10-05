const readFile = async (file: File): Promise<string> => await file.text();

const formatFile = (fileContent: string) => {
  return fileContent.replace(/\n$/, "");
};

export const readAndFormatFile = async (file: File): Promise<string[]> => {
  const fileContents = (await readFile(file)) as string;
  const formattedFile = formatFile(fileContents).split("\n");
  return formattedFile;
};