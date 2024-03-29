import {
  createDirectory,
  createFile,
  getIdType,
  readNextConfig,
} from "../../../../utils";
import { existsSync } from "fs";
import { getDynamicNoneData } from "./getDynamicNoneData";
import { generateIndex } from "./generateIndex";
import { generateDynamic } from "./generateDynamic";
import { generateCreate } from "./generateCreate";
import { generateEdit } from "./generateEdit";

export const nonePageController = async (userInput: string[]) => {
  const modelName = userInput[2];

  let configData = readNextConfig();
  let idType = getIdType();

  const modelItems = userInput.slice(3);

  if (!modelName) {
    return `no modelName recieved`;
  }
  if (!modelItems) {
    return `no modelItems recieved`;
  }

  const upperCaseFirstLetterModelName =
    modelName.charAt(0).toUpperCase() + modelName.slice(1);

  // Gets any dynamic data that the page generators will need.
  const finalDynamicData = getDynamicNoneData(modelName, modelItems);

  // generates the index page
  const indexPage = generateIndex(
    modelName,
    idType,
    finalDynamicData.finalSchemaItemsForIndex
  );

  //  generates the dynamic page
  const dynamicPage = generateDynamic(
    modelName,
    idType,
    upperCaseFirstLetterModelName,
    finalDynamicData.finalSchemaItemsForDynamicPage
  );

  // generates the create page
  const createPage = generateCreate(
    modelName,
    idType,
    upperCaseFirstLetterModelName,
    finalDynamicData.finalJsonBodyItems,
    finalDynamicData.finalFormFieldItems
  );

  // generates the edit page
  const editPage = generateEdit(
    modelName,
    idType,
    upperCaseFirstLetterModelName,
    finalDynamicData.finalJsonBodyItems,
    finalDynamicData.finalEditFormFieldItems
  );

  if (!existsSync(`${configData.projectRootPath}pages`)) {
    createDirectory(`${configData.projectRootPath}pages`);
  }

  if (!existsSync(`${configData.projectRootPath}pages/${modelName}s`)) {
    createDirectory(`${configData.projectRootPath}pages/${modelName}s`);
  }

  if (
    !existsSync(
      `${configData.projectRootPath}pages/${modelName}s/edit${upperCaseFirstLetterModelName}s`
    )
  ) {
    createDirectory(
      `${configData.projectRootPath}pages/${modelName}s/edit${upperCaseFirstLetterModelName}s`
    );
  }

  createFile(
    `${configData.projectRootPath}pages/${modelName}s/index.js`,
    indexPage
  );

  createFile(
    `${configData.projectRootPath}pages/${modelName}s/[${modelName}Id].js`,
    dynamicPage
  );

  createFile(
    `${configData.projectRootPath}pages/${modelName}s/create${upperCaseFirstLetterModelName}.js`,
    createPage
  );

  createFile(
    `${configData.projectRootPath}pages/${modelName}s/edit${upperCaseFirstLetterModelName}s/[${modelName}Id].js`,
    editPage
  );
};
