// Generate the edit tailwindcss page.
export const generateEdit = (
  modelName: string,
  idType: string,
  upperCaseFirstLetterModelName: string,
  finalJsonBodyItems: string,
  finalEditFormFieldItems: string
) => {
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
    <>
      <div className="bg-gray-900 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Edit ${modelName}
          </h2>
        </div>

        <div className=" mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={update${upperCaseFirstLetterModelName}}>
              ${finalEditFormFieldItems}
              <div className="flex flex-row ">
                <button
                  onClick={() => router.back()}
                  type="button"
                  className=" flex justify-center py-2 px-4 mx-1 border border-gray-900 rounded-md shadow-sm text-sm font-medium text-white bg-none hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Back
                </button>
                <button
                  onClick={delete${upperCaseFirstLetterModelName}}
                  type="button"
                  className=" flex justify-center py-2 px-4 mx-1 border border-gray-900 rounded-md shadow-sm text-sm font-medium text-white bg-none hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  className=" flex grow justify-center py-2 px-4 mx-1 border border-gray-900 rounded-md shadow-sm text-sm font-medium text-white bg-none hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </div>
            </form>
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
