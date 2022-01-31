"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDynamicTailwindcssData = void 0;
const getDynamicTailwindcssData = (modelName, modelItems) => {
    let newModelItemTitlesForIndex = [];
    let newModelSchemaItemsForIndex = [];
    let newModelSchemaItemsForDynamicPage = [];
    let jsonBodyForForm = [];
    let formFieldItems = [];
    let editFormFieldItems = [];
    modelItems.map((unSplitEntry) => {
        let entry = unSplitEntry.split(":");
        let entryName = entry[0];
        let modelFieldTitleForIndex = `<th scope=^col^ className=^px-2 py-3 text-left text-xs font-medium text-white uppercase tracking-wider^>${entryName}</th>`;
        let modelFieldForIndex = `<td className=^px-2 py-4 whitespace-nowrap text-md text-gray-200^>{${modelName}.${entryName}}</td>`;
        let modelFieldForDynamicPage = `<div className=^sm:col-span-6^><label htmlFor=^${entryName}^ className=^block text-3xl font-light text-gray-700^>${entryName}</label><div className=^mt-1 flex rounded-md shadow-sm^><h1 id=^year^>{props.${modelName}.${entryName}}</h1></div></div>`;
        let jsonBodyField = ` ${entryName}: event.target.${entryName}.value`;
        let formField = `
    <div>
    <label
      htmlFor="${entryName}"
      className="block text-sm font-medium text-white"
    >
    ${entryName}
    </label>
    <div className="mt-1">
      <input
        id="${entryName}"
        name="${entryName}"
        type="${entryName}"
        autoComplete="${entryName}"
        required
        className="appearance-none block w-full px-3 py-2 bg-gray-700 border-0 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
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
        newModelItemTitlesForIndex.push(JSON.stringify(modelFieldTitleForIndex));
        newModelSchemaItemsForIndex.push(JSON.stringify(modelFieldForIndex));
        newModelSchemaItemsForDynamicPage.push(JSON.stringify(modelFieldForDynamicPage));
        jsonBodyForForm.push(JSON.stringify(jsonBodyField));
        formFieldItems.push(formField);
        editFormFieldItems.push(editFormField);
    });
    let finalSchemaTitleItemsForIndex = newModelItemTitlesForIndex
        .toString()
        .replace("[", "")
        .replace("]", "")
        .replace(/,/g, "")
        .replace(/`/g, "")
        .replace(/"/g, "")
        .replace(/\^/g, `"`);
    let finalSchemaItemsForIndex = newModelSchemaItemsForIndex
        .toString()
        .replace("[", "")
        .replace("]", "")
        .replace(/,/g, "")
        .replace(/`/g, "")
        .replace(/"/g, "")
        .replace(/\^/g, `"`);
    let finalSchemaItemsForDynamicPage = newModelSchemaItemsForDynamicPage
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
    let finalDynamicData = {
        finalSchemaTitleItemsForIndex: finalSchemaTitleItemsForIndex,
        finalSchemaItemsForIndex: finalSchemaItemsForIndex,
        finalSchemaItemsForDynamicPage: finalSchemaItemsForDynamicPage,
        finalJsonBodyItems: finalJsonBodyItems,
        finalFormFieldItems: finalFormFieldItems,
        finalEditFormFieldItems: finalEditFormFieldItems,
    };
    return finalDynamicData;
};
exports.getDynamicTailwindcssData = getDynamicTailwindcssData;
