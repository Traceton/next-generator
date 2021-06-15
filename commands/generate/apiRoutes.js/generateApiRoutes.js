const { createDirectory } = require("../../../utils");
const { createFile } = require("../../../utils");
const { existsSync } = require("fs");

// g r truck

const generateApiRoutes = async (userInput) => {
  const routeFolderName = userInput[2];
  if (!routeFolderName) {
    return `no routeName recieved`;
  }

  if (!existsSync(`pages`)) {
    await createDirectory("pages");
  }

  if (!existsSync(`pages/api`)) {
    await createDirectory("pages/api");
  }

  if (!existsSync(`pages/api/${routeFolderName}s`)) {
    createDirectory(`pages/api/${routeFolderName}s`);
  }

  createFile(
    `pages/api/${routeFolderName}s/index.js`,
    "// blank test content for index"
  );
  createFile(
    `pages/api/${routeFolderName}s/[${routeFolderName}Id].js`,
    "// blank test content"
  );
};

module.exports = { generateApiRoutes };
