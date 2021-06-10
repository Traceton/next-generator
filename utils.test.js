const { createDirectory, createFile } = require("./utils");

test("should return file created", async () => {
  let fileCreated = await createFile(
    `randomFilePathName/randomFileName`,
    "dummy text from testing"
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
