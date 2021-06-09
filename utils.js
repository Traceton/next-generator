const fs = require("fs");

const createDirectory = async (directoryPath) => {
  await fs.mkdir(directoryPath, { recursive: false }, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`${directoryPath} created`);
    }
  });
};

const createFile = async (filePath, fileContent) => {
  await fs.writeFile(filePath, fileContent, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`${filePath} created`);
    }
  });
};

module.exports = { createDirectory, createFile };
