import React from "react";
import styled from "styled-components";

interface IssueProps {
  number: number;
  title: string;
  created_at: string;
  user?: string;
  comments: number;
}

const Issue = ({ number, title, created_at, user, comments }: IssueProps) => {
  return (
    <Container>
      <p>{title}</p>
      <p>{number}</p>
      <p>{created_at}</p>
      <p>{user}</p>
      <p>{comments}</p>
    </Container>
  );
};

export default Issue;

const Container = styled.li``;
