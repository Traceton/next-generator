#! /usr/bin/env node

let readline = require('readline');
let { generatorController } = require('../commands/generate/generatorController');
let { generateInit } = require('../commands/init/generateInit')
let { generateHelp } = require('../commands/help/generateHelp');
let { readNextConfig } = require('../utils');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// The starting point of the command line interface of next-generator
// takes a users input and routes it properly based on the input.

const recursiveReadline = () => {

  // Checks next config for issues and alerts user accordingly
  readNextConfig()

  rl.question("next-generator command: ", function (answer) {
    let userInput = answer.trim().split(" ");

    switch (userInput[0]) {
      case "init":
        generateInit();
        break;
      case "exit":
      case "e":
        console.log("use: ctrl c")
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
    recursiveReadline();
  });
};

recursiveReadline();
