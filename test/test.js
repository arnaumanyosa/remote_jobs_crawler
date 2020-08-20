// Import the dependencies for testing
var assert = require("assert");

const { getJobsFromRemoteSource } = require("../jobs-service");

describe("Job Service", () => {
  describe("getJobsFromRemoteSource", () => {
    it("should return ERR_INVALID_ARG_TYPE if url param is not provided", async () => {
      const res = await getJobsFromRemoteSource();
      assert.equal(res.code, "ERR_INVALID_ARG_TYPE");
    });

    it("should return an object", async () => {
      const GITHUB_REMOTE_URL = "https://jobs.github.com/positions.json";
      const res = await getJobsFromRemoteSource(GITHUB_REMOTE_URL);
      assert.equal(typeof res, "object");
    });
  });
});
