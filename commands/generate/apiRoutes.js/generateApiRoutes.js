const { createDirectory, createFile } = require("../../../utils");
const { existsSync } = require("fs");

// g r truck

const generateApiRoutes = async (userInput) => {
  const modelName = userInput[2];
  if (!modelName) {
    return `no routeName recieved`;
  }

  const indexApiPage = `// blank content for pages index`;

  const dynamicApiPage = `// blank dynamic page`;

  if (!existsSync(`pages`)) {
    await createDirectory("pages");
  }

  if (!existsSync(`pages/api`)) {
    await createDirectory("pages/api");
  }

  if (!existsSync(`pages/api/${modelName}s`)) {
    createDirectory(`pages/api/${modelName}s`);
  }

  if (!existsSync(`.env.local`)) {
    await createFile(
      ".env.local",
      `MONGODB_URI=your-database-string-here
    MONGODB_DB=your-database-name-here    
    `
    );
  }

  createFile(`pages/api/${modelName}s/index.js`, indexApiPage);
  createFile(`pages/api/${modelName}s/[${modelName}Id].js`, dynamicApiPage);
};

module.exports = { generateApiRoutes };
