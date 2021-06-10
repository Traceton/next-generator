const { generateApiRoute } = require("../generateApiRoute");

test("should return true", async () => {
  expect(await generateApiRoute(["g", "api-route", "testRouteName"])).toBe(
    true
  );
});
