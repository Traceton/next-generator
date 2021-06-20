const readline = require("readline");

const {
  generatorController,
} = require("./commands/generate/generatorController");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const recursiveReadline = () => {
  rl.question("next-generator command: ", function (answer) {
    let userInput = answer.trim().split(" ");
    console.log(userInput[0]);
    switch (userInput[0]) {
      case "exit":
        rl.close();
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
