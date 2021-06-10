const fs = require("fs");

const createDirectory = async (directoryPath) => {
  await fs.mkdir(directoryPath, (error) => {
    if (error) {
      // console.log(error);
    } else {
      // console.log(`${directoryPath} created`);
    }
  });
};

const createFile = async (filePath, fileContent) => {
  if (!filePath && !fileContent) {
    return `no filePath and no fileContent recieved`;
  } else if (!fileContent) {
    return `no filePath OR no fileContent recieved`;
  }

  await fs.writeFile(filePath, fileContent, (error) => {
    if (error) {
      // console.log(error);
      return `error in createFile`;
    } else {
      // console.log(`${filePath} created`);
      return `file created`;
    }

    return `file created`;
  });
};

module.exports = { createDirectory, createFile };
