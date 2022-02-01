"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDynamic = void 0;
const generateDynamic = (modelName, idType, upperCaseFirstLetterModelName, finalSchemaItemsForDynamicPage) => {
    const dynamicPage = `
    import Link from 'next/link'
  import { useRouter } from "next/router";
  
  export default function ${upperCaseFirstLetterModelName}Details(props) {
    // router object from next
    const router = useRouter();
  
    const ${modelName} = props.${modelName}
  
    return (
          <div>
            <form >
              <div>
                <h3>Show ${upperCaseFirstLetterModelName}</h3>
              </div>
  
              <div>
                ${finalSchemaItemsForDynamicPage}
                <div>
                  <div>
                  <Link href={"/${modelName}s"}>
                  <a>
                    Home
                  </a>
                </Link>
                    <Link href={"/${modelName}s/edit${upperCaseFirstLetterModelName}s/" + ${modelName}.${idType}}>
                      <a>
                        Edit
                      </a>
                    </Link>
                  </div>
                </div>
  
              </div>
            </form>
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
exports.generateDynamic = generateDynamic;
