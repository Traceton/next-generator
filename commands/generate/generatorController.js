const { generateModel } = require("./models/generateModel");
const { generateApiRoutes } = require("./apiRoutes.js/generateApiRoutes");
const { generateRestTest } = require("./tests/generateRestTest");
const { generatePages } = require("./pages/generatePages");

const generatorController = (userInput) => {
  if (userInput[1] === "model" || userInput[1] === "m") {
    generateModel(userInput);
  } else if (userInput[1] === "routes" || userInput[1] === "r") {
    generateApiRoutes(userInput);
  } else if (userInput[1] === "tests" || userInput[1] === "t") {
    generateRestTest(userInput);
  } else if (userInput[1] === "pages" || userInput[1] === "p") {
    generatePages(userInput);
  } else {
    console.log(`Sorry, that command wasnt recognized`);
  }
};

module.exports = { generatorController };
