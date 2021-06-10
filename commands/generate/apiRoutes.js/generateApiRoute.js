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
    await createDirectory("pages/api/");
  }

  if (existsSync(`pages/api`)) {
    await createFile(`pages/api/${routeName}.js`, apiRouteFile);
    return `file created`;
  } else {
    console.log("no file created");
  }
};

module.exports = { generateApiRoute };
