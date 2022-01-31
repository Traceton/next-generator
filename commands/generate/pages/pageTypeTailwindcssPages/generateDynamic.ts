// Generate the dynamic tailwindcss page.
export const generateDynamic = (
  modelName: string,
  idType: string,
  upperCaseFirstLetterModelName: string,
  finalSchemaItemsForDynamicPage: string
) => {
  const dynamicPage = `
  import Link from 'next/link'
import { useRouter } from "next/router";

export default function ${upperCaseFirstLetterModelName}Details(props) {
  // router object from next
  const router = useRouter();

  const ${modelName} = props.${modelName}

  return (
    <>
      <div className="bg-gray-900 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            View ${modelName}
          </h2>
        </div>

        <div className=" mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-800 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              ${finalSchemaItemsForDynamicPage}
              <div className="flex flex-row ">
                <Link href={"/${modelName}s"}>
                  <a className=" flex justify-center py-2 px-4 mx-1 border border-gray-900 rounded-md shadow-sm text-sm font-medium text-white bg-none hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Home
                  </a>
                </Link>
                <Link href={"/${modelName}s/edit${upperCaseFirstLetterModelName}s/" + ${modelName}.${idType}}>
                  <a className=" flex grow justify-center py-2 px-4 mx-1 border border-gray-900 rounded-md shadow-sm text-sm font-medium text-white bg-none hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Edit
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
  `;

  return dynamicPage;
};
