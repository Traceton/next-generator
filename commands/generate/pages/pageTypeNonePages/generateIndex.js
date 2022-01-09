"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIndex = void 0;
const pagesUtils_1 = require("./pagesUtils");
const generateIndex = (modelName, finalSchemaItemsForIndex) => {
    let upperCaseFirstLetterModelName = (0, pagesUtils_1.getUpperCaseFirstLetter)(modelName);
    const noneIndex = `
    import Link from 'next/link'

    export default function ${upperCaseFirstLetterModelName}(props) {
      return (
            <div>
                <div>
                  <h3>${upperCaseFirstLetterModelName}s</h3>
                </div>

                <div>
                  <div>
                    <Link href="/${modelName}s/create${upperCaseFirstLetterModelName}">
                      <a>
                        New
                      </a>
                    </Link>
                  </div>
              </div>

              <div>
                {props.${modelName}s.map((${modelName}) => (
                  <div
                    key={${modelName}._id}  
                  >
                    <div>
                      <a href={"/${modelName}s/" + ${modelName}._id}>
                        <span aria-hidden="true" />
                        ${finalSchemaItemsForIndex}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
    return noneIndex;
};
exports.generateIndex = generateIndex;
