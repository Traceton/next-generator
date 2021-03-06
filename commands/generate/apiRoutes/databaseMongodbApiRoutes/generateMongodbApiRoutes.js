"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMongodbApiRoutes = void 0;
const utils_1 = require("../../../../utils");
const fs_1 = require("fs");
const generateMongodbApiRoutes = async (userInput) => {
    const modelName = userInput[2];
    let configData = (0, utils_1.readNextConfig)();
    if (!modelName) {
        return `no routeName recieved`;
    }
    const upperCaseFirstLetterModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
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
    if (!(0, fs_1.existsSync)(`${configData.projectRootPath}pages`)) {
        (0, utils_1.createDirectory)(`${configData.projectRootPath}pages`);
    }
    if (!(0, fs_1.existsSync)(`${configData.projectRootPath}pages/api`)) {
        (0, utils_1.createDirectory)(`${configData.projectRootPath}pages/api`);
    }
    if (!(0, fs_1.existsSync)(`${configData.projectRootPath}pages/api/${modelName}s`)) {
        (0, utils_1.createDirectory)(`${configData.projectRootPath}pages/api/${modelName}s`);
    }
    if (!(0, fs_1.existsSync)(`${configData.projectRootPath}utils`)) {
        (0, utils_1.createDirectory)(`${configData.projectRootPath}utils`);
    }
    (0, utils_1.createFile)(`${configData.projectRootPath}utils/dbConnect.js`, dbConnectFile);
    (0, utils_1.createFile)(`${configData.projectRootPath}pages/api/${modelName}s/index.js`, indexApiPage);
    (0, utils_1.createFile)(`${configData.projectRootPath}pages/api/${modelName}s/[${modelName}Id].js`, dynamicApiPage);
};
exports.generateMongodbApiRoutes = generateMongodbApiRoutes;
