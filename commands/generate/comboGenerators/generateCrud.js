const { generateModel } = require("../models/generateModel");
const { generateApiRoutes } = require("../apiRoutes.js/generateApiRoutes");
const { generatePages } = require("../pages/generatePages");

// generate crud vehicle year:String make:String model:String

const generateCrud = async (userInput) => {
  await generateModel(userInput);
  await generateApiRoutes(userInput);
  await generatePages(userInput);
};

module.exports = { generateCrud };
