import { createDirectory, createFile } from "../../../../utils";
import { readNextConfig } from "../../../../utils";
import { existsSync } from "fs";

// generates a mongoose/mongodb model using userInput. 
export const generateMongooseModel = async (userInput: string[]) => {
  let modelName = userInput[2];

  let configData = readNextConfig()

  if (modelName === undefined || modelName === "undefined") {
    console.log(`must enter a model name`);
    return `must enter a model name`;
  }

  if (userInput.length <= 3) {
    console.log(`must enter model schema parameters`);
    return `must enter model schema parameters`;
  }

  try {
    const upperCaseFirstLetterModelName =
      modelName.charAt(0).toUpperCase() + modelName.slice(1);

    let modelItems = userInput.slice(3);

    let neWModelSchemaItems = [];

    // maps through each command
    modelItems.map((unSplitEntry) => {
      let entry = unSplitEntry.split(":");
      let entryName = entry[0];
      let entryType = entry[1];

      let modelField = {
        [entryName]: {
          type: entryType,
          required: true,
        },
      };

      let stringField = JSON.stringify(modelField)
        .replace("{", "")
        .replace("}", "");
      neWModelSchemaItems.push(stringField);
    });

    let createdOnField = `createdOn: {
    type: Date,
    required: true,
    default: Date.now(),
  },`;
    neWModelSchemaItems.push(createdOnField);

    let finalSchemaItems = neWModelSchemaItems
      .toString()
      .replace("[", "")
      .replace("]", "")
      .replace(/"/g, "");

    let newModel = `const mongoose = require("mongoose"); \n

  const ${modelName}Schema = new mongoose.Schema({

  ${finalSchemaItems}

  }); \n

  module.exports = mongoose.models.${modelName} || mongoose.model("${modelName}", ${modelName}Schema);`;

    if (!existsSync(`${configData.projectRootPath}components`)) {
      await createDirectory(`${configData.projectRootPath}components`);
    }

    if (!existsSync(`${configData.projectRootPath}components/models`)) {
      await createDirectory(`${configData.projectRootPath}components/models`);
    }

    createFile(
      `${configData.projectRootPath}components/models/${upperCaseFirstLetterModelName}.js`,
      newModel
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};
