import { readNextConfig } from "../../utils"
import { generateCrud } from "./generateCrud"
import { generateModelController } from "./models/generateModelController"
import { generateApiRoutesController } from "./apiRoutes/generateApiRoutesController"
import { generatePagesController } from "./pages/generatePagesController"

export const generatorController = (userInput: string[]) => {

    let configData = readNextConfig()
    console.log(configData)

    if (userInput[1] === "model" || userInput[1] === "m") {
        generateModelController(userInput);
    } else if (userInput[1] === "crud" || userInput[1] === "c") {
        generateCrud(userInput);
    } else if (userInput[1] === "api-routes" || userInput[1] === "a-r") {
        generateApiRoutesController(userInput);
    } else if (userInput[1] === "empty-api-routes" || userInput[1] === "e-a-r") {
        // generateEmptyApiRoutes(userInput);
    } else if (userInput[1] === "tests" || userInput[1] === "t") {
        // generateRestTest(userInput);
    } else if (userInput[1] === "pages" || userInput[1] === "p") {
        generatePagesController(userInput);
    } else if (userInput[1] === "empty-pages" || userInput[1] === "e-p") {
        // generateEmptyPages(userInput);
    } else {
        console.log(`Sorry, that command wasnt recognized`);
    }
};
