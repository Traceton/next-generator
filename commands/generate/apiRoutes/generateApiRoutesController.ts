import { readNextConfig } from "../../../utils"
import { generateMongodbApiRoutes } from "./databaseMongodbApiRoutes/generateMongodbApiRoutes"

// Command to use this generator below:
// generate api-routes truck make:String model:String

// The controller that routes user input to the correct api routes generator/controller depending on database in nextGenConfig
export const generateApiRoutesController = (userInput: string[]) => {
const configData = readNextConfig()

if (configData.database == "none" || !configData.database) {
    // Do nothing, or perhaps use something as a default.
  } else if (configData.database == "mongodb") {
    generateMongodbApiRoutes(userInput)
  }
}