import { readNextConfig } from "../../../../utils"
import { noneIndex } from "./noneIndex"
import { tailwindcssIndex } from "./tailwindcssIndex"

export const generateIndex = (modelName: string, finalSchemaItemsForIndex: string) => {

  const { style } = readNextConfig()

  switch (style) {
    case "none":
      return noneIndex(modelName, finalSchemaItemsForIndex)
      break;
    case "tailwindcss":
      return tailwindcssIndex(modelName, finalSchemaItemsForIndex)
      break;
    default:
      return "No style found at generateIndex.ts"
      break;
  }
}