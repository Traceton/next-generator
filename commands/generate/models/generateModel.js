const { createDirectory, createFile } = require("../../../utils");
const { existsSync } = require("fs");

// g m user firstName:String lastName:String

const generateModel = async (userInput) => {
  let modelName = userInput[2];

  const upperCaseFirstLetterModelName =
    modelName.charAt(0).toUpperCase() + modelName.slice(1);

  if (modelName === undefined || modelName === "undefined") {
    console.log(`must enter a model name`);
    return `must enter a model name`;
  }

  if (userInput.length <= 3) {
    console.log(`must enter model schema parameters`);
    return `must enter model schema parameters`;
  }

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

  if (!existsSync(`components`)) {
    await createDirectory("components");
  }

  if (!existsSync(`components/models`)) {
    await createDirectory("components/models");
  }

  createFile(`components/models/${upperCaseFirstLetterModelName}.js`, newModel);
};

module.exports = { generateModel };
