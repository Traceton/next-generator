const fs = require("fs");

const createDirectory = async (directoryPath) => {
  await fs.mkdir(directoryPath, (error) => {
    if (error) {
      // console.log(error);
      return false;
    } else {
      // console.log(`${directoryPath} created`);
      return true;
    }
    return "yes";
  });
};

const createFile = async (filePath, fileContent) => {
  await fs.writeFile(filePath, fileContent, (error) => {
    if (error) {
      // console.log(error);
      return false;
    } else {
      // console.log(`${filePath} created`);
      return true;
    }
  });
};

module.exports = { createDirectory, createFile };
