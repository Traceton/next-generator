// default config if one isnt found
export const defaultConfig = {
    "database": "mongodb",
    "pageType": "none",
    "projectRootPath":""
}
// all accepted databases should be listed here
export const acceptedDatabases = ["mongodb","postgresql"]
// all accepted pageType should be listed here
export const acceptedPageTypes = ["none", "tailwindcss"];