"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEnv = void 0;
const utils_1 = require("../../utils");
const fs_1 = require("fs");
const generateEnv = () => {
    const configData = (0, utils_1.readNextConfig)();
    switch (configData.database) {
        case "mongodb":
            if (!(0, fs_1.existsSync)(`${configData.projectRootPath}.env`)) {
                (0, utils_1.createFile)(`${configData.projectRootPath}.env`, `MONGODB_URI=your-database-string-here
                  NEXT_PUBLIC_HOST_URL=http://localhost:3000
               `);
            }
            break;
        case "postgresql":
            if (!(0, fs_1.existsSync)(`${configData.projectRootPath}.env`)) {
                (0, utils_1.createFile)(`${configData.projectRootPath}.env`, `DATABASE_URL=your-database-string-here
              NEXT_PUBLIC_HOST_URL=http://localhost:3000
           `);
            }
            break;
        default:
            if (!(0, fs_1.existsSync)(`${configData.projectRootPath}.env`)) {
                (0, utils_1.createFile)(`${configData.projectRootPath}.env`, `NEXT_PUBLIC_HOST_URL=http://localhost:3000`);
            }
            break;
    }
};
exports.generateEnv = generateEnv;
