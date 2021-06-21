const { generatePages } = require("../generatePages");

const fs = require("fs");

jest.mock("fs");

describe(`Test generating all page routes for a model with valid input`, () => {
  beforeAll(() => {
    fs.mkdirSync.mockClear();
    fs.writeFileSync.mockClear();
    generatePages(["generate", "p", "car"]);
  });

  it(`"fs.mkdirSync" should be called with "pages,pages/cars" `, () => {
    expect(fs.mkdirSync).toHaveBeenNthCalledWith(
      1,
      `pages`,
      { recursive: true },
      expect.any(Function)
    );

    expect(fs.mkdirSync).toHaveBeenNthCalledWith(
      2,
      `pages/cars`,
      { recursive: true },
      expect.any(Function)
    );
  });

  it(` "fs.mkdirSync" to be called 2 times`, () => {
    expect(fs.mkdirSync).toHaveBeenCalledTimes(2);
  });

  it(`"fs.writeFileSync" should be called with ".env.local,pages/cars/index.js,pages/cars/[carId].js" `, () => {
    expect(fs.writeFileSync).toHaveBeenNthCalledWith(
      1,
      `.env.local`,
      expect.any(String),
      { recursive: true },
      expect.any(Function)
    );

    expect(fs.writeFileSync).toHaveBeenNthCalledWith(
      2,
      `pages/cars/index.js`,
      expect.any(String),
      { recursive: true },
      expect.any(Function)
    );

    expect(fs.writeFileSync).toHaveBeenNthCalledWith(
      3,
      `pages/cars/[carId].js`,
      expect.any(String),
      { recursive: true },
      expect.any(Function)
    );
  });

  it(` "fs.writeFileSync" to be called 3 times`, () => {
    expect(fs.writeFileSync).toHaveBeenCalledTimes(3);
  });
});

describe(`Test generating all page routes for a model with incorrect input`, () => {
  beforeAll(() => {
    fs.mkdirSync.mockClear();
    fs.writeFileSync.mockClear();
    generatePages(["generate", "p", undefined]);
  });

  it(` "fs.mkdirSync" to be called 0 times`, () => {
    expect(fs.mkdirSync).toHaveBeenCalledTimes(0);
  });

  it(` "fs.writeFileSync" to be called 0 times`, () => {
    expect(fs.writeFileSync).toHaveBeenCalledTimes(0);
  });
});
