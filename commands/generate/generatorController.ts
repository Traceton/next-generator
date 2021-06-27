const { generateCrud } = require("./comboGenerators/generateCrud");
const { generateModel } = require("./models/generateModel");
const { generateApiRoutes } = require("./apiRoutes.js/generateApiRoutes");
const {
  generateEmptyApiRoutes,
} = require("./apiRoutes.js/generateEmptyApiRoutes");
const { generateRestTest } = require("./tests/generateRestTest");
const { generatePages } = require("./pages/generatePages");
const { generateEmptyPages } = require("./pages/generateEmptyPages");

export const generatorController = (userInput: string[]) => {
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
