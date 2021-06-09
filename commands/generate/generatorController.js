const { generateModel } = require("./models/generateModel");
const { generateRoutes } = require("./routes/generateRoutes");

const generatorController = (userInput) => {
  if (userInput[1] === "model" || userInput[1] === "m") {
    generateModel(userInput);
  }
  if (userInput[1] === "routes" || userInput[1] === "r") {
    generateRoutes(userInput);
  }
};

module.exports = { generatorController };
