import { createDirectory, createFile, readNextConfig } from "../../../../utils";
import { existsSync } from "fs";

export const generatePostgresqlApiRoutes = async (userInput: string[]) => {
  const modelName = userInput[2];

  let configData = readNextConfig()

  if (!modelName) {
    return `no routeName recieved`;
  }

  const indexApiPage = `
  import { prisma } from '../../../utils/prismaInstance'

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const ${modelName}s = await prisma.${modelName}.findMany();

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
        const ${modelName} = await prisma.${modelName}.create({
            data: req.body
        });;

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
import { prisma } from '../../../utils/prismaInstance'

export default async (req, res) => {
  const ${modelName}Id = req.query.${modelName}Id;

  switch (req.method) {
    case "GET":
      try {
        const ${modelName} = await prisma.${modelName}.findUnique({
            where: {
              id: ${modelName}Id,
            },
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
          message: "${modelName} not found",
          error: error,
        });
      }
      break;
    case "PATCH":
      try {
        const ${modelName} = await prisma.${modelName}.update({
            where: { id: ${modelName}Id },
            data: req.body,
          })

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
        const ${modelName} = await prisma.${modelName}.delete({
            where: {
              id: ${modelName}Id,
            },
          });

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

  const prismaInstanceFile = `
  import { PrismaClient } from '@prisma/client'

declare global {
  // allow global 'var' declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma`;

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

  createFile(`${configData.projectRootPath}utils/prismaInstance.ts`, prismaInstanceFile);

  createFile(`${configData.projectRootPath}pages/api/${modelName}s/index.js`, indexApiPage);
  createFile(`${configData.projectRootPath}pages/api/${modelName}s/[${modelName}Id].js`, dynamicApiPage);
};

