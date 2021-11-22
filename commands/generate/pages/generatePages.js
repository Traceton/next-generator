"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePages = void 0;
const utils_1 = require("../../../utils");
const fs_1 = require("fs");
const generatePages = async (userInput) => {
    const modelName = userInput[2];
    if (!modelName) {
        return `no modelName recieved`;
    }
    const upperCaseFirstLetterModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    let modelItems = userInput.slice(3);
    let neWModelSchemaItemsForIndex = [];
    let neWModelSchemaItemsForDynamicPage = [];
    let jsonBodyForForm = [];
    let formFieldItems = [];
    let editFormFieldItems = [];
    modelItems.map((unSplitEntry) => {
        let entry = unSplitEntry.split(":");
        let entryName = entry[0];
        let modelFieldForIndex = `<p className=^text-lg text-gray-500 truncate^>${entryName}: {${modelName}.${entryName}}</p> `;
        let modelFieldForDynamicPage = `<div className=^sm:col-span-6^><label htmlFor=^${entryName}^ className=^block text-3xl font-light text-gray-700^>${entryName}</label><div className=^mt-1 flex rounded-md shadow-sm^><h1 id=^year^>{props.${modelName}.${entryName}}</h1></div></div>`;
        let jsonBodyField = ` ${entryName}: event.target.${entryName}.value`;
        let formField = `<div className="sm:col-span-6">
                      <label htmlFor="${entryName}" className="block text-3xl font-light text-gray-700">
                        ${entryName}
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="${entryName}"
                          id="${entryName}"
                          autoComplete="${entryName}"
                          className="shadow-sm  border border-transparent block h-10 w-full text-xl font-light sm:text-sm border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>`;
        let editFormField = `<div className="sm:col-span-6">
    <label htmlFor="${entryName}" className="block text-3xl font-light text-gray-700">
      ${entryName}
    </label>
    <div className="mt-1 flex rounded-md shadow-sm">
      <input
      defaultValue={props.${modelName}.${entryName}}
        type="text"
        name="${entryName}"
        id="${entryName}"
        autoComplete="${entryName}"
        className="shadow-sm  border border-transparent block h-10 w-full text-xl font-light sm:text-sm border border-gray-300 rounded-md"
      />
    </div>
  </div>`;
        neWModelSchemaItemsForIndex.push(JSON.stringify(modelFieldForIndex));
        neWModelSchemaItemsForDynamicPage.push(JSON.stringify(modelFieldForDynamicPage));
        jsonBodyForForm.push(JSON.stringify(jsonBodyField));
        formFieldItems.push(formField);
        editFormFieldItems.push(editFormField);
    });
    let finalSchemaItemsForIndex = neWModelSchemaItemsForIndex
        .toString()
        .replace("[", "")
        .replace("]", "")
        .replace(/,/g, "")
        .replace(/`/g, "")
        .replace(/"/g, "")
        .replace(/\^/g, `"`);
    let finalSchemaItemsForDynamicPage = neWModelSchemaItemsForDynamicPage
        .toString()
        .replace("[", "")
        .replace("]", "")
        .replace(/`/g, "")
        .replace(/,/g, "")
        .replace(/"/g, "")
        .replace(/\^/g, `"`);
    let finalJsonBodyItems = jsonBodyForForm
        .toString()
        .replace("[", "")
        .replace("]", "")
        .replace(/`/g, "")
        .replace(/"/g, "");
    let finalFormFieldItems = formFieldItems
        .toString()
        .replace("[", "")
        .replace("]", "")
        .replace(/,/g, "");
    let finalEditFormFieldItems = editFormFieldItems
        .toString()
        .replace("[", "")
        .replace("]", "")
        .replace(/,/g, "");
    if (!(0, fs_1.existsSync)(`pages`)) {
        (0, utils_1.createDirectory)("pages");
    }
    if (!(0, fs_1.existsSync)(`pages/${modelName}s`)) {
        (0, utils_1.createDirectory)(`pages/${modelName}s`);
    }
    if (!(0, fs_1.existsSync)(`pages/${modelName}s/edit${upperCaseFirstLetterModelName}s`)) {
        (0, utils_1.createDirectory)(`pages/${modelName}s/edit${upperCaseFirstLetterModelName}s`);
    }
    if (!(0, fs_1.existsSync)(`.env.local`)) {
        (0, utils_1.createFile)(".env.local", ` MONGODB_URI=your-database-string-here 
        NEXT_PUBLIC_HOST_URL=http://localhost:3000
    `);
    }
    (0, utils_1.createFile)(`pages/${modelName}s/index.js`, indexPage);
    (0, utils_1.createFile)(`pages/${modelName}s/[${modelName}Id].js`, dynamicPage);
    (0, utils_1.createFile)(`pages/${modelName}s/create${upperCaseFirstLetterModelName}.js`, createPage);
    (0, utils_1.createFile)(`pages/${modelName}s/edit${upperCaseFirstLetterModelName}s/[${modelName}Id].js`, editPage);
};
exports.generatePages = generatePages;
