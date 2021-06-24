const { createDirectory, createFile } = require("../../../utils");
const { existsSync } = require("fs");

// g p truck make:String model:String

const generatePages = async (userInput) => {
  const modelName = userInput[2];

  const upperCaseFirstLetterModelName =
    modelName.charAt(0).toUpperCase() + modelName.slice(1);

  if (!modelName) {
    return `no modelName recieved`;
  }

  let modelItems = userInput.slice(3);

  let neWModelSchemaItems = [];

  let jsonBodyForForm = [];

  let formFieldItems = [];

  let editFormFieldItems = [];

  // maps through each command
  modelItems.map((unSplitEntry) => {
    let entry = unSplitEntry.split(":");
    let entryName = entry[0];
    let entryType = entry[1];

    let modelField = `<h1>${modelName} ${entryName} ---> {${modelName}.${entryName}}</h1>`;
    let jsonBodyField = ` ${entryName}: event.target.${entryName}.value`;
    let formField = ` <label htmlFor="${entryName}">${entryName}</label>
                      <input
                        id="${entryName}"
                        name="${entryName}"
                        type="text"
                        autoComplete="${entryName}"
                        required
                      />
                    `;

    let editFormField = ` <label htmlFor="${entryName}">${entryName}</label>
                      <input
                        defaultValue={props.${modelName}.${entryName}}
                        id="${entryName}"
                        name="${entryName}"
                        type="text"
                        autoComplete="${entryName}"
                        required
                      />
                    `;

    neWModelSchemaItems.push(JSON.stringify(modelField));
    jsonBodyForForm.push(JSON.stringify(jsonBodyField));
    formFieldItems.push(JSON.stringify(formField));
    editFormFieldItems.push(JSON.stringify(editFormField));
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
    .replace(/,/g, "")
    .replace(/"/g, "");

  let finalEditFormFieldItems = editFormFieldItems
    .toString()
    .replace("[", "")
    .replace("]", "")
    .replace(/,/g, "")
    .replace(/"/g, "");

  const indexPage = `
export default function ${upperCaseFirstLetterModelName}(props) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">${upperCaseFirstLetterModelName}s</span>
        </h2>
      </div>
      <div>
      {props.${modelName}s.map((${modelName}) => (
        <li key={${modelName}._id}>
        ${finalSchemaItems}
        </li>
      ))}
      </div>
    </div>
  );
}

export const getStaticProps = async (context) => {
  // fetch ${modelName} data from api here
  const res = await fetch("http://localhost:3000/api/${modelName}s");

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
  `;

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
  const res = await fetch(\`http://localhost:3000/api/projects/\${${modelName}Id}\`);

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
        <button type="submit">Create ${upperCaseFirstLetterModelName}</button>
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

        <button type="submit">Update ${upperCaseFirstLetterModelName}</button>
      </form>
    </div>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch(\`http://localhost:3000/api/projects\`);

  const data = await res.json();

  const staticPathParams = [];

  await data.projects.map((project) => {
    staticPathParams.push({ params: { projectId: project._id } });
  });

  return {
    paths: staticPathParams,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  // fetch project data from api here
  const projectId = context.params.projectId;
  const res = await fetch(\`http://localhost:3000/api/projects/\${projectId}\`);

  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project: data.project,
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

module.exports = { generatePages };
