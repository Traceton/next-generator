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
                    <Link href={"/${modelName}s/edit${upperCaseFirstLetterModelName}s/" + ${modelName}.${idType}}>
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
    `;

  return dynamicPage;
};
