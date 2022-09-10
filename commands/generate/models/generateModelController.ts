import { readNextConfig } from "../../../utils";
import { generatePostgresqlModel } from "./databasePostgresqlModels/generatePostgresqlModel";
import { generateMongooseModel } from "./databaseMongodbModels/generateMongooseModel";

// Command to use this generator below:
// generate model truck make:String model:String

// The controller that routes user input to the correct model generator/controller depending on database in nextGenConfig
export const generateModelController = (userInput: string[]) => {
  const configData = readNextConfig();

  switch (configData.database) {
    case "postgresql":
      generatePostgresqlModel(userInput);
      break;
    case "mongodb":
      generateMongooseModel(userInput);
      break;
    default:
      // Do nothing
      break;
  }
};
