// This will be a controller that routes the users input to the correct generator depending on the nextGenConfig.
import { readNextConfig } from "../../../utils"
import { generateMongodbApiRoutes } from "./databaseMongodbApiRoutes/generateMongodbApiRoutes"

export const generateApiRoutesController = (userInput: string[]) => {
const configData = readNextConfig()

if (configData.database == "none" || !configData.database) {
    // Do nothing, or perhaps use something as a default.
  } else if (configData.database == "mongodb") {
    generateMongodbApiRoutes(userInput)
  }
}