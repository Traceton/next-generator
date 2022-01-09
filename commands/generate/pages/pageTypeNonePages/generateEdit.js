"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEdit = void 0;
const generateEdit = (modelName, upperCaseFirstLetterModelName, finalJsonBodyItems, finalEditFormFieldItems) => {
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
    return editPage;
};
exports.generateEdit = generateEdit;
