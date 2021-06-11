const fs = require("fs");

const createDirectory = async (directoryPath) => {
  if (!directoryPath) {
    return `no directoryPath recieved`;
  }

  await fs.mkdir(directoryPath, { recursive: true }, (error) => {
    if (error) {
      return `incorrect directory name format`;
    }
    return `directory created`;
  });
};

const createFile = async (filePath, fileContent) => {
  if (!filePath && !fileContent) {
    return `no filePath and no fileContent recieved`;
  } else if (!fileContent) {
    return `no filePath OR no fileContent recieved`;
  }

  await fs.writeFile(filePath, fileContent, { recursive: true }, (error) => {
    if (error) {
      // console.log(error);
      return `error in createFile`;
    }
    // console.log(`${filePath} created`);

    return `file created`;
  });
};

module.exports = { createDirectory, createFile };
