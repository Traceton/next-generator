const { generateEmptyApiRoutes } = require("../generateEmptyApiRoutes");

const fs = require("fs");

jest.mock("fs");

describe(`Test generating all api routes for a model with valid input`, () => {
  beforeAll(() => {
    fs.mkdirSync.mockClear();
    fs.writeFileSync.mockClear();
    generateEmptyApiRoutes(["generate", "e-r", "car"]);
  });

  it(`"fs.mkdirSync" should be called with "pages,pages/api,pages/api/cars" `, () => {
    expect(fs.mkdirSync).toHaveBeenNthCalledWith(
      1,
      `pages`,
      { recursive: true },
      expect.any(Function)
    );

    expect(fs.mkdirSync).toHaveBeenNthCalledWith(
      2,
      `pages/api`,
      { recursive: true },
      expect.any(Function)
    );

    expect(fs.mkdirSync).toHaveBeenNthCalledWith(
      3,
      `pages/api/cars`,
      { recursive: true },
      expect.any(Function)
    );
  });

  it(` "fs.mkdirSync" to be called 3 times`, () => {
    expect(fs.mkdirSync).toHaveBeenCalledTimes(3);
  });

  it(`"fs.mkdirSync" should return with undefined`, () => {
    expect(fs.mkdirSync).toHaveLastReturnedWith(undefined);
  });

  it(`"fs.writeFileSync" should be called with "pages/api/cars/index.js,pages/api/cars/[carId].js" `, () => {
    expect(fs.writeFileSync).toHaveBeenNthCalledWith(
      1,
      `pages/api/cars/index.js`,
      expect.any(String),
      { recursive: true },
      expect.any(Function)
    );

    expect(fs.writeFileSync).toHaveBeenNthCalledWith(
      2,
      `pages/api/cars/[carId].js`,
      expect.any(String),
      { recursive: true },
      expect.any(Function)
    );
  });

  it(` "fs.writeFileSync" to be called 1 times`, () => {
    expect(fs.writeFileSync).toHaveBeenCalledTimes(2);
  });

  it(`"fs.writeFileSync" should return with undefined`, () => {
    expect(fs.writeFileSync).toHaveLastReturnedWith(undefined);
  });
});

describe(`Test generating all api routes for a model with incorrect input`, () => {
  beforeAll(() => {
    fs.mkdirSync.mockClear();
    fs.writeFileSync.mockClear();
    generateEmptyApiRoutes(["generate", "sr", undefined]);
  });

  it(` "fs.mkdirSync" to be called 0 times`, () => {
    expect(fs.mkdirSync).toHaveBeenCalledTimes(0);
  });

  it(` "fs.writeFileSync" to be called 0 times`, () => {
    expect(fs.writeFileSync).toHaveBeenCalledTimes(0);
  });
});
