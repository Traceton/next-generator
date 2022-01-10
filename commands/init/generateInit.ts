import { createFile, readNextConfig } from "../../utils";

// generates a nextGenConfig.json file with some default values.
export const generateInit = async (userInput: string[]) => {

    let configData = readNextConfig()

    try {
        const nextGenConfig = `
{
    "database": "mongodb",
    "pageType": "none",
    "projectRootPath":""
}`
        
        createFile(
            `${configData.projectRootPath}nextGenConfig.json`,
            nextGenConfig
        );

    } catch (error) {
        console.log(error);
        return error;
    }
};
