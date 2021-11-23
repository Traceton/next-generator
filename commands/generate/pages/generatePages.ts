import { createDirectory, createFile } from "../../../utils";
import { existsSync } from "fs";
import { getDynamicDataForPages } from "./utils/getDynamicData"
import { generateIndex } from "./index/generateIndex"
import { generateDynamic } from "./dynamic/generateDynamic"
import { generateCreate } from "./create/generateCreate"
import { generateEdit } from "./edit/generateEdit"

// g p truck make:String model:String

export const generatePages = async (userInput: string[]) => {
  const modelName = userInput[2];

  let modelItems = userInput.slice(3);

  if (!modelName) {
    return `no modelName recieved`;
  }

  const upperCaseFirstLetterModelName =
    modelName.charAt(0).toUpperCase() + modelName.slice(1);

  // Gets any dynamic data that the page generators will need.
  let finalDynamicData = getDynamicDataForPages(modelName, modelItems)

  // generates the index page
  let indexPage = generateIndex(modelName, finalDynamicData.finalSchemaItemsForIndex)

  //  generates the dynamic page
  let dynamicPage = generateDynamic(modelName, upperCaseFirstLetterModelName, finalDynamicData.finalSchemaItemsForDynamicPage)

  // generates the create page
  let createPage = generateCreate(modelName, upperCaseFirstLetterModelName, finalDynamicData.finalJsonBodyItems, finalDynamicData.finalFormFieldItems)

  // generates the edit page
  let editPage = generateEdit(modelName, upperCaseFirstLetterModelName, finalDynamicData.finalJsonBodyItems, finalDynamicData.finalEditFormFieldItems)


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