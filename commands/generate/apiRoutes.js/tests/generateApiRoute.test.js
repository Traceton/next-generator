const { generateApiRoute } = require("../generateApiRoute");

const fs = require("fs");

jest.mock(`fs`);

describe(`Test generate a single api route with valid input`, () => {
  beforeAll(() => {
    fs.mkdirSync.mockClear();
    fs.writeFileSync.mockClear();
    generateApiRoute(["generate", "sr", "testPage"]);
  });
  it(`"fs.mkdirSync" should be called 2 times`, () => {
    expect(fs.mkdirSync).toHaveBeenCalledTimes(2);
  });

  it(`"fs.writeFileSync" should be called 1 time`, () => {
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  });
});

describe(`Test generate a single api route with incorrect input`, () => {
  beforeAll(() => {
    fs.mkdirSync.mockClear();
    fs.writeFileSync.mockClear();
    generateApiRoute(["generate", "sr", ""]);
    generateApiRoute(["generate", "sr", undefined]);
    generateApiRoute(["generate", "sr", null]);
  });
  it(`"fs.mkdirSync" should be called 2 times`, () => {
    expect(fs.mkdirSync).toHaveBeenCalledTimes(0);
  });

  it(`"fs.writeFileSync" should be called 1 time`, () => {
    expect(fs.writeFileSync).toHaveBeenCalledTimes(0);
  });
});
