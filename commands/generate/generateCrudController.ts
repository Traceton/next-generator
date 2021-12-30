
import { generateModelController } from "./models/generateModelController";
import { generateApiRoutesController} from "./apiRoutes/generateApiRoutesController"
import { generatePagesController } from "./pages/generatePagesController";

// Command to use this generator below:
// generate crud vehicle year:String make:String model:String

// Controller that routes userInput to the correct controllers when crud command is used. 
export const generateCrudController = (userInput: string[]) => {
    generateModelController(userInput);
    generateApiRoutesController(userInput);
    generatePagesController(userInput);
};

