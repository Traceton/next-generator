import { createDirectory, createFile } from "../../../utils";
import { existsSync } from "fs";


// g e-p truck

export const generateEmptyPages = async (userInput: string[]) => {
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

  createFile(`pages/${modelName}s/index.js`, indexPage);

  createFile(`pages/${modelName}s/[${modelName}Id].js`, dynamicPage);
};

