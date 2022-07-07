// Get the dynamic data for pages using tailwindcss for pageType in their config.
export const getDynamicTailwindcssData = (
  modelName: string,
  modelItems: string[]
) => {
  let newModelItemTitlesForIndex: string[] = [];

  let newModelSchemaItemsForIndex: string[] = [];

  let newModelSchemaItemsForDynamicPage: string[] = [];

  let jsonBodyForForm: string[] = [];

  let formFieldItems: string[] = [];

  let editFormFieldItems: string[] = [];

  // maps through each command
  modelItems.map((unSplitEntry: string) => {
    let entry = unSplitEntry.split(":");
    let entryName = entry[0];

    let modelFieldTitleForIndex = `<th scope=^col^ className=^px-2 py-3 text-left text-xs font-medium text-white uppercase tracking-wider^>${entryName}</th>`;
    let modelFieldForIndex = `<td className=^px-2 py-4 whitespace-nowrap text-base text-gray-200^>{${modelName}.${entryName}}</td>`;
    let modelFieldForDynamicPage = `<div><label htmlFor=^${entryName}^ className=^block text-sm font-bold text-white^>${entryName}</label><div className=^mt-1^><h3 id=^${entryName}^ name=^${entryName}^ className=^appearance-none block w-full px-3 py-2 bg-gray-800 border-0 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-200^>{props.${modelName}.${entryName}}</h3></div></div>`;
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

    let editFormField = `<div>
    <label
      htmlFor="${entryName}"
      className="block text-sm font-medium text-white"
    >
    ${entryName}
    </label>
    <div className="mt-1">
      <input
        defaultValue={props.${modelName}.${entryName}}
        id="${entryName}"
        name="${entryName}"
        type="${entryName}"
        autoComplete="${entryName}"
        required
        className="appearance-none block w-full px-3 py-2 bg-gray-700 border-0 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
      />
    </div>
  </div>`;

    newModelItemTitlesForIndex.push(JSON.stringify(modelFieldTitleForIndex));
    newModelSchemaItemsForIndex.push(JSON.stringify(modelFieldForIndex));
    newModelSchemaItemsForDynamicPage.push(
      JSON.stringify(modelFieldForDynamicPage)
    );
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
