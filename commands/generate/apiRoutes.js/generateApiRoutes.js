const { createDirectory, createFile } = require("../../../utils");
const { existsSync } = require("fs");

// g r truck

const generateApiRoutes = async (userInput) => {
  const modelName = userInput[2];
  if (!routeFolderName) {
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

module.exports = { generateApiRoutes };
