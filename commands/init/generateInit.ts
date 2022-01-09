import { createFile } from "../../utils";

// generates a mongoose/mongodb model using userInput. 
export const generateInit = async (userInput: string[]) => {

    try {
        const nextGenConfig = `
{
    "database": "mongodb",
    "pageType": "tailwindcss"
}`
        
        createFile(
            `nextGenConfig.json`,
            nextGenConfig
        );

    } catch (error) {
        console.log(error);
        return error;
    }
};
