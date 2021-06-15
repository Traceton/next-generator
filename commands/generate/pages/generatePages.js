const { createDirectory, createFile } = require("../../../utils");
const { existsSync } = require("fs");

// g p truck

const generatePages = async (userInput) => {
  const modelName = userInput[2];
  if (!modelName) {
    return `no modelName recieved`;
  }

  if (!existsSync(`pages`)) {
    await createDirectory("pages");
  }

  if (!existsSync(`pages/${modelName}s`)) {
    await createDirectory(`pages/${modelName}s`);
  }

  createFile(
    `pages/${modelName}s/index.js`,
    "// blank test content for pages index"
  );

  createFile(
    `pages/${modelName}s/[${modelName}Id].js`,
    "// blank test pages content"
  );
};

module.exports = { generatePages };
