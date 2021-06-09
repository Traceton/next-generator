const { generateModel } = require("./models/generateModel");
const { generateRoutes } = require("./routes/generateRoutes");
const { generateRestTest } = require("../generate/tests/generateRestTest");

const generatorController = (userInput) => {
  if (userInput[1] === "model" || userInput[1] === "m") {
    generateModel(userInput);
  } else if (userInput[1] === "routes" || userInput[1] === "r") {
    generateRoutes(userInput);
  } else if (userInput[1] === "tests" || userInput[1] === "t") {
    generateRestTest(userInput);
  } else {
    console.log(`Sorry, that command wasnt recognized`);
  }
};

module.exports = { generatorController };
