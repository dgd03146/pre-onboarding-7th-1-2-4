import { Octokit } from "octokit";
import { RequestError } from "@octokit/types";

const octokit = new Octokit({
  auth: process.env.REACT_APP_TOKEN
});

function isOctokitError(e: unknown): e is RequestError {
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
}

export const getIssues = async () => {
  try {
    const result = await octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner: "angular",
      repo: "angular-cli",
      per_page: 20,
      sort: "comments",
      direction: "desc"
    });
    return result.data;
  } catch (error) {
    if (isOctokitError(error)) {
      console.log(`Error! Status: ${error.status}. Message: ${error.errors}`);
    }
  }
};
