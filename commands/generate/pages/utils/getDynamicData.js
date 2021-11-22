"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDynamicDataForPages = void 0;
const getDynamicDataForPages = (modelName, modelItems) => {
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
};
exports.getDynamicDataForPages = getDynamicDataForPages;
