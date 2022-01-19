import { createDirectory, createFile, readNextConfig } from "../../../../utils";
import { existsSync} from "fs";
import fs from "fs";

// generates a Postgresql model using userInput. 
export const generatePostgresqlModel = async (userInput: string[]) => {
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
  
      let newModel = `${finalSchemaItems}`;

    // try to modify the Prisma schema
    try {
        let path = `${configData.projectRootPath}prisma/schema.prisma`

        const rawConfigFile = fs.readFileSync(path, { encoding: "utf8" });
        if (!rawConfigFile || rawConfigFile == undefined) {
            console.log("no prisma schema found, cannot modify")
          } else {
            fs.appendFile(path, newModel, function (error) {
                if (error) console.log(`prisma schema mod error -> ${error}`)
                console.log('Updated schema!');
              });
          }
    } catch (error) {
        console.log(`prisma schema mod error -> ${error}`)
    }
  
    //   if (!existsSync(`${configData.projectRootPath}components`)) {
    //     await createDirectory(`${configData.projectRootPath}components`);
    //   }
  
    //   if (!existsSync(`${configData.projectRootPath}components/models`)) {
    //     await createDirectory(`${configData.projectRootPath}components/models`);
    //   }
  
    //   createFile(
    //     `${configData.projectRootPath}components/models/${upperCaseFirstLetterModelName}.js`,
    //     newModel
    //   );

    } catch (error) {
      console.log(error);
      return error;
    }
  };