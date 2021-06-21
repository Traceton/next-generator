const { generateModel } = require("../generateModel");

const fs = require("fs");

jest.mock("fs");

describe(`Test generating mongoose api model with valid input`, () => {
  beforeAll(() => {
    fs.mkdirSync.mockClear();
    fs.writeFileSync.mockClear();
    generateModel(["generate", "model", "car", "make:String", "model:String"]);
  });

  it(`"fs.mkdirSync" should be called with "components,components/models" `, () => {
    expect(fs.mkdirSync).toHaveBeenNthCalledWith(
      1,
      `components`,
      { recursive: true },
      expect.any(Function)
    );

    expect(fs.mkdirSync).toHaveBeenNthCalledWith(
      2,
      `components/models`,
      { recursive: true },
      expect.any(Function)
    );
  });

  it(` "fs.mkdirSync" to be called 2 times`, () => {
    expect(fs.mkdirSync).toHaveBeenCalledTimes(2);
  });

  it(`"fs.mkdirSync" should return with undefined`, () => {
    expect(fs.mkdirSync).toHaveLastReturnedWith(undefined);
  });

  it(`"fs.writeFileSync" should be called with "components/models/Car.js" `, () => {
    expect(fs.writeFileSync).toHaveBeenNthCalledWith(
      1,
      `components/models/Car.js`,
      expect.any(String),
      { recursive: true },
      expect.any(Function)
    );
  });

  it(` "fs.writeFileSync" to be called 1 times`, () => {
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  });

  it(`"fs.writeFileSync" should return with undefined`, () => {
    expect(fs.writeFileSync).toHaveLastReturnedWith(undefined);
  });
});

describe(`Test generating mongoose api model with incorrect input`, () => {
  beforeAll(() => {
    fs.mkdirSync.mockClear();
    fs.writeFileSync.mockClear();
    generateModel(["generate", "model", undefined]);
  });

  it(` "fs.mkdirSync" to be called 0 times`, () => {
    expect(fs.mkdirSync).toHaveBeenCalledTimes(0);
  });

  it(` "fs.writeFileSync" to be called 0 times`, () => {
    expect(fs.writeFileSync).toHaveBeenCalledTimes(0);
  });
});
