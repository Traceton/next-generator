const { generateApiRoute } = require("../generateApiRoute");

test("should return file created", async () => {
  expect(await generateApiRoute(["g", "api-route", "testRouteName"])).toBe(
    `file created`
  );
});

test("should return no routeName recieved", async () => {
  expect(await generateApiRoute(["g", "api-route"])).toBe(
    `no routeName recieved`
  );
});
