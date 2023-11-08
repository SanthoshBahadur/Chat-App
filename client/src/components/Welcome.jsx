import React from "react";
import styled from "styled-components";
export default function Welcome({ currentUser }) {
  return (
    <Container>
      <h1>
        Hello <span>{currentUser.username}!</span>
      </h1>
      <h2>Feel free to connect with your friends.</h2>
    </Container>
  );
  //   fetch the name of the current user
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  span {
    color: #4e00ff;
  }
`;
