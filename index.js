const jobsService = require("./jobs-service");

const GITHUB_REMOTE_URL =
  "https://jobs.github.com/positions.json?description=remote";

const getAllJobs = async () => {
  const jobsTemp = await jobsService.getJobsFromRemoteSource(GITHUB_REMOTE_URL);

  const jobToInsert = jobsTemp.data.map((job) => {
    return {
      source: "github",
      sourceID: job.id,
      type: job.type,
      sourceUrl: job.url,
      creationDate: job.created_at,
      company: job.company,
      companyUrl: job.company_url ? job.company_url : "",
      companyLogoUrl: job.company_logo,
      title: job.title,
      description: job.description,
      tags: "",
      category: "",
      applyUrl: job.how_to_apply,
    };
  });

  jobsService.addJobs(jobToInsert);
};

getAllJobs();
