import { existsSync } from "fs";
import { createDirectory, readNextConfig } from "../../utils";
import { generateEnv } from "./generateEnv";
import { generateCrudController } from "./generateCrudController";
import { generateModelController } from "./models/generateModelController";
import { generateApiRoutesController } from "./apiRoutes/generateApiRoutesController";
import { generatePagesController } from "./pages/generatePagesController";

// Routes the userInput to the correct controller/generator based on the command name.
export const generatorController = (userInput: string[]) => {
  let configData = readNextConfig();

  if (configData.projectRootPath) {
    if (!existsSync(configData.projectRootPath)) {
      createDirectory(configData.projectRootPath);
    }
  }

  // Generates a env file based on the database set in nextGenConfig
  generateEnv();

  if (userInput[1] === "model" || userInput[1] === "m") {
    generateModelController(userInput);
  } else if (userInput[1] === "crud" || userInput[1] === "c") {
    generateCrudController(userInput);
  } else if (userInput[1] === "api-routes" || userInput[1] === "a-r") {
    generateApiRoutesController(userInput);
  } else if (userInput[1] === "empty-api-routes" || userInput[1] === "e-a-r") {
    // NOT IMPLEMENTED YET: generateEmptyApiRoutes(userInput);
  } else if (userInput[1] === "tests" || userInput[1] === "t") {
    // NOT IMPLEMENTED YET: generateRestTest(userInput);
  } else if (userInput[1] === "pages" || userInput[1] === "p") {
    generatePagesController(userInput);
  } else if (userInput[1] === "empty-pages" || userInput[1] === "e-p") {
    // NOT IMPLEMENTED YET: generateEmptyPages(userInput);
  } else {
    console.log(`Sorry, that command wasnt recognized`);
  }
};
