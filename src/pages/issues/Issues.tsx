import { Issue } from "@/components/issues";
import { getIssueData } from "@/lib/api/api";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export interface IssueType {
  number: number;
  title: string;
  created_at: string;
  user?: string;
  comments: number;
}

const Issues = () => {
  const [issues, setIssues] = useState<IssueType[]>([]);

  // FIXME: 훅으로 바꾸자!
  const getIssues = async () => {
    const response = await getIssueData();

    const issue = response?.map(
      ({ number, title, created_at, user, comments }) => {
        const newData: IssueType = {
          number,
          title,
          created_at,
          user: user?.login,
          comments
        };
        return newData;
      }
    );
    if (issue) {
      setIssues(issue);
    }
  };

  useEffect(() => {
    getIssues();
  }, []);

  console.log(issues, "issue");
  return (
    <Container>
      <IssueLists>
        {issues?.map(({ number, title, created_at, user, comments }) => {
          return (
            <Issue
              key={number}
              number={number}
              title={title}
              created_at={created_at}
              user={user}
              comments={comments}
            />
          );
        })}
      </IssueLists>
    </Container>
  );
};

export default Issues;

const Container = styled.div``;

const IssueLists = styled.ul``;
