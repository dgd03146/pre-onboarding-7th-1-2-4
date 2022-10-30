import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

const Loading = () => {
  return (
    <Container>
      <ClipLoader color="green" size={100} speedMultiplier={1} />;
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 5rem;
  }
`;

export default Loading;
