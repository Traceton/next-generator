const { generateApiRoutes } = require("../generateApiRoutes");

const fs = require("fs");

jest.mock("fs");

describe(`Test generating all api routes for a model with valid input`, () => {
  beforeAll(() => {
    fs.mkdirSync.mockClear();
    fs.writeFileSync.mockClear();
    generateApiRoutes(["generate", "sr", "car"]);
  });

  it(` "fs.mkdirSync" to be called 3 times`, () => {
    expect(fs.mkdirSync).toHaveBeenCalledTimes(4);
  });

  it(` "fs.writeFileSync" to be called 3 times`, () => {
    expect(fs.writeFileSync).toHaveBeenCalledTimes(4);
  });
});

describe(`Test generating all api routes for a model with incorrect input`, () => {
  beforeAll(() => {
    fs.mkdirSync.mockClear();
    fs.writeFileSync.mockClear();
    generateApiRoutes(["generate", "sr", undefined]);
  });

  it(` "fs.mkdirSync" to be called 0 times`, () => {
    expect(fs.mkdirSync).toHaveBeenCalledTimes(0);
  });

  it(` "fs.writeFileSync" to be called 0 times`, () => {
    expect(fs.writeFileSync).toHaveBeenCalledTimes(0);
  });
});
