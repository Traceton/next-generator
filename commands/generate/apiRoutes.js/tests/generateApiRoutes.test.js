const { generateApiRoutes } = require("../generateApiRoutes");

const fs = require("fs");

jest.mock("fs");

describe(`Test generating all api routes for a model with valid input`, () => {
  beforeAll(() => {
    fs.mkdirSync.mockClear();
    fs.writeFileSync.mockClear();
    generateApiRoutes(["generate", "sr", "car"]);
  });

  it(`"fs.mkdirSync" should be called with "pages,pages/api,pages/api/cars,utils" `, () => {
    expect(fs.mkdirSync).toHaveBeenNthCalledWith(1, `pages`, {
      recursive: true,
    });

    expect(fs.mkdirSync).toHaveBeenNthCalledWith(2, `pages/api`, {
      recursive: true,
    });

    expect(fs.mkdirSync).toHaveBeenNthCalledWith(3, `pages/api/cars`, {
      recursive: true,
    });

    expect(fs.mkdirSync).toHaveBeenNthCalledWith(4, `utils`, {
      recursive: true,
    });
  });

  it(` "fs.mkdirSync" to be called 3 times`, () => {
    expect(fs.mkdirSync).toHaveBeenCalledTimes(4);
  });

  it(`"fs.mkdirSync" should return with undefined`, () => {
    expect(fs.mkdirSync).toHaveLastReturnedWith(undefined);
  });

  it(`"fs.writeFileSync" should be called with "pages,pages/api,pages/api/cars,utils" `, () => {
    expect(fs.writeFileSync).toHaveBeenNthCalledWith(
      1,
      `utils/dbConnect.js`,
      expect.any(String)
    );

    expect(fs.writeFileSync).toHaveBeenNthCalledWith(
      2,
      `.env.local`,
      expect.any(String)
    );

    expect(fs.writeFileSync).toHaveBeenNthCalledWith(
      3,
      `pages/api/cars/index.js`,
      expect.any(String)
    );

    expect(fs.writeFileSync).toHaveBeenNthCalledWith(
      4,
      `pages/api/cars/[carId].js`,
      expect.any(String)
    );
  });

  it(` "fs.writeFileSync" to be called 3 times`, () => {
    expect(fs.writeFileSync).toHaveBeenCalledTimes(4);
  });

  it(`"fs.writeFileSync" should return with undefined`, () => {
    expect(fs.writeFileSync).toHaveLastReturnedWith(undefined);
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
