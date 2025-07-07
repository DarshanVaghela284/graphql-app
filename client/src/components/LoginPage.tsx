import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../graphql/generated";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ mobile: "", password: "" });
  const [error, setError] = useState("");

  const [loginUser] = useLoginUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginUser({
      variables: formData,
      onCompleted: (response) => {
        if (response.loginUser?.code !== 200) {
          toast.error(response.loginUser?.message || "Error while user login");
          return;
        }

        const token = response.loginUser.data?.token;
        if (token) {
          localStorage.setItem("token", token);
          toast.success("Login Successful!");
          navigate("/");
        } else {
          toast.error("Token not found in response.");
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const loading = false;

  return (
    <LoginWrapper>
      <LoginCard onSubmit={handleSubmit}>
        <h2>Login</h2>

        <Input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          required
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </LoginCard>
    </LoginWrapper>
  );
}

export default Login;

const LoginWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
`;

const LoginCard = styled.form`
  background-color: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  h2 {
    text-align: center;
    margin-bottom: 1rem;
    color: #111827;
  }
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

const Button = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.9rem;
  text-align: center;
`;
