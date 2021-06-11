// Test functionality of createDirectory and createFile.
const { createDirectory, createFile } = require("./utils");
const fs = require("fs");
const { existsSync } = require("fs");

// CREATE FILE TESTS
// test correct input
// test("should return file created", async () => {
//   if (existsSync(`testFileName.js`)) {
//     await fs.unlink("testFileName.js", (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   }

//   await expect(await createFile("testFileName.js", "// testContent")).toBe(
//     `file created`
//   );

//   if (existsSync(`testFileName.js`)) {
//     await fs.unlink("testFileName.js", (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   }
// });

// // test incorrect input
// test("should return filePath does not exist", async () => {
//   if (existsSync(`nonExistingFilePath.txt`)) {
//     await fs.unlink("nonExistingFilePath.txt", (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   }

//   await expect(
//     await createFile("nonExistingFilePath.txt", "// testContent")
//   ).toBe(`filePath does not exist`);

//   if (existsSync(`nonExistingFilePath.txt`)) {
//     await fs.unlink("nonExistingFilePath.txt", (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   }
// });

// // Test undefined input
// test("should return no filePath and no fileContent recieved ", async () => {
//   expect(await createFile(undefined)).toBe(
//     `no filePath and no fileContent recieved`
//   );
// });

// // Test null input
// test("should return no filePath and no fileContent recieved ", async () => {
//   expect(await createFile(null)).toBe(
//     `no filePath and no fileContent recieved`
//   );
// });

// test("should return no filePath and no fileContent recieved ", async () => {
//   expect(await createFile()).toBe(`no filePath and no fileContent recieved`);
// });

// // CREATE DIRECTORY TESTS
// // test correct input
// test("should return directory created", async () => {
//   if (existsSync(`directoryNameFromTest`)) {
//     await fs.rmdir("directoryNameFromTest", (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   }

//   await expect(await createDirectory("directoryNameFromTest")).toBe(
//     `directory created`
//   );

//   if (existsSync(`directoryNameFromTest`)) {
//     await fs.rmdir("directoryNameFromTest", (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   }
// });

// // test incorrect input

// test("should return incorrect directory name format", async () => {
//   if (existsSync(`testIncorrectDirectory.js`)) {
//     await fs.rmdir("testIncorrectDirectory.js", (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   }

//   expect(await createDirectory("testIncorrectDirectory.js")).toBe(
//     `incorrect directory name format`
//   );

//   if (existsSync(`testIncorrectDirectory.js`)) {
//     await fs.rmdir("testIncorrectDirectory.js", (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   }
// });

// // test undefined input
// test("should return no directoryPath recieved", async () => {
//   expect(await createDirectory(undefined)).toBe(`no directoryPath recieved`);
// });

// // test null input
// test("should return no directoryPath recieved", async () => {
//   expect(await createDirectory(null)).toBe(`no directoryPath recieved`);
// });

test("should return no directoryPath recieved", async () => {
  expect(await createDirectory()).toBe(`no directoryPath recieved`);
});
