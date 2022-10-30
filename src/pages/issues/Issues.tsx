import { Issue } from "@/components/issues";
import { getIssueData } from "@/lib/api/api";
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { FaRegDotCircle } from "react-icons/fa";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import Loading from "@/layouts/Loading";
import { useContext } from "react";
import { IssueContext, IssueData } from "@/lib/states/ContextProvider";

const Issues = () => {
  const { issues, setIssues } = useContext(IssueContext);

  const [loading, setIsLoading] = useState(true);

  const target = useRef<HTMLDivElement>(null);
  const page = useRef<number>(1);

  // FIXME: 훅으로 바꾸자!
  const getIssues = async (page: number) => {
    const response = await getIssueData(page);

    const issue = response?.map(
      ({ number, title, created_at, user, comments }) => {
        const newData: IssueData = {
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
      setIssues((prev) => [...prev, ...issue]);
      setIsLoading(false);
    }
    return response;
  };

  useEffect(() => {
    getIssues(page.current);
  }, []);

  //FIXME: 훅으로 바꾸기
  useEffect(() => {
    if (!loading) {
      //로딩되었을 때만 실행
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          page.current += 1;

          getIssues(page.current);
          // 데이터 더 불러오면서 페이지 증가시키기
          //밑에 도달했을 때 pageNumber를 1씩 증가시켜 데이터를 10개씩 더 보여줌.
        }
      });
      //옵져버 탐색 시작
      observer.observe(target.current as HTMLElement);
    }
  }, [loading]);

  return (
    <Container>
      {loading && <Loading />}
      <IssueContainer>
        {
          <IssueBox>
            <p>
              <MdCheckBoxOutlineBlank />
              <FaRegDotCircle />
              <span>{issues.length} Open</span>
            </p>
          </IssueBox>
        }
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
      <div ref={target} />
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
