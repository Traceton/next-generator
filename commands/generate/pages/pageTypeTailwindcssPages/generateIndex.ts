import { getUpperCaseFirstLetter } from "./pagesUtils";

// Generate the index tailwindcss page.
export const generateIndex = (
  modelName: string,
  idType: string,
  finalSchemaItemsForIndex: string,
  finalSchemaTitleItemsForIndex: string
) => {
  let upperCaseFirstLetterModelName = getUpperCaseFirstLetter(modelName);

  const tailwindcssIndex = `
    import Link from 'next/link'

    export default function ${upperCaseFirstLetterModelName}(props) {
      return (
        <>
      <div className="h-screen p-2 rounded-md bg-gray-900 font-light">
        <div className="">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col justify-center">
              <h3 className=" m-1 p-1 text-4xl leading-6 font-light text-white">
              ${upperCaseFirstLetterModelName}s
              </h3>
            </div>

            <div className="m-2 p-2 w-full">
              <div className="pt-2 flex justify-end">
                <Link href="/${modelName}s/create${upperCaseFirstLetterModelName}" className="m-1 inline-flex justify-center py-2 px-4 border border-gray-700 shadow-sm text-xl font-light rounded-md text-white border-gray-500 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">  
                  +
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col m-0">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 b-none align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-800 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-800">
                  <thead className="bg-gray-800">
                    <tr> 
                      ${finalSchemaTitleItemsForIndex}
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-700 divide-y divide-gray-800">
                    {props.${modelName}s.map((${modelName}) => (
                      <tr key={${modelName}.${idType}}>
                        ${finalSchemaItemsForIndex}
                        <td className="px-2 py-4 whitespace-nowrap text-right font-light text-md flex justify-end">
                          <Link href={"/${modelName}s/" + ${modelName}.${idType}} className="m-1 inline-flex justify-center  px-2 border border-gray-900 shadow-sm  font-light rounded-md text-white border-gray-500 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            View
                          </Link>
                          <Link href={"/${modelName}s/edit${upperCaseFirstLetterModelName}s/" + ${modelName}.${idType}} className="m-1 inline-flex justify-center  px-2 border border-gray-900 shadow-sm  font-light rounded-md text-white border-gray-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
  `;

  return tailwindcssIndex;
};
