import { createDirectory, createFile } from "../../../utils";
import { existsSync } from "fs";

// g p truck make:String model:String

export const generatePages = async (userInput: string[]) => {
  const modelName = userInput[2];

  if (!modelName) {
    return `no modelName recieved`;
  }

  const upperCaseFirstLetterModelName =
    modelName.charAt(0).toUpperCase() + modelName.slice(1);

  let modelItems = userInput.slice(3);

  // moved to getDynamicData function



  // index was here

  //  dynamic was here

  // create was here

  // edit was here

  if (!existsSync(`pages`)) {
    createDirectory("pages");
  }

  if (!existsSync(`pages/${modelName}s`)) {
    createDirectory(`pages/${modelName}s`);
  }

  if (
    !existsSync(`pages/${modelName}s/edit${upperCaseFirstLetterModelName}s`)
  ) {
    createDirectory(
      `pages/${modelName}s/edit${upperCaseFirstLetterModelName}s`
    );
  }

  if (!existsSync(`.env.local`)) {
    createFile(
      ".env.local",
      ` MONGODB_URI=your-database-string-here 
        NEXT_PUBLIC_HOST_URL=http://localhost:3000
    `
    );
  }

  createFile(`pages/${modelName}s/index.js`, indexPage);

  createFile(`pages/${modelName}s/[${modelName}Id].js`, dynamicPage);

  createFile(
    `pages/${modelName}s/create${upperCaseFirstLetterModelName}.js`,
    createPage
  );

  createFile(
    `pages/${modelName}s/edit${upperCaseFirstLetterModelName}s/[${modelName}Id].js`,
    editPage
  );
};