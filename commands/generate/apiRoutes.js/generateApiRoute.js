const { createDirectory } = require("../../../utils");
const { createFile } = require("../../../utils");
const { existsSync } = require("fs");

// g sr truck

const generateApiRoute = async (userInput) => {
  const routeName = userInput[2];

  if (!routeName) {
    return `no routeName recieved`;
  }

  const apiRouteFile = `
// route name ----> ${routeName}
`;

  if (!existsSync(`pages`)) {
    await createDirectory("pages");
  }

  if (!existsSync(`pages/api`)) {
    await createDirectory("pages/api");
  }

  if (!existsSync(`pages/api/${routeName}s`)) {
    await createDirectory(`pages/api/${routeName}s`);
  }

  createFile(`pages/api/${routeName}s/${routeName}.js`, apiRouteFile);
};

module.exports = { generateApiRoute };
