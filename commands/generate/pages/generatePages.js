const { createDirectory, createFile } = require("../../../utils");
const { existsSync } = require("fs");

// g p truck

const generatePages = async (userInput) => {
  const modelName = userInput[2];

  const upperCaseFirstLetterModelName =
    modelName.charAt(0).toUpperCase() + modelName.slice(1);

  if (!modelName) {
    return `no modelName recieved`;
  }

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
        <ProjectList projects={props.${modelName}s} />
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

  const dynamicPage = `// blank dynamic page`;

  if (!existsSync(`pages`)) {
    await createDirectory("pages");
  }

  if (!existsSync(`pages/${modelName}s`)) {
    await createDirectory(`pages/${modelName}s`);
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
};

module.exports = { generatePages };
