import readline from "readline"
import { generatorController } from "./commands/generate/generatorController"
import { help } from "./commands/help/help"
import { readNextConfig } from "./utils"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// The starting point of the command line interface of next-generator
// takes a users input and routes it properly based on the input.

const recursiveReadline = () => {

  // Checks next config for issues and alerts user accordingly
  readNextConfig()

  rl.question("next-generator command: ", function (answer: string) {
    let userInput = answer.trim().split(" ");
    switch (userInput[0]) {
      case "exit":
      case "e":
        rl.close();
        break;
      case "help":
      case "h":
        help();
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
