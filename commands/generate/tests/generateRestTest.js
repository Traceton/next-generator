"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRestTest = void 0;
const utils_1 = require("../../../utils");
const fs_1 = require("fs");
const generateRestTest = async (userInput) => {
    const modelName = userInput[2];
    let ModelAttributes = userInput.slice(3);
    let finalAttributesForJSON = [];
    let idAttribute = `\n \t${JSON.stringify(modelName + "_id")}: "1" `;
    finalAttributesForJSON.push(idAttribute);
    ModelAttributes.map((item) => {
        let modelAttribute = item.split(":");
        let attributeName = modelAttribute[0];
        let AttributesForJSON = `\n \t${JSON.stringify(attributeName)}: "Test value" `;
        finalAttributesForJSON.push(AttributesForJSON);
    });
    let restFile = `
# generated rest file from node-treker
#model name - ${modelName}

# GET all of the instances of a certain model
GET http://localhost:3001/${modelName}s
Content-type: application/json


###



# GET a single instance of a certain model by id
GET http://localhost:3001/${modelName}s/1
Content-type: application/json


###



# POST a single new instance of a certain model
POST http://localhost:3001/${modelName}s
Content-type: application/json \n
{
  ${finalAttributesForJSON}
}



###



# PATCH a single instance of a certain model
PATCH http://localhost:3001/${modelName}s/1
Content-type: application/json \n
{
  ${finalAttributesForJSON}
}



###



# DELETE a single instance of a certain model
DELETE http://localhost:3001/${modelName}s/1
Content-type: application/json

`;
    if (!fs_1.existsSync(`tests`)) {
        await utils_1.createDirectory("tests");
        await utils_1.createFile(`tests/${modelName}.rest`, restFile);
    }
    else {
        await utils_1.createFile(`tests/${modelName}.rest`, restFile);
    }
};
exports.generateRestTest = generateRestTest;
