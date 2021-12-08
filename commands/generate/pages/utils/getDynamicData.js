"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDynamicDataForPages = void 0;
const utils_1 = require("../../../../utils");
const getDynamicTailwindcssData_1 = require("./getDynamicTailwindcssData");
const getDynamicDataForPages = (modelName, modelItems) => {
    const { style } = (0, utils_1.readNextConfig)();
    switch (style) {
        case "none":
            return (0, getDynamicTailwindcssData_1.getDynamicTailwindcssDataForPages)(modelName, modelItems);
            break;
        case "tailwindcss":
            return (0, getDynamicTailwindcssData_1.getDynamicTailwindcssDataForPages)(modelName, modelItems);
            break;
        default:
            const defaultMessage = `No Style found in nextGenConfig.json, using value of "none" for style`;
            console.log(defaultMessage);
            return (0, getDynamicTailwindcssData_1.getDynamicTailwindcssDataForPages)(modelName, modelItems);
            break;
    }
};
exports.getDynamicDataForPages = getDynamicDataForPages;
