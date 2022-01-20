import { readNextConfig } from "../../../utils"
import { generateMongodbApiRoutes } from "./databaseMongodbApiRoutes/generateMongodbApiRoutes"
import { generatePostgresqlApiRoutes } from "./databasePostgresqlApiRoutes/generatePostgressqlApiRoutes"
// Command to use this generator below:
// generate api-routes truck make:String model:String

// The controller that routes user input to the correct api routes generator/controller depending on database in nextGenConfig
export const generateApiRoutesController = (userInput: string[]) => {
const configData = readNextConfig()

  switch (configData.database) {
    case "postgresql":
      generatePostgresqlApiRoutes(userInput)
        break;
    case"mongodb":
    generateMongodbApiRoutes(userInput)
        break;  
    default:
        // Do nothing 
        break;
  }
}