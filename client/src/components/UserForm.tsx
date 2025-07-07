import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GET_USERS } from "../graphql/queries/user";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "../graphql/generated";

const initialFormData = {
  first_name: "",
  last_name: "",
  mobile: "",
  email: "",
  password: "",
  is_active: false,
};

type UserDetails = {
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  password: string;
  is_active: boolean;
};
type Props = {
  id?: string;
  userDetails?: UserDetails;
};

const UserForm = ({ id }: Props) => {
  const [createUser] = useCreateUserMutation({
    refetchQueries: [{ query: GET_USERS }],
    awaitRefetchQueries: true,
  });
  const [updateUser] = useUpdateUserMutation();
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    if (id) {
      const userDetails = JSON.parse(
        localStorage.getItem("selectedUser") || "{}"
      ) as UserDetails;
      setFormData({ ...userDetails });
    }
  }, [id]);

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (id) {
      updateUser({
        variables: { id, ...formData },
        onCompleted: () => {
          setFormData(initialFormData);
        },
        onError: (error) => {
          console.error("Error creating user:", error.message);
          alert(
            `Failed to update user. Please try again. Error: ${error.message}`
          );
        },
      });
    } else {
      createUser({
        variables: formData,
        onCompleted: () => {
          setFormData(initialFormData);
        },
        onError: (error) => {
          console.error("Error creating user:", error.message);
          alert(
            `Failed to create user. Please try again. Error: ${error.message}`
          );
        },
      });
    }

    navigate("/");
  };

  return (
    <FormContainer>
      <FormTitle>Create User</FormTitle>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="first_name">First Name * </Label>
          <Input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="last_name">Last Name </Label>
          <Input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="mobile">Mobile * </Label>
          <Input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            maxLength={10}
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email </Label>
          <Input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {!id && (
          <div>
            <Label htmlFor="password">Password * </Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <CheckboxWrapper>
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
          />
          <Label htmlFor="is_active">Active User </Label>
        </CheckboxWrapper>

        <Button type="submit">Submit</Button>
      </Form>
    </FormContainer>
  );
};

export default UserForm;

const FormContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 10px;
  background-color: #f9fafb;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
`;

const Form = styled.form<{
  onSubmit: (e: React.ChangeEvent<HTMLInputElement>) => void;
}>`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 0.3rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.8rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #4338ca;
  }
`;
