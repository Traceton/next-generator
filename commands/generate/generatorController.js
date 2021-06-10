const { generateModel } = require("./models/generateModel");
const { generateApiRoutes } = require("./apiRoutes.js/generateApiRoutes");
const { generateRestTest } = require("./tests/generateRestTest");

const generatorController = (userInput) => {
  if (userInput[1] === "model" || userInput[1] === "m") {
    generateModel(userInput);
  } else if (userInput[1] === "routes" || userInput[1] === "r") {
    generateApiRoutes(userInput);
  } else if (userInput[1] === "tests" || userInput[1] === "t") {
    generateRestTest(userInput);
  } else {
    console.log(`Sorry, that command wasnt recognized`);
  }
};

module.exports = { generatorController };
