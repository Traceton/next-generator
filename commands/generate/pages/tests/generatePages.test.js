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
    expect(fs.mkdirSync).toHaveBeenNthCalledWith(1, `pages`, {
      recursive: true,
    });

    expect(fs.mkdirSync).toHaveBeenNthCalledWith(2, `pages/cars`, {
      recursive: true,
    });

    expect(fs.mkdirSync).toHaveBeenNthCalledWith(3, `pages/cars/editCars`, {
      recursive: true,
    });
  });

  it(` "fs.mkdirSync" to be called 2 times`, () => {
    expect(fs.mkdirSync).toHaveBeenCalledTimes(3);
  });

  it(`"fs.writeFileSync" should be called with ".env.local,pages/cars/index.js,pages/cars/[carId].js" `, () => {
    expect(fs.writeFileSync).toHaveBeenNthCalledWith(
      1,
      `.env.local`,
      expect.any(String)
    );

    expect(fs.writeFileSync).toHaveBeenNthCalledWith(
      2,
      `pages/cars/index.js`,
      expect.any(String)
    );

    expect(fs.writeFileSync).toHaveBeenNthCalledWith(
      3,
      `pages/cars/[carId].js`,
      expect.any(String)
    );

    expect(fs.writeFileSync).toHaveBeenNthCalledWith(
      4,
      `pages/cars/createCar.js`,
      expect.any(String)
    );

    expect(fs.writeFileSync).toHaveBeenNthCalledWith(
      5,
      `pages/cars/editCars/[carId].js`,
      expect.any(String)
    );
  });

  it(` "fs.writeFileSync" to be called 5 times`, () => {
    expect(fs.writeFileSync).toHaveBeenCalledTimes(5);
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
