import { readNextConfig } from "../../../utils";
import { nonePageController } from "./pageTypeNonePages/nonePageController";
import { tailwindcssPageController } from "./pageTypeTailwindcssPages/tailwindcssPageController";

// Command to use this generator below:
// generate pages vehicle year:String make:String model:String

// The controller that routes user input depending on pageType in nextGenConfig
export const generatePagesController = async (userInput: string[]) => {
  const configData = readNextConfig();

  if (configData.pageType == "none" || !configData.pageType) {
    nonePageController(userInput);
  } else if (configData.pageType == "tailwindcss") {
    tailwindcssPageController(userInput);
  }
};
