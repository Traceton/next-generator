import readline from "readline"
import { generatorController } from "./commands/generate/generatorController"
import { help } from "./commands/help/help"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const recursiveReadline = () => {
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
