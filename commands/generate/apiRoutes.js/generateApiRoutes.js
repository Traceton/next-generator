const { createDirectory, createFile } = require("../../../utils");
const { existsSync } = require("fs");

// g r truck

const generateApiRoutes = async (userInput) => {
  const modelName = userInput[2];

  const upperCaseFirstLetterModelName = userInput[2];
  if (!modelName) {
    return `no routeName recieved`;
  }

  const indexApiPage = `
  import ${upperCaseFirstLetterModelName} from "../../../components/models/${modelName}";

  import { MongoClient } from "mongodb";
  
  export default async (req, res) => {
    if (req.method === "GET") {
      const client = await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      const db = client.db();
  
      const ${modelName}sCollection = await db.collection("${modelName}s");
  
      let ${modelName}s = await ${modelName}sCollection.find().toArray();
  
      client.close();
  
      res.status(200).json(${modelName}s);
    } else if (req.method === "POST") {
      const client = await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      const db = client.db();
  
      const ${modelName}sCollection = db.collection("${modelName}s");
  
      const ${modelName} = await new ${upperCaseFirstLetterModelName}(req.body);
  
      let new${upperCaseFirstLetterModelName} = await ${modelName}sCollection.insertOne(${modelName});
  
      client.close();
  
      res.status(200).json({ new${upperCaseFirstLetterModelName} });
    } else if (req.method === "DELETE") {
      res.status(200).json({ name: "John Doe delete" });
    }
  };`;

  const dynamicApiPage = `// blank dynamic page`;

  if (!existsSync(`pages`)) {
    await createDirectory("pages");
  }

  if (!existsSync(`pages/api`)) {
    await createDirectory("pages/api");
  }

  if (!existsSync(`pages/api/${modelName}s`)) {
    createDirectory(`pages/api/${modelName}s`);
  }

  if (!existsSync(`.env.local`)) {
    await createFile(
      ".env.local",
      `MONGODB_URI=your-database-string-here
    MONGODB_DB=your-database-name-here    
    `
    );
  }

  createFile(`pages/api/${modelName}s/index.js`, indexApiPage);
  createFile(`pages/api/${modelName}s/[${modelName}Id].js`, dynamicApiPage);
};

module.exports = { generateApiRoutes };
