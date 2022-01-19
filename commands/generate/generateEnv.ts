import { createFile, readNextConfig } from "../../utils";
import { existsSync } from "fs";

export const generateEnv = () => {
    const configData = readNextConfig();

    switch (configData.database) {
        case "mongodb":
            if (!existsSync(`${configData.projectRootPath}.env`)) {
                createFile(
                 `${configData.projectRootPath}.env`,
                 `MONGODB_URI=your-database-string-here
                  NEXT_PUBLIC_HOST_URL=http://localhost:3000
               `
               );
             }
            break;

        case"postgresql":
        if (!existsSync(`${configData.projectRootPath}.env`)) {
            createFile(
             `${configData.projectRootPath}.env`,
             `DATABASE_URL=your-database-string-here
              NEXT_PUBLIC_HOST_URL=http://localhost:3000
           `
           );
         }
            break;  
        default:
            if (!existsSync(`${configData.projectRootPath}.env`)) {
                createFile(
                 `${configData.projectRootPath}.env`,
                 `NEXT_PUBLIC_HOST_URL=http://localhost:3000`
               );
             }  
            break;
    }

}