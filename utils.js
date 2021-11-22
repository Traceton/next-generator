"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readNextConfig = exports.createFile = exports.createDirectory = void 0;
const fs_1 = __importDefault(require("fs"));
const createDirectory = (directoryPath) => {
    if (!directoryPath) {
        console.log(`no directoryPath recieved`);
        return `no directoryPath recieved`;
    }
    fs_1.default.mkdirSync(directoryPath, { recursive: true });
    return `directory created`;
};
exports.createDirectory = createDirectory;
const createFile = (filePath, fileContent) => {
    if (!filePath && !fileContent) {
        console.log(`no filePath and no fileContent recieved`);
        return `no filePath and no fileContent recieved`;
    }
    else if (!fileContent) {
        console.log(`no filePath OR no fileContent recieved`);
        return `no filePath OR no fileContent recieved`;
    }
    fs_1.default.writeFileSync(filePath, fileContent);
    return `file created`;
};
exports.createFile = createFile;
const readNextConfig = () => {
    const rawConfigFile = fs_1.default.readFileSync('nextGenConfig.json');
    const configData = JSON.parse(rawConfigFile.toString());
    let acceptedDatabases = ["mongodb"];
    let acceptedStyles = ["none", "tailwindcss"];
    if (configData) {
        if (acceptedDatabases.includes(configData.database)) {
            if (acceptedStyles.includes(configData.style)) {
                return configData;
            }
            else {
                console.log(`unknown style: ${configData.style}`);
            }
        }
        else {
            console.log(`unknown database: ${configData.database}`);
        }
    }
    else {
        console.log("No nextGenConfig.json found");
        return false;
    }
};
exports.readNextConfig = readNextConfig;
