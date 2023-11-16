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
  h1 {
    text-align: center;
  }
  @media screen and (max-width: 420px) {
    padding: 2rem;
    h1 {
      text-align: center;
    }
    h2 {
      text-align: center;
    }
  }
  span {
    color: #4e00ff;
  }
`;
