import fs from "fs";

export const createDirectory = async (directoryPath: string) => {
  if (!directoryPath) {
    console.log(`no directoryPath recieved`);
    return `no directoryPath recieved`;
  }

  await fs.mkdirSync(directoryPath, { recursive: true }, (error) => {
    if (error) {
      return `incorrect directory name format`;
    }
  });
  return `directory created`;
};

export const createFile = async (filePath: string, fileContent: string) => {
  if (!filePath && !fileContent) {
    console.log(`no filePath and no fileContent recieved`);
    return `no filePath and no fileContent recieved`;
  } else if (!fileContent) {
    console.log(`no filePath OR no fileContent recieved`);
    return `no filePath OR no fileContent recieved`;
  }

  await fs.writeFileSync(
    filePath,
    fileContent,
    { recursive: true },
    (error) => {
      if (error) {
        console.log(`error in createFile --> ${error}`);
        return `error in createFile`;
      }
    }
  );
  return `file created`;
};
