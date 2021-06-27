const readline = require("readline");

const {
  generatorController,
} = require("./commands/generate/generatorController");
const { help } = require("./commands/help/help");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const recursiveReadline = () => {
  rl.question("next-generator command: ", function (answer: string) {
    let userInput = answer.trim().split(" ");
    console.log(userInput[0]);
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
