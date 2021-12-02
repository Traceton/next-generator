"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIndex = void 0;
const utils_1 = require("../../../../utils");
const noneIndex_1 = require("./noneIndex");
const tailwindcssIndex_1 = require("./tailwindcssIndex");
const generateIndex = (modelName, finalSchemaItemsForIndex) => {
    const { style } = (0, utils_1.readNextConfig)();
    switch (style) {
        case "none":
            return (0, noneIndex_1.noneIndex)(modelName, finalSchemaItemsForIndex);
            break;
        case "tailwindcss":
            return (0, tailwindcssIndex_1.tailwindcssIndex)(modelName, finalSchemaItemsForIndex);
            break;
        default:
            return "No style found at generateIndex.ts";
            break;
    }
};
exports.generateIndex = generateIndex;
