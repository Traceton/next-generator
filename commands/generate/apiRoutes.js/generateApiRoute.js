const { createDirectory } = require("../../../utils");
const { createFile } = require("../../../utils");
const { existsSync } = require("fs");

// g sr page

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

  createFile(`pages/api/${routeName}.js`, apiRouteFile);
};

module.exports = { generateApiRoute };
