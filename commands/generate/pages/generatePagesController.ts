// This will call the correct page type depending on the config page.
import { readNextConfig } from "../../../utils"
// import {nonePageController} from "./pageTypeNonePages/nonePageController"
import { tailwindcssPageController } from "./pageTypeTailwindcssPages/tailwindcssPageController";

export const generatePagesController = async (userInput: string[]) => {
  const configData = readNextConfig()

  if (configData.pageType == "none" || !configData.pageType) {
    // nonePageController(userInput)
  } else if (configData.pageType == "tailwindcss") {
    tailwindcssPageController(userInput)
  }

};