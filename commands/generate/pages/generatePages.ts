import { createDirectory, createFile } from "../../../utils";
import { existsSync } from "fs";

// g p truck make:String model:String

export const generatePages = async (userInput: string[]) => {
  const modelName = userInput[2];

  if (!modelName) {
    return `no modelName recieved`;
  }

  const upperCaseFirstLetterModelName =
    modelName.charAt(0).toUpperCase() + modelName.slice(1);

  let modelItems = userInput.slice(3);

  let neWModelSchemaItemsForIndex: string[] = [];

  let neWModelSchemaItemsForDynamicPage: string[] = [];

  let jsonBodyForForm: string[] = [];

  let formFieldItems: string[] = [];

  let editFormFieldItems: string[] = [];

  // maps through each command
  modelItems.map((unSplitEntry) => {
    let entry = unSplitEntry.split(":");
    let entryName = entry[0];

    let modelFieldForIndex = `<p className=^text-lg text-gray-500 truncate^>${entryName}: {${modelName}.${entryName}}</p> `
    let modelFieldForDynamicPage = `<div className=^sm:col-span-6^><label htmlFor=^${entryName}^ className=^block text-3xl font-light text-gray-700^>${entryName}</label><div className=^mt-1 flex rounded-md shadow-sm^><h1 id=^year^>{props.${modelName}.${entryName}}</h1></div></div>`
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



  // new index page
  const indexPage = `
    import Link from 'next/link'

    export default function ${upperCaseFirstLetterModelName}(props) {
      return (
        <div className="bg-gray-700 h-screen">
          <div className="p-2">
            <div className="m-4 p-4 rounded-md bg-gray-400 font-light space-y-8">
              <div className="flex flex-row">
                <div className="p-4 m-4">
                  <h3 className="text-4xl leading-6 font-light text-gray-900">${upperCaseFirstLetterModelName}s</h3>
                </div>

                <div className="m-2 p-2 w-full justify-end">
                  <div className="pt-2 flex justify-end">
                    <Link href="/${modelName}s/create${upperCaseFirstLetterModelName}">
                      <a className="m-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl font-light rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                        New
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {props.${modelName}s.map((${modelName}) => (
                  <div
                    key={${modelName}._id}
                    className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <div className="flex-1 min-w-0">
                      <a href={"/${modelName}s/" + ${modelName}._id} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        ${finalSchemaItemsForIndex}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    export const getServerSideProps = async () => {
      // fetch ${modelName} data from api here
      const res = await fetch(\`\${process.env.NEXT_PUBLIC_HOST_URL}/api/${modelName}s\`, {
        method: "GET",
        headers: {
          "User-Agent": "*",
          Accept: "application/json; charset=UTF-8",
        }
      });

      const data = await res.json();

      if (!data) {
        return {
          notFound: true,
        };
      }

      return {
        props: {
          ${modelName}s: data.${modelName}s,
        },
      };
    };
  `

  const dynamicPage = `
  import Link from 'next/link'
import { useRouter } from "next/router";

export default function ${upperCaseFirstLetterModelName}Details(props) {
  // router object from next
  const router = useRouter();

  const ${modelName} = props.${modelName}

  return (
    <div className="bg-gray-700 h-screen">
      <div className="p-2">
        <div className=" m-4 p-4 rounded-md bg-gray-400 font-light space-y-8 ">
          <form >
            <div>
              <h3 className="text-4xl leading-6 font-light text-gray-900">Show ${upperCaseFirstLetterModelName}</h3>
            </div>

            <div className="text-xl mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              ${finalSchemaItemsForDynamicPage}
              <div className="m-2 p-2 w-full">
                <div className="  flex justify-start">
                  <button
                    onClick={() => router.back()}
                    type="button"
                    className="m-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl font-light rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Back
                  </button>
                  <Link href={"/${modelName}s/edit${upperCaseFirstLetterModelName}s/" + ${modelName}._id}>
                    <a className="m-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl font-light rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                      Edit
                    </a>
                  </Link>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


export const getServerSideProps = async (context) => {
  // fetch ${modelName} data from api here
  const ${modelName}Id = context.params.${modelName}Id;
  const res = await fetch(\`\${process.env.NEXT_PUBLIC_HOST_URL}/api/${modelName}s/\${${modelName}Id}\`, {
    method: "GET"
  });

  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ${modelName}: data.${modelName},
    },
  };
};
  `

  const createPage = `
  import { useRouter } from 'next/router'
import React from "react";

export default function Create${upperCaseFirstLetterModelName}() {
  const router = useRouter()
  const createNew${upperCaseFirstLetterModelName} = async (event) => {
    event.preventDefault();

    const res = await fetch(\`\${process.env.NEXT_PUBLIC_HOST_URL}/api/${modelName}s\`, {
      body: JSON.stringify({
        ${finalJsonBodyItems}
      }),
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "*"
      },
      method: "POST",
    });

    router.push(\`/${modelName}s\`)

  };

  return (
    <div className="bg-gray-700 h-screen">
      <div className="p-2">
        <div className=" m-4 p-4 rounded-md bg-gray-400 font-light space-y-8 ">
          <form onSubmit={createNew${upperCaseFirstLetterModelName}}>
            <div>
              <h3 className="text-4xl leading-6 font-light text-gray-900">Create New ${upperCaseFirstLetterModelName}</h3>
            </div>

            <div className="text-xl mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            ${finalFormFieldItems} 
              <div className="m-2 p-2 w-full">
                <div className="  flex justify-start">
                  <button
                    onClick={() => router.back()}
                    type="button"
                    className="m-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl font-light rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="m-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl font-light rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
  `;

  const editPage = `
  import { useRouter } from "next/router";

export default function Edit${upperCaseFirstLetterModelName}(props) {
  // router object from next
  const router = useRouter();

  const ${modelName}Id = router.query.${modelName}Id;

  const update${upperCaseFirstLetterModelName} = async (event) => {
    event.preventDefault();

    const res = await fetch(\`\${process.env.NEXT_PUBLIC_HOST_URL}/api/${modelName}s/\${${modelName}Id}\`, {
      body: JSON.stringify({
        ${finalJsonBodyItems}
      }),
      headers: {
        "User-Agent": "*",
        "Content-Type": "application/json",
      },
      method: "PATCH",
    });

    router.push(\`/${modelName}s/\${${modelName}Id}\`)

  };

  const delete${upperCaseFirstLetterModelName} = async (event) => {
    event.preventDefault();

    const res = await fetch(\`\${process.env.NEXT_PUBLIC_HOST_URL}/api/${modelName}s/\${${modelName}Id}\`, {

      headers: {
        "User-Agent": "*",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    router.push(\`/${modelName}s\`)

  }

  return (
    <div className="bg-gray-700 h-screen">
      <div className="p-2">
        <div className=" m-4 p-4 rounded-md bg-gray-400 font-light space-y-8 ">
          <form onSubmit={update${upperCaseFirstLetterModelName}}>
            <div>
              <h3 className="text-4xl leading-6 font-light text-gray-900">Edit ${upperCaseFirstLetterModelName}</h3>
            </div>

            <div className="text-xl mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            ${finalEditFormFieldItems}
              <div className="m-2 p-2 w-full">
                <div className="  flex justify-start">
                  <button
                    onClick={() => router.back()}
                    type="button"
                    className="m-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl font-light rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Back
                  </button>
                  <button
                    onClick={delete${upperCaseFirstLetterModelName}}
                    type="button"
                    className="m-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl font-light rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Delete
                  </button>
                  <button
                    type="submit"
                    className="m-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl font-light rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  // fetch ${modelName} data from api here
  const ${modelName}Id = context.params.${modelName}Id;
  const res = await fetch(\`\${process.env.NEXT_PUBLIC_HOST_URL}/api/${modelName}s/\${${modelName}Id}\`, {
    headers: {
      "User-Agent": "*",
      Accept: "application/json; charset=UTF-8",
    },
    method: "GET"
  });

  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ${modelName}: data.${modelName},
    },
  };
};



  `;

  if (!existsSync(`pages`)) {
    createDirectory("pages");
  }

  if (!existsSync(`pages/${modelName}s`)) {
    createDirectory(`pages/${modelName}s`);
  }

  if (
    !existsSync(`pages/${modelName}s/edit${upperCaseFirstLetterModelName}s`)
  ) {
    createDirectory(
      `pages/${modelName}s/edit${upperCaseFirstLetterModelName}s`
    );
  }

  if (!existsSync(`.env.local`)) {
    createFile(
      ".env.local",
      ` MONGODB_URI=your-database-string-here 
        NEXT_PUBLIC_HOST_URL=http://localhost:3000
    `
    );
  }

  createFile(`pages/${modelName}s/index.js`, indexPage);

  createFile(`pages/${modelName}s/[${modelName}Id].js`, dynamicPage);

  createFile(
    `pages/${modelName}s/create${upperCaseFirstLetterModelName}.js`,
    createPage
  );

  createFile(
    `pages/${modelName}s/edit${upperCaseFirstLetterModelName}s/[${modelName}Id].js`,
    editPage
  );
};