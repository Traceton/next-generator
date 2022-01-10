"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readNextConfig = exports.createFile = exports.createDirectory = void 0;
const fs_1 = __importDefault(require("fs"));
const nextGeneratorConfig_1 = require("./nextGeneratorConfig");
const createDirectory = (directoryPath) => {
    let configData = (0, exports.readNextConfig)();
    if (!directoryPath) {
        console.log(`no directoryPath recieved`);
        return `no directoryPath recieved`;
    }
    fs_1.default.mkdirSync(`${configData.projectRootPath}${directoryPath}`, { recursive: true });
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
    let configData;
    let path = `nextGenConfig.json`;
    try {
        const rawConfigFile = fs_1.default.readFileSync(path, { encoding: "utf8" });
        if (!rawConfigFile || rawConfigFile == undefined) {
            console.log("no config file found, using default config");
            configData = nextGeneratorConfig_1.defaultConfig;
        }
        else {
            configData = JSON.parse(rawConfigFile);
        }
    }
    catch (error) {
        console.log(error);
    }
    if (configData) {
        if (nextGeneratorConfig_1.acceptedDatabases.includes(configData.database)) {
            if (nextGeneratorConfig_1.acceptedPageTypes.includes(configData.pageType)) {
                return configData;
            }
            else {
                console.log(`unknown pageType: ${configData.pageType}`);
            }
        }
        else {
            console.log(`unknown database: ${configData.database}`);
        }
    }
    else {
        console.log("No configData found, returning default config");
        return nextGeneratorConfig_1.defaultConfig;
    }
};
exports.readNextConfig = readNextConfig;
