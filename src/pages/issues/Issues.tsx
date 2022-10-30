import { Issue } from "@/components/issues";
import { getIssueData } from "@/lib/api/api";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaRegDotCircle } from "react-icons/fa";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import Loading from "@/layouts/Loading";

export interface IssueType {
  number: number;
  title: string;
  created_at: string;
  user?: string;
  comments: number;
}

const Issues = () => {
  const [issues, setIssues] = useState<IssueType[]>([]);
  const [loading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    }
    return response;
  };

  useEffect(() => {
    getIssues();
  }, []);

  return (
    <Container>
      {loading && <Loading />}
      <IssueContainer>
        <IssueBox>
          <p>
            <MdCheckBoxOutlineBlank />
            <FaRegDotCircle />
            <span>{issues.length} Open</span>
          </p>
        </IssueBox>
        <IsssueLists>
          {issues.map(({ number, title, created_at, user, comments }) => {
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
        </IsssueLists>
      </IssueContainer>
    </Container>
  );
};

export default Issues;

const Container = styled.div``;
const IssueBox = styled.div`
  display: flex;

  padding: 16px;
  margin: -1px -1px 0;
  background-color: ${(props) => props.theme.color.white};
  border-color: ${(props) => props.theme.color.gray};
  border-style: solid;
  border-width: 1px;
  border-right-width: 1px;
  border-left-width: 1px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  p {
    display: flex;
    svg {
      color: ${(props) => props.theme.color.gray_dark};
      margin-right: 0.5rem;
    }
  }
`;
const IssueContainer = styled.div``;
const IsssueLists = styled.ul`
  border-color: ${(props) => props.theme.color.gray};
  border-style: solid;
  border-width: 1px;
  border-top: none;
  border-right-width: 1px;
  border-left-width: 1px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;
