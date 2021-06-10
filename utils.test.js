// Test functionality of createDirectory and createFile.
const { createDirectory, createFile } = require("./utils");

// test correct input
test("should return file created", async () => {
  expect(await createFile("", "// testContent")).toBe(`file created`);
});

// test incorrect input
test("should return filePath does not exist", async () => {
  expect(await createFile("nonExistingFilePath.txt", "// testContent")).toBe(
    `filePath does not exist`
  );
});

// Test undefined input
test("should return no filePath and no fileContent recieved ", async () => {
  expect(await createFile(undefined)).toBe(
    `no filePath and no fileContent recieved`
  );
});

// Test null input
test("should return no filePath and no fileContent recieved ", async () => {
  expect(await createFile(null)).toBe(
    `no filePath and no fileContent recieved`
  );
});

test("should return no filePath and no fileContent recieved ", async () => {
  expect(await createFile()).toBe(`no filePath and no fileContent recieved`);
});
