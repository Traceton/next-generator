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

  let neWModelSchemaItems: string[] = [];

  let jsonBodyForForm: string[] = [];

  let formFieldItems: string[] = [];

  let editFormFieldItems: string[] = [];

  // maps through each command
  modelItems.map((unSplitEntry) => {
    let entry = unSplitEntry.split(":");
    let entryName = entry[0];

    // let modelField = `<h1>${modelName} ${entryName} ---> {${modelName}.${entryName}}</h1>`;
    let modelField = `<p className="text-lg text-gray-500 truncate">id: {${modelName}.${entryName}}</p>`
    let jsonBodyField = ` ${entryName}: event.target.${entryName}.value`;
    let formField = `<div className="flex flex-col m-4 p-2 text-center"> \
                    <label htmlFor="${entryName}" className="text-2xl"> \
                    ${entryName} \
                    </label> \
                    <input \
                      type="text" \
                      name="${entryName}" \
                      id="${entryName}" \
                      className="py-4 m-1  bg-gray-350 rounded" \
                      required \
                    /> \
                  </div>`;

    let editFormField = `<div className="flex flex-col m-4 p-2 text-center"> \
                      <label htmlFor="${entryName}" className="text-2xl"> \
                      ${entryName} \
                      </label> \
                      <input \
                        defaultValue={props.${modelName}.${entryName}} \
                        type="text" \
                        name="${entryName}" \
                        id="${entryName}" \
                        className="py-4 m-1  bg-gray-350 rounded" \
                        required \
                      /> \
                    </div>`;

    neWModelSchemaItems.push(JSON.stringify(modelField));
    jsonBodyForForm.push(JSON.stringify(jsonBodyField));
    formFieldItems.push(formField);
    editFormFieldItems.push(editFormField);
  });

  let finalSchemaItems = neWModelSchemaItems
    .toString()
    .replace("[", "")
    .replace("]", "")
    .replace(/`/g, "")
    .replace(/,/g, "")
    .replace(/"/g, "");

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

  //   const indexPage = `
  // export default function ${upperCaseFirstLetterModelName}(props) {
  //   return (
  //     <div className="bg-white shadow overflow-hidden sm:rounded-md">
  //       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
  //         <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
  //           <span className="block">${upperCaseFirstLetterModelName}s</span>
  //         </h2>
  //       </div>
  //       <div>
  //       {props.${modelName}s.map((${modelName}) => (
  //         <li key={${modelName}._id}>
  //         ${finalSchemaItems}
  //         </li>
  //       ))}
  //       </div>
  //     </div>
  //   );
  // }


  // export const getStaticProps = async (context) => {
  //   // fetch ${modelName} data from api here
  //   const res = await fetch("http://localhost:3000/api/${modelName}s");

  //   const data = await res.json();

  //   if (!data) {
  //     return {
  //       notFound: true,
  //     };
  //   }

  //   return {
  //     props: {
  //       ${modelName}s: data.${modelName}s,
  //     },
  //   };
  // };
  //   `;

  const indexPage = `
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
                  ${finalSchemaItems}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
`

  const dynamicPage = `
  import { useRouter } from "next/router";

export default function ${modelName}Details(props) {
  // router object from next
  const router = useRouter();

  const ${modelName} = props.${modelName}

  return (
    <div>
      ${finalSchemaItems}
    </div>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch(\`http://localhost:3000/api/${modelName}s\`);

  const data = await res.json();

  const staticPathParams = [];

  await data.${modelName}s.map((${modelName}) => {
    staticPathParams.push({ params: { ${modelName}Id: ${modelName}._id } });
  });

  return {
    paths: staticPathParams,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  // fetch ${modelName} data from api here
  const ${modelName}Id = context.params.${modelName}Id;
  const res = await fetch(\`http://localhost:3000/api/${modelName}s/\${${modelName}Id}\`);

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

  const createPage = `
  import React from "react";

export default function create${upperCaseFirstLetterModelName}() {
  const createNew${upperCaseFirstLetterModelName} = async (event) => {
    event.preventDefault();

    const res = await fetch("http://localhost:3000/api/${modelName}s", {
      body: JSON.stringify({
        ${finalJsonBodyItems}
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  };

  return (
    <div className="bg-blue-500 h-screen w-full flex flex-col justify-center">
      <form
        className="w-1/2 flex flex-col justify-center self-center"
        onSubmit={createNew${upperCaseFirstLetterModelName}}
      >
      ${finalFormFieldItems}
      <input
      type="submit"
      value="Create ${upperCaseFirstLetterModelName}"
      className="bg-gray-350 hover:bg-green-500 font-2xl rounded px-10 py-4 m-2"
    ></input>
      </form>
    </div>
  );
}

  `;

  const editPage = `
  import { useRouter } from "next/router";

export default function edit${upperCaseFirstLetterModelName}(props) {
  // router object from next
  const router = useRouter();

  const ${modelName}Id = router.query.${modelName}Id;


  const update${upperCaseFirstLetterModelName} = async (event) => {
    event.preventDefault();

    const res = await fetch(\`http://localhost:3000/api/${modelName}s/\${${modelName}Id}\`, {
      body: JSON.stringify({
        ${finalJsonBodyItems}
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
    });
  };

  return (
    <div className="bg-blue-500 h-screen w-full flex flex-col justify-center">
      <form
        className="w-1/2 flex flex-col justify-center self-center"
        onSubmit={update${upperCaseFirstLetterModelName}}
      >
        ${finalEditFormFieldItems}
      <input
          type="submit"
          value="Update ${upperCaseFirstLetterModelName}"
          className="bg-gray-350 hover:bg-green-500 font-2xl rounded px-10 py-4 m-2"
        ></input>
      </form>
    </div>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch(\`http://localhost:3000/api/${modelName}s\`);

  const data = await res.json();

  const staticPathParams = [];

  await data.${modelName}s.map((${modelName}) => {
    staticPathParams.push({ params: { ${modelName}Id: ${modelName}._id } });
  });

  return {
    paths: staticPathParams,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  // fetch ${modelName} data from api here
  const ${modelName}Id = context.params.${modelName}Id;
  const res = await fetch(\`http://localhost:3000/api/${modelName}s/\${${modelName}Id}\`);

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
    await createDirectory("pages");
  }

  if (!existsSync(`pages/${modelName}s`)) {
    await createDirectory(`pages/${modelName}s`);
  }

  if (
    !existsSync(`pages/${modelName}s/edit${upperCaseFirstLetterModelName}s`)
  ) {
    await createDirectory(
      `pages/${modelName}s/edit${upperCaseFirstLetterModelName}s`
    );
  }

  if (!existsSync(`.env.local`)) {
    await createFile(
      ".env.local",
      `MONGODB_URI=your-database-string-here
    MONGODB_DB=your-database-name-here    
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


