export const generateEdit = (modelName: string, upperCaseFirstLetterModelName: string, finalJsonBodyItems: string, finalEditFormFieldItems: string) => {

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
      <div>
        <div>
          <div>
            <form onSubmit={update${upperCaseFirstLetterModelName}}>
              <div>
                <h3>Edit ${upperCaseFirstLetterModelName}</h3>
              </div>
  
              <div>
              ${finalEditFormFieldItems}
                <div>
                  <div>
                    <button
                      onClick={() => router.back()}
                      type="button"
                    >
                      Back
                    </button>
                    <button
                      onClick={delete${upperCaseFirstLetterModelName}}
                      type="button"
                    >
                      Delete
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
  
    return editPage
  }