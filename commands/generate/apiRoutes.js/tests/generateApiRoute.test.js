const generateApiRoute = require("../generateApiRoute");

test("should return yes", () => {
  expect(generateApiRoute(["g", "api-route", "testRouteName"])).toBe("yes");
});
