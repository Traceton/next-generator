const { createDirectory, createFile } = require("../../../utils");
const { existsSync } = require("fs");

// g e-r truck

const generateEmptyApiRoutes = async (userInput) => {
  const modelName = userInput[2];

  const upperCaseFirstLetterModelName =
    modelName.charAt(0).toUpperCase() + modelName.slice(1);

  if (!modelName) {
    return `no routeName recieved`;
  }

  if (!existsSync(`pages`)) {
    await createDirectory("pages");
  }

  if (!existsSync(`pages/api`)) {
    await createDirectory("pages/api");
  }

  if (!existsSync(`pages/api/${upperCaseFirstLetterModelName}s`)) {
    createDirectory(`pages/api/${upperCaseFirstLetterModelName}s`);
  }

  createFile(
    `pages/api/${upperCaseFirstLetterModelName}s/index.js`,
    "// blank test content for index"
  );
  createFile(
    `pages/api/${upperCaseFirstLetterModelName}s/[${modelName}Id].js`,
    "// blank test content"
  );
};

module.exports = { generateEmptyApiRoutes };
