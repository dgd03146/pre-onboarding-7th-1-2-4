import React from "react";
import styled from "styled-components";
import { FaRegDotCircle } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IssueType } from "@/pages/issues/Issues";
import { useNavigate } from "react-router-dom";

const Issue = ({ number, title, created_at, user, comments }: IssueType) => {
  const navigate = useNavigate();
  return (
    <Container
      onClick={() => {
        navigate(`/${number}`);
      }}
    >
      <IssueBox>
        <MdCheckBoxOutlineBlank />
        <FaRegDotCircle className="dot" />
        <IssueInfo>
          <div>
            <p>{title}</p>
          </div>
          <div className="issue_number">
            <p>#{number}</p>
            <p>{created_at}</p>
          </div>
        </IssueInfo>
      </IssueBox>
      <CommentsBox>
        <p>{user}</p>
        <div>
          <FaRegCommentAlt />
          <p>{comments}</p>
        </div>
      </CommentsBox>
    </Container>
  );
};

export default Issue;

const Container = styled.li`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: white;
  border-color: ${(props) => props.theme.color.gray};
  border-bottom: 1px solid ${(props) => props.theme.color.gray};

  &:hover {
    background-color: ${(props) => props.theme.color.white};
  }

  cursor: pointer;
`;

const IssueBox = styled.div`
  display: flex;
  div {
    display: flex;
  }
  svg {
    margin-right: 0.5rem;
  }
  .dot {
    color: green;
  }
`;

const IssueInfo = styled.div`
  flex-direction: column;
  .issue_number {
    margin-top: 1rem;
    p {
      margin-right: 0.5rem;
      color: gray;
    }
  }
`;

const CommentsBox = styled.div`
  display: flex;

  div {
    margin-left: 1rem;
    display: flex;
    color: gray;
    p {
      margin-left: 0.1rem;
    }
  }
`;
