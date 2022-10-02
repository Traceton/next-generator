#! /usr/bin/env node

let {
  generatorController,
} = require("../commands/generate/generatorController");
let { generateInit } = require("../commands/init/generateInit");
let { generateHelp } = require("../commands/help/generateHelp");

const readUserInput = () => {
  let OriginalCliInput = process.argv;
  let userInput = OriginalCliInput.slice(2);
  if (!userInput) {
    console.log("no user input found");
  }

  return userInput;
};

// The starting point of the command line interface of next-generator
// takes a users input and routes it properly based on the input.
const nextGeneratorController = () => {
  let userInput = readUserInput();

  switch (userInput[0]) {
    case "init":
      generateInit();
      break;
    case "exit":
    case "e":
      console.log("use: ctrl c");
      break;
    case "help":
    case "h":
      generateHelp();
      break;
    case "generate":
    case "g":
      generatorController(userInput);
      break;
  }
};

nextGeneratorController();

// example fix for Kanban For Everyone
