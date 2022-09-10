// Test functionality of createDirectory and createFile.
const {
  createDirectory,
  createFile,
  getIdType,
  readNextConfig,
} = require("./utils");
const fs = require("fs");

jest.mock(`fs`);

// START createDirectory TESTS
// test correct input
describe("test if `fs` is called correctly in createDirectory", () => {
  beforeAll(() => {
    fs.mkdirSync.mockClear();
    createDirectory("testDirectory");
  });

  it(`"fs.mkdirSync" should be called with
   "testDirectory",
  { recursive: true },
  expect.any(Function)" `, () => {
    expect(fs.mkdirSync).toHaveBeenLastCalledWith("testDirectory", {
      recursive: true,
    });
  });

  it(`"fs.mkdirSync" should be called one time`, () => {
    expect(fs.mkdirSync).toHaveBeenCalledTimes(1);
  });

  it(`"fs.mkdirSync" should return with undefined`, () => {
    expect(fs.mkdirSync).toHaveLastReturnedWith(undefined);
  });
});

// // test undefined input
test("should return no directoryPath recieved", () => {
  expect(createDirectory(undefined)).toBe(`no directoryPath recieved`);
});

// test null input
test("should return no directoryPath recieved", () => {
  expect(createDirectory(null)).toBe(`no directoryPath recieved`);
});

test("should return no directoryPath recieved", () => {
  expect(createDirectory()).toBe(`no directoryPath recieved`);
});

// END createDirectory TESTS

// START createFile TESTS

// test correct input
describe("Test if `fs` is called correctly in createFile", () => {
  beforeAll(() => {
    fs.writeFileSync.mockClear();
    // fs.writeFile.mockReturnValue("file created");
    createFile("testRoute.wozers", "// test content");
  });

  it(`"fs.writeFileSync" should be called with "" `, () => {
    expect(fs.writeFileSync).toHaveBeenLastCalledWith(
      "testRoute.wozers",
      "// test content"
    );
  });

  it(`"fs.writeFileSync" should be called one time`, () => {
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  });

  it(`"fs.writeFileSync" should return with undefined`, () => {
    expect(fs.writeFileSync).toHaveLastReturnedWith(undefined);
  });
});

// // Test undefined input
test("should return no filePath and no fileContent recieved ", () => {
  expect(createFile(undefined)).toBe(`no filePath and no fileContent recieved`);
});

// // Test null input
test("should return no filePath and no fileContent recieved ", () => {
  expect(createFile(null)).toBe(`no filePath and no fileContent recieved`);
});

test("should return no filePath and no fileContent recieved ", () => {
  expect(createFile()).toBe(`no filePath and no fileContent recieved`);
});

// END createFile TESTS

// START getIdType TESTS

// getIdType tests
describe("Test if the id time is returned correctly", () => {
  expect(getIdType()).toBe("_id");
});

// END getIdType TESTS

// START readNextConfig TESTS

describe("Should return the contents of nextGenConfig.json", () => {
  const readConfig = jest.fn(readNextConfig);
  readConfig();
  expect(readConfig).toHaveReturnedWith({
    database: "mongodb",
    pageType: "none",
    projectRootPath: "",
  });
});

// END readNextConfig TESTS
