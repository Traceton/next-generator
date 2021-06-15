const { createDirectory, createFile } = require("../../../utils");
const { existsSync } = require("fs");

// g e-r truck

const generateEmptyApiRoutes = async (userInput) => {
  const modelName = userInput[2];
  if (!modelName) {
    return `no routeName recieved`;
  }

  if (!existsSync(`pages`)) {
    await createDirectory("pages");
  }

  if (!existsSync(`pages/api`)) {
    await createDirectory("pages/api");
  }

  if (!existsSync(`pages/api/${modelName}s`)) {
    createDirectory(`pages/api/${modelName}s`);
  }

  createFile(
    `pages/api/${modelName}s/index.js`,
    "// blank test content for index"
  );
  createFile(
    `pages/api/${modelName}s/[${modelName}Id].js`,
    "// blank test content"
  );
};

module.exports = { generateEmptyApiRoutes };
