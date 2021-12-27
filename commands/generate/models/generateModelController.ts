import { readNextConfig } from "../../../utils"
import { generateMongooseModel } from "./databaseMongodb/generateMongooseModel" 

export const generateModelController = (userInput: string[]) => {
    const configData = readNextConfig()

    if (configData.database == "none" || !configData.database) {
        // Do nothing, or perhaps use something as a default.
        // nonePageController(userInput)
      } else if (configData.database == "mongodb") {
        generateMongooseModel(userInput)
      }
}