import fs from "fs";
import { defaultConfig,acceptedDatabases,acceptedStyles } from "./next-generator-config"


export const createDirectory = (directoryPath: string) => {
  if (!directoryPath) {
    console.log(`no directoryPath recieved`);
    return `no directoryPath recieved`;
  }

  fs.mkdirSync(directoryPath, { recursive: true });
  return `directory created`;
};

export const createFile = (filePath: string, fileContent: string) => {
  if (!filePath && !fileContent) {
    console.log(`no filePath and no fileContent recieved`);
    return `no filePath and no fileContent recieved`;
  } else if (!fileContent) {
    console.log(`no filePath OR no fileContent recieved`);
    return `no filePath OR no fileContent recieved`;
  }

  fs.writeFileSync(
    filePath,
    fileContent
  );
  return `file created`;
};

// accepted databases & styles located in next-generator-config.ts
// example of next config format given in nextGenConfigExample.json
export const readNextConfig = () => {
  let configData;
  let path = `./nextGenConfig.json`

  try {
    // reads json from nextGenConfig.json
    const rawConfigFile = fs.readFileSync(path,{ encoding: "utf8" });
    // If no config file was found, uses the default config.
    console.log(`raw config file -> ${rawConfigFile}`)
    if (!rawConfigFile) {
      console.log("no config file found, using default config")
      configData = defaultConfig
    } else {
      configData = JSON.parse(rawConfigFile)
    }
  } catch (error) {
    console.log(error)
  }

  if (configData) {
    // checks if the database entered by the user is currently accepted.
    if (acceptedDatabases.includes(configData.database)) {
      // checks if the style entered by the user is currently accepted.
      if (acceptedStyles.includes(configData.style)) {
        return configData
      } else {
        console.log(`unknown style: ${configData.style}`)
      }
    } else {
      console.log(`unknown database: ${configData.database}`)
    }
  } else {
    console.log("No configData found")
    return defaultConfig
  }

}

