// Used to get all of the dynamic data for generate pages
// This file should check the outcome of the nextGenConfig.json file,
//  and return the correct dynamic fields accordingly.
import { readNextConfig } from "../../../../utils"
import {getDynamicTailwindcssDataForPages} from "./getDynamicTailwindcssData"

export const getDynamicDataForPages = (modelName: string, modelItems: string[]) => {
  
  const { style } = readNextConfig()
 
  switch (style) {
    case "none":
      return getDynamicTailwindcssDataForPages(modelName,modelItems)
      break;
    case "tailwindcss":
      return getDynamicTailwindcssDataForPages(modelName,modelItems)
      break;
    default:
      const defaultMessage = `No Style found in nextGenConfig.json, using value of "none" for style`
      console.log(defaultMessage)
      return getDynamicTailwindcssDataForPages(modelName,modelItems)
      break;
  }

}