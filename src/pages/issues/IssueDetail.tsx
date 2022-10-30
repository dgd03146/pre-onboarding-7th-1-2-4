import { Endpoints } from "@octokit/types";
import { getDetailData } from "@/lib/api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { parseMarkdown } from "@/utils/remark";
import useSanitizer from "@/lib/hooks/useSanitizer";
import styled from "styled-components";
import { FaRegDotCircle } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import Loading from "@/layouts/Loading";

export const IssueDetail = () => {
  const { issue_number } = useParams();
  const issueNumber = Number(issue_number);

  type ContentResponseType =
    Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"][0];

  const [loading, setIsLoading] = useState(true);
  const [issue, setIssue] = useState<ContentResponseType>();
  const [html, setHtml] = useState("");
  const { markdown } = useSanitizer(html);

  const getIssueDetail = async () => {
    const data = await getDetailData(issueNumber);
    if (data) {
      setIssue(data);
      setHtml(parseMarkdown(data.body as string));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getIssueDetail();
  }, []);

  return (
    <>
      <Container>
        {loading && <Loading />}
        {issue && (
          <IssueBox>
            <MdCheckBoxOutlineBlank />
            <FaRegDotCircle className="dot" />
            <IssueInfo>
              <div>
                <p>{issue?.title}</p>
              </div>
              <div className="issue_number">
                <p>#{issue?.number}</p>
                <p>{issue?.created_at}</p>
              </div>
            </IssueInfo>
          </IssueBox>
        )}
        <CommentsBox>
          <p>{issue?.user?.login}</p>
          <div>
            <FaRegCommentAlt />
            <p>{issue?.comments}</p>
          </div>
        </CommentsBox>
      </Container>
      <Markdown dangerouslySetInnerHTML={{ __html: markdown }}></Markdown>
    </>
  );
};

const Container = styled.li`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${(props) => props.theme.color.white};
  border-color: ${(props) => props.theme.color.gray};
  border: 1px solid ${(props) => props.theme.color.gray};
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

const Markdown = styled.div`
  padding: 1rem;
`;
