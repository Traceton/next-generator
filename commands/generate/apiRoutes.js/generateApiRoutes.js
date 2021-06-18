const { createDirectory, createFile } = require("../../../utils");
const { existsSync } = require("fs");

// g r truck

const generateApiRoutes = async (userInput) => {
  const modelName = userInput[2];

  const upperCaseFirstLetterModelName =
    modelName.charAt(0).toUpperCase() + modelName.slice(1);

  if (!modelName) {
    return `no routeName recieved`;
  }

  const indexApiPage = `
import ${upperCaseFirstLetterModelName} from "../../../components/models/${upperCaseFirstLetterModelName}";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const ${modelName} = await ${upperCaseFirstLetterModelName}.find({});

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
    case "POST":
      try {
        const new${upperCaseFirstLetterModelName} = await ${upperCaseFirstLetterModelName}.create(req.body);

        res.status(201).json({
          message_type: "success",
          message: "${modelName} found",
          ${modelName}: new${upperCaseFirstLetterModelName},
        });
      } catch (error) {
        res.status(400).json({
          message_type: "warning",
          message: "${modelName} not found",
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
          message: "${modelName} found",
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
        const deleted${upperCaseFirstLetterModelName} = await ${upperCaseFirstLetterModelName}.deleteOne({ _id: ${modelName}Id });

        if (!deleted${upperCaseFirstLetterModelName}) {
          return res
            .status(404)
            .json({ message_type: "warning", message: "${modelName} not found" });
        }

        res.status(201).json({
          message_type: "success",
          message: "${modelName} found",
          ${modelName}: deleted${upperCaseFirstLetterModelName},
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
      res.status(500).json({
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

  if (!existsSync(`pages`)) {
    await createDirectory("pages");
  }

  if (!existsSync(`pages/api`)) {
    await createDirectory("pages/api");
  }

  if (!existsSync(`pages/api/${upperCaseFirstLetterModelName}s`)) {
    createDirectory(`pages/api/${upperCaseFirstLetterModelName}s`);
  }

  if (!existsSync(`utils`)) {
    await createDirectory("utils");
  }

  createFile(`utils/dbConnect.js`, dbConnectFile);

  if (!existsSync(`.env.local`)) {
    await createFile(
      ".env.local",
      `MONGODB_URI=your-database-string-here
    MONGODB_DB=your-database-name-here    
    `
    );
  }

  createFile(
    `pages/api/${upperCaseFirstLetterModelName}s/index.js`,
    indexApiPage
  );
  createFile(
    `pages/api/${upperCaseFirstLetterModelName}s/[${modelName}Id].js`,
    dynamicApiPage
  );
};

module.exports = { generateApiRoutes };
