import { readNextConfig } from "../../../utils"
import { generateMongooseModel } from "./databaseMongodbModels/generateMongooseModel" 

// Command to use this generator below:
// generate model truck make:String model:String

// The controller that routes user input to the correct model generator/controller depending on database in nextGenConfig
export const generateModelController = (userInput: string[]) => {
    const configData = readNextConfig()

    if (configData.database == "none" || !configData.database) {
        // NOT IMPLEMENTED YET: Do nothing, or perhaps use something as a default.
      } else if (configData.database == "mongodb") {
        generateMongooseModel(userInput)
      }
}