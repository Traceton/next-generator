import fs from "fs";


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


// example of next config format given in nextGenConfigExample.json
export const readNextConfig = () => {
  // reads json from nextGenConfig.json
  const rawConfigFile = fs.readFileSync('nextGenConfig.json');
  // parses raw config file into json
  const configData = JSON.parse(rawConfigFile.toString())

  // all accepted databases should be listed here
  let acceptedDatabases = ["mongodb"]
  // all accepted styles should be listed here
  let acceptedStyles = ["none", "tailwindcss"];

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
    console.log("No nextGenConfig.json found")
    return false
  }

}

