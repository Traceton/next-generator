"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCreate = void 0;
const generateCreate = (modelName, idType, upperCaseFirstLetterModelName, finalJsonBodyItems, finalFormFieldItems) => {
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
    <>
      <div className="bg-gray-900 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            New ${modelName}
          </h2>
        </div>

        <div className=" mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-800 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={createNew${upperCaseFirstLetterModelName}}>
              ${finalFormFieldItems}
              <div className="flex flex-row ">
                <button
                  onClick={() => router.back()}
                  type="button"
                  className=" flex justify-center py-2 px-4 mx-1 border border-gray-900 rounded-md shadow-sm text-sm font-medium text-white bg-none hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className=" flex grow justify-center py-2 px-4 mx-1 border border-gray-900 rounded-md shadow-sm text-sm font-medium text-white bg-none hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
  `;
    return createPage;
};
exports.generateCreate = generateCreate;
