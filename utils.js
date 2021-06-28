"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = exports.createDirectory = void 0;
const fs_1 = __importDefault(require("fs"));
const createDirectory = (directoryPath) => {
    if (!directoryPath) {
        console.log(`no directoryPath recieved`);
        return `no directoryPath recieved`;
    }
    fs_1.default.mkdirSync(directoryPath, { recursive: true }, (error) => {
        if (error) {
            return `incorrect directory name format`;
        }
    });
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
    fs_1.default.writeFileSync(filePath, fileContent, { recursive: true }, (error) => {
        if (error) {
            console.log(`error in createFile --> ${error}`);
            return `error in createFile`;
        }
    });
    return `file created`;
};
exports.createFile = createFile;
