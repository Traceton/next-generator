
import { readNextConfig } from "../../utils"
import { generateCrud } from "./comboGenerators/generateCrud"
import { generateModel } from "./models/generateModel"
import { generateApiRoutes } from "./apiRoutes.js/generateApiRoutes"
import { generateEmptyApiRoutes } from "./apiRoutes.js/generateEmptyApiRoutes"
import { generateRestTest } from "./tests/generateRestTest"
import { generatePages } from "./pages/generatePagesController"
import { generateEmptyPages } from "./pages/generateEmptyPages"

export const generatorController = (userInput: string[]) => {

    let configData = readNextConfig()
    console.log(configData)

    if (userInput[1] === "model" || userInput[1] === "m") {
        generateModel(userInput);
    } else if (userInput[1] === "crud" || userInput[1] === "c") {
        generateCrud(userInput);
    } else if (userInput[1] === "api-routes" || userInput[1] === "a-r") {
        generateApiRoutes(userInput);
    } else if (userInput[1] === "empty-api-routes" || userInput[1] === "e-a-r") {
        generateEmptyApiRoutes(userInput);
    } else if (userInput[1] === "tests" || userInput[1] === "t") {
        generateRestTest(userInput);
    } else if (userInput[1] === "pages" || userInput[1] === "p") {
        generatePages(userInput);
    } else if (userInput[1] === "empty-pages" || userInput[1] === "e-p") {
        generateEmptyPages(userInput);
    } else {
        console.log(`Sorry, that command wasnt recognized`);
    }
};
