// Test functionality of createDirectory and createFile.
const { createDirectory, createFile, getIdType } = require("./utils");
const fs = require("fs");

jest.mock(`fs`);

// CREATE FILE TESTS
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
  expect(createFile(undefined)).toBe(
    `no filePath and no fileContent recieved`
  );
});

// // Test null input
test("should return no filePath and no fileContent recieved ", () => {
  expect(createFile(null)).toBe(
    `no filePath and no fileContent recieved`
  );
});

test("should return no filePath and no fileContent recieved ", () => {
  expect(createFile()).toBe(`no filePath and no fileContent recieved`);
});

// // CREATE DIRECTORY TESTS
// // test correct input
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


// getIdType tests
// describe("Test if the id time is returned correctly", () => {
//   expect( getIdType()).toBe("id")
//   jest.mock('./nextGenConfig')
//   expect( getIdType()).toBe("_id")
// })
