const {generateInit} = require("./generateInit")

const fs = require("fs");

jest.mock("fs");

describe("Checks if init function generates the nextGenConfig.json file", () => {

    beforeAll(() => {
        fs.writeFileSync.mockClear();
        generateInit()
    })

    test("should return a correctly formatted nextGenConfig.json", () => {
        expect(fs.writeFileSync).toHaveBeenLastCalledWith(`nextGenConfig.json`,`
{
    "database": "mongodb",
    "pageType": "none",
    "projectRootPath":""
}`)
    });
    
})