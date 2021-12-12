"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpperCaseFirstLetter = void 0;
const getUpperCaseFirstLetter = (modelName) => {
    if (modelName) {
        const upperCaseFirstLetterModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
        return upperCaseFirstLetterModelName;
    }
    else {
        console.log("couldn't capitalize first letter because no model name was given");
    }
};
exports.getUpperCaseFirstLetter = getUpperCaseFirstLetter;
