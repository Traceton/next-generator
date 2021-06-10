const { createDirectory } = require("../../../utils");
const { createFile } = require("../../../utils");
const { existsSync } = require("fs");

const generateApiRoute = async (userInput) => {
  const routeName = userInput[2];

  const apiRouteFile = `
route name ----> ${routeName}
`;

  if (!existsSync(`pages/api`)) {
    // console.log("/tests path does NOT exist");
    await createDirectory("pages/api");
    await createFile(`pages/api/${routeName}.js`, apiRouteFile);
    return true;
  } else if (existsSync(`pages/api`)) {
    // console.log("/tests path exists");
    await createFile(`tests/${routeName}.js`, apiRouteFile);
    return true;
  } else {
    return false;
  }
};

module.exports = { generateApiRoute };
