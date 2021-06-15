const { createDirectory, createFile } = require("../../../../utils");
const { existsSync } = require("fs");

const generatePages = async (userInput) => {
  const modelName = userInput[2];
  if (!modelName) {
    return `no modelName recieved`;
  }
};

module.exports = { generatePages };
