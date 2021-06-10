const { createDirectory, createFile } = require("./utils");

test("should return file created", async () => {
  let testTextFile = `dummy text from testing`;

  let fileCreated = await createFile(
    `randomFileNameForJestTest.txt`,
    testTextFile
  );
  expect(fileCreated).toBe(`file created`);
});

test("should return no filePath and no fileContent recieved ", async () => {
  expect(await createFile()).toBe(`no filePath and no fileContent recieved`);
});

test("should return no filePath OR no fileContent recieved", async () => {
  expect(await createFile(`randomDirectoryName/`)).toBe(
    `no filePath OR no fileContent recieved`
  );
});
