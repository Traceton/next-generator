import { createFile } from "../../utils";

// generates a nextGenConfig.json file with some default values.
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
