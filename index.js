const readline = require("readline");

const {
  generatorController,
} = require("./commands/generate/generatorController");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// rl.question(`Next-generator command: \n`, (answer) => {
//   let userInput = answer.trim().split(" ");
//   if (userInput[0] === "generate" || userInput[0] === "g") {
//     generatorController(userInput);
//   }

//   rl.close();
// });

const recursiveReadline = () => {
  rl.question("next-generator command: ", function (answer) {
    let userInput = answer.trim().split(" ");
    console.log(userInput[0]);
    switch (userInput[0]) {
      case "exit":
        rl.close();
        break;
      case "generate":
        generatorController(userInput);
        break;
      case "g":
        generatorController(userInput);
        break;
    }
    recursiveReadline();
  });
};

recursiveReadline();
