const fs = require("fs");

const createDirectory = async (directoryPath) => {
  if (!directoryPath) {
    console.log(`no directoryPath recieved`);
    return `no directoryPath recieved`;
  }

  await fs.mkdir(directoryPath, { recursive: true }, (error) => {
    if (error) {
      return `incorrect directory name format`;
    }
  });
  return `directory created`;
};

const createFile = async (filePath, fileContent) => {
  if (!filePath && !fileContent) {
    console.log(`no filePath and no fileContent recieved`);
    return `no filePath and no fileContent recieved`;
  } else if (!fileContent) {
    console.log(`no filePath OR no fileContent recieved`);
    return `no filePath OR no fileContent recieved`;
  }

  await fs.writeFile(filePath, fileContent, { recursive: true }, (error) => {
    if (error) {
      console.log(`error in createFile --> ${error}`);
      return `error in createFile`;
    }
  });
  return `file created`;
};

module.exports = { createDirectory, createFile };
