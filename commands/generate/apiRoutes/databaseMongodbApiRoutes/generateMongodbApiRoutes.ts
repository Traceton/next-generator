import { createDirectory, createFile, readNextConfig } from "../../../../utils";
import { existsSync } from "fs";

export const generateMongodbApiRoutes = async (userInput: string[]) => {
  const modelName = userInput[2];

  let configData = readNextConfig();

  if (!modelName) {
    return `no routeName recieved`;
  }

  const upperCaseFirstLetterModelName =
    modelName.charAt(0).toUpperCase() + modelName.slice(1);

  const indexApiPage = `
import ${upperCaseFirstLetterModelName} from "../../../components/models/${upperCaseFirstLetterModelName}";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const ${modelName}s = await ${upperCaseFirstLetterModelName}.find({});

        if (!${modelName}s) {
          return res
            .status(404)
            .json({ message_type: "warning", message: "${modelName}s not found" });
        }

        res.status(201).json({
          message_type: "success",
          message: "${modelName}s found",
          ${modelName}s: ${modelName}s,
        });
      } catch (error) {
        res.status(400).json({
          message_type: "warning",
          message: "${modelName}s not found",
          error: error,
        });
      }
      break;
    case "POST":
      try {
        const ${modelName} = await ${upperCaseFirstLetterModelName}.create(req.body);

        res.status(201).json({
          message_type: "success",
          message: "${modelName} created",
          ${modelName}: ${modelName},
        });
      } catch (error) {
        res.status(400).json({
          message_type: "warning",
          message: "${modelName} not created",
          error: error,
        });
      }
      break;
    default:
      res.status(500).json({
        message_type: "error",
        message: "Response method not found",
      });
      break;
  }
};
  `;

  const dynamicApiPage = `
  import ${upperCaseFirstLetterModelName} from "../../../components/models/${upperCaseFirstLetterModelName}";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async (req, res) => {
  const ${modelName}Id = req.query.${modelName}Id;

  switch (req.method) {
    case "GET":
      try {
        const ${modelName} = await ${upperCaseFirstLetterModelName}.findById(${modelName}Id);

        if (!${modelName}) {
          return res
            .status(404)
            .json({ message_type: "warning", message: "${modelName} not found" });
        }

        res.status(201).json({
          message_type: "success",
          message: "${modelName} found",
          ${modelName}: ${modelName},
        });
      } catch (error) {
        res.status(400).json({
          message_type: "warning",
          message: "${modelName} not found",
          error: error,
        });
      }
      break;
    case "PATCH":
      try {
        const ${modelName} = await ${upperCaseFirstLetterModelName}.findByIdAndUpdate(${modelName}Id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!${modelName}) {
          return res
            .status(404)
            .json({ message_type: "warning", message: "${modelName} not found" });
        }

        res.status(201).json({
          message_type: "success",
          message: "${modelName} updated",
          ${modelName}: ${modelName},
        });
      } catch (error) {
        res.status(400).json({
          message_type: "warning",
          message: "${modelName} not updated",
          error: error,
        });
      }
      break;
    case "DELETE":
      try {
        const ${modelName} = await ${upperCaseFirstLetterModelName}.deleteOne({ _id: ${modelName}Id });

        if (!${modelName}) {
          return res
            .status(404)
            .json({ message_type: "warning", message: "${modelName} not found" });
        }

        res.status(201).json({
          message_type: "success",
          message: "${modelName} deleted",
          ${modelName}: ${modelName},
        });
      } catch (error) {
        res.status(400).json({
          message_type: "warning",
          message: "${modelName} not deleted",
          error: error,
        });
      }
      break;
    default:
      res.status(404).json({
        message_type: "error",
        message: "Response method not found",
      });
      break;
  }
};

  `;

  const dbConnectFile = `
  import mongoose from "mongoose";

  const connection = {};
  
  async function dbConnect() {
    if (connection.isConnected) {
      return;
    }
  
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  
    connection.isConnected = db.connections[0].readyState;
  }
  
  export default dbConnect;`;

  if (!existsSync(`${configData.projectRootPath}pages`)) {
    createDirectory(`${configData.projectRootPath}pages`);
  }

  if (!existsSync(`${configData.projectRootPath}pages/api`)) {
    createDirectory(`${configData.projectRootPath}pages/api`);
  }

  if (!existsSync(`${configData.projectRootPath}pages/api/${modelName}s`)) {
    createDirectory(`${configData.projectRootPath}pages/api/${modelName}s`);
  }

  if (!existsSync(`${configData.projectRootPath}utils`)) {
    createDirectory(`${configData.projectRootPath}utils`);
  }

  createFile(`${configData.projectRootPath}utils/dbConnect.js`, dbConnectFile);

  createFile(
    `${configData.projectRootPath}pages/api/${modelName}s/index.js`,
    indexApiPage
  );
  createFile(
    `${configData.projectRootPath}pages/api/${modelName}s/[${modelName}Id].js`,
    dynamicApiPage
  );
};
