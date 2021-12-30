// generate crud vehicle year:String make:String model:String
import { generateModelController } from "./models/generateModelController";
import { generateApiRoutesController} from "./apiRoutes/generateApiRoutesController"
import { generatePagesController } from "./pages/generatePagesController";

export const generateCrudController = (userInput: string[]) => {
    generateModelController(userInput);
    generateApiRoutesController(userInput);
    generatePagesController(userInput);
};

