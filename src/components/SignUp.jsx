import React from 'react'
import styled from "styled-components"
import Button from "./Button"
import TextInput from './TextInput';
import { useDispatch } from "react-redux";
import { useState } from 'react';
import {UserSignUp} from "../api"
import { loginSuccess } from "../redux/reducer/userSlice.js";
import { openSnakebar } from "../redux/reducer/snackbar.js"

const Container = styled.div`
 width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
const Span = styled.div`
 font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.primary};
`;



const SignUp = ({ openAuth, setOpenAuth }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const validateInputs = () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setButtonDisabled(true);

    try {
      const res = await UserSignUp({ name, email, password });
      dispatch(loginSuccess(res.data));
      dispatch(
        openSnakebar({
          message: "Sign Up Successful",
          severity: "success",
        })
      );
      setOpenAuth(false);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An error occurred during signup.";
      alert(errorMessage);
      dispatch(
        openSnakebar({
          message: errorMessage,
          severity: "error",
        })
      );
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Create new account</Title>
        <Span>Please enter your details here</Span>
      </div>
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          handelChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        />
        <Button
          text="Sign Up"
          onClick={handleSignUp}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

export default SignUp;

