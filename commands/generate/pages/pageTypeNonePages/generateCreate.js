"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCreate = void 0;
const generateCreate = (modelName, upperCaseFirstLetterModelName, finalJsonBodyItems, finalFormFieldItems) => {
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
    return createPage;
};
exports.generateCreate = generateCreate;
