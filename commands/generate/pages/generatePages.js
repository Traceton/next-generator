const { createDirectory, createFile } = require("../../../utils");
const { existsSync } = require("fs");

// g p truck

const generatePages = async (userInput) => {
  const modelName = userInput[2];
  if (!modelName) {
    return `no modelName recieved`;
  }

  const indexPage = `// blank content for pages index`;

  const dynamicPage = `// blank dynamic page`;

  if (!existsSync(`pages`)) {
    await createDirectory("pages");
  }

  if (!existsSync(`pages/${modelName}s`)) {
    await createDirectory(`pages/${modelName}s`);
  }

  if (!existsSync(`.env.local`)) {
    await createFile(
      ".env.local",
      `MONGODB_URI=your-database-string-here
    MONGODB_DB=your-database-name-here    
    `
    );
  }

  createFile(`pages/${modelName}s/index.js`, indexPage);

  createFile(`pages/${modelName}s/[${modelName}Id].js`, dynamicPage);
};

module.exports = { generatePages };
