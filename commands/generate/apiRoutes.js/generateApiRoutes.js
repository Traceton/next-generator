const { createDirectory } = require("../../../utils");
const { createFile } = require("../../../utils");
const { existsSync } = require("fs");
const { generateApiRoute } = require("./generateApiRoute");

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

  createDirectory(`pages/api/${routeFolderName}s`);

  createFile(`pages/api/${routeFolderName}s/index.js`, "// blank test content");
};

module.exports = { generateApiRoutes };
