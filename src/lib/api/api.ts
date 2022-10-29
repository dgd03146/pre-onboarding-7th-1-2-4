import { Octokit } from "octokit";
import { RequestError } from "@octokit/types";

const octokit = new Octokit({
  auth: process.env.REACT_APP_TOKEN
});

const isOctokitError = (e: unknown): e is RequestError => {
  if (
    e &&
    typeof e === "object" &&
    "status" in e &&
    "documentation_url" in e &&
    "name" in e
  ) {
    return true;
  }
  return false;
};

export const getIssueData = async () => {
  try {
    const { data } = await octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner: "angular",
      repo: "angular-cli",
      per_page: 20,
      sort: "comments",
      direction: "desc"
    });
    const opendIssues = data.filter((it) => it.state === "open");

    return opendIssues;
  } catch (error) {
    if (isOctokitError(error)) {
      console.log(`Error! Status: ${error.status}. Message: ${error.errors}`);
    }
  }
};
