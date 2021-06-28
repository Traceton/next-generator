import fs from "fs";


export const createDirectory =  (directoryPath: string) => {
  if (!directoryPath) {
    console.log(`no directoryPath recieved`);
    return `no directoryPath recieved`;
  }

   fs.mkdirSync(directoryPath, { recursive: true }, (error: object) => {
    if (error) {
      return `incorrect directory name format`;
    }
  });
  return `directory created`;
};

export const createFile =  (filePath: string, fileContent: string) => {
  if (!filePath && !fileContent) {
    console.log(`no filePath and no fileContent recieved`);
    return `no filePath and no fileContent recieved`;
  } else if (!fileContent) {
    console.log(`no filePath OR no fileContent recieved`);
    return `no filePath OR no fileContent recieved`;
  }

   fs.writeFileSync(
    filePath,
    fileContent,
    { recursive: true },
    (error: object) => {
      if (error) {
        console.log(`error in createFile --> ${error}`);
        return `error in createFile`;
      }
    }
  );
  return `file created`;
};
