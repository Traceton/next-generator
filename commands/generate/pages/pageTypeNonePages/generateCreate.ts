export const generateCreate = (modelName: string, upperCaseFirstLetterModelName: string, finalJsonBodyItems: string, finalFormFieldItems: string) => {

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
          <div>
            <form onSubmit={createNew${upperCaseFirstLetterModelName}}>
              <div>
                <h3>Create New ${upperCaseFirstLetterModelName}</h3>
              </div>
  
              <div>
              ${finalFormFieldItems} 
                <div>
                  <div>
                    <button
                      onClick={() => router.back()}
                      type="button"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
  
              </div>
            </form>
          </div>
    );
  }
    `;
  
    return createPage
  }