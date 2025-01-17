import React, { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import styled from 'styled-components';
import Logoimg from '../utils/Images/Logoimg.png'
import Authimage1 from '../utils/Images/Authimage1.jpg'
import { Close } from "@mui/icons-material";
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp.jsx';

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  background: ${({ theme }) => theme.bg};
`;



const Logo = styled.img`
 position: absolute;
  top: 40px;
  left: 60px;
  z-index: 10;
`;
const Image = styled.img`
 position: relative;
  height: 100%;
  width: 100%;
  object-fit: cover;

`;

const Left = styled.div`
  flex: 1;
  position: relative;
  
`;

const Right = styled.div`
  position: relative;
  flex: 0.9;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 16px;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    flex: 1;
  }

`;

const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 50%;
  padding: 2px;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${({ theme }) => theme.primary + 20};
  }
`;
const Text = styled.p`
display: flex;
  gap: 12px;
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 16px;
  @media (max-width: 400px) {
    font-size: 14px;
  }

`;
const TextButton = styled.div`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
`;
 

const Authentication = ({ openAuth, setOpenAuth }) => {
  useEffect(() => {
    console.log("openAuth:", openAuth);
  }, [openAuth]);

  const [login, setLogin] = useState(true);

  return (
    <Modal open={openAuth} onClose={() => setOpenAuth(false)}>
      <Container>
        <Left>
          <Logo src={Logoimg} />
          <Image src={Authimage1} />
        </Left>
        <Right>
          <CloseButton onClick={() => setOpenAuth(false)}>
            <Close />
          </CloseButton>
          {login ? (
            <>
              <SignIn setOpenAuth={setOpenAuth} />
              <Text>
                Don't have an account?{" "}
                <TextButton onClick={() => setLogin(false)}>Sign Up</TextButton>
              </Text>
            </>
          ) : (
            <>
              <SignUp openAuth={openAuth} setOpenAuth={setOpenAuth} />
              <Text>
                Already have an account?{" "}
                <TextButton onClick={() => setLogin(true)}>Sign In</TextButton>
              </Text>
            </>
          )}
        </Right>
      </Container>
    </Modal>
  );
};


export default Authentication;
