
import { generateModel } from "../models/generateModel"
import { generateApiRoutes } from "../apiRoutes.js/generateApiRoutes"
import { generatePages } from "../pages/generatePages"

// generate crud vehicle year:String make:String model:String

export const generateCrud = async (userInput: string[]) => {
  await generateModel(userInput);
  await generateApiRoutes(userInput);
  await generatePages(userInput);
};

