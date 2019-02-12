import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
    align-items: center;
    display: flex;
    height: 10vh;
    justify-content: center;
    margin-bottom: 1vh;
`;

const Heading = styled.h1`
  margin: 0;
`;

const Header = () => {
    return (
        <Container>
            <Heading>Chase</Heading>
        </Container>
    );
};

export default Header;
