import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { UserSingIn } from "../api/index.js";
import { loginSuccess } from "../redux/reducer/userSlice.js";
import { openSnakebar } from "../redux/reducer/snackbar.js"
import Swal from 'sweetalert2';


const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;
const TextButton = styled.div`
  width: 100%;
  text-align: end;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  font-weight: 500;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  font-weight: 500;
  margin-top: -10px;
`;

const SignIn = ({ setOpenAuth }) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  // console.log("email:", email)
  // console.log("password:", password)

  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handelSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);
    setError(""); 
    if (validateInputs()) {
      await UserSingIn({ email, password })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          Swal.fire({
            title: 'Login Successful!',
            text: 'You have logged in successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          
          dispatch(
            openSnakebar({
              message: "Login Successful",
              severity: "success",
            })
          );
          setLoading(false);
          setButtonDisabled(false);
          setOpenAuth(false);
        })
        .catch((err) => {
          setLoading(false);
          setButtonDisabled(false);
          const errorMessage = err.response?.data?.message || "Login info incorrect";
        setError(errorMessage); 
          dispatch(
            openSnakebar({
              message: err.message,
              severity: "error",
            })
          );
        });
    }
  };

  return (
    <Container>
      <div>
        <Title>Welcome to Foodlie 👋</Title>
        <Span>Please login with your details here</Span>
      </div>
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        />
        {error && <ErrorText>{error}</ErrorText>} {/* Display error message */}

        <TextButton>Forgot Password?</TextButton>
        <Button
          text="Sign In"
          onClick={handelSignIn}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

export default SignIn;