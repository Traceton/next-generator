const { generateHelp } = require("./generateHelp");

test("Checks if help command returns the help file", () => {
  const help = jest.fn(generateHelp);

  help();

  expect(help).toHaveReturned();
});
