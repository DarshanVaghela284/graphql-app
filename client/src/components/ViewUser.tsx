import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../graphql/generated";
import styled from "styled-components";

const ViewUser = () => {
  const { id } = useParams();
  const { data: user } = useGetUserQuery({ variables: { id: id! } });

  return (
    <ViewWrapper>
      <UserCard>
        <UserHeader>
          <Avatar>{user?.user?.first_name[0]}</Avatar>
          <h2>
            {user?.user?.first_name} {user?.user?.last_name}
          </h2>
          <Status isActive={user?.user?.is_active || false}>
            {user?.user?.is_active ? "Active" : "Inactive"}
          </Status>
        </UserHeader>
        <UserDetails>
          <Label>Email:</Label>
          <Value>{user?.user?.email || "N/A"}</Value>

          <Label>Mobile:</Label>
          <Value>{user?.user?.mobile}</Value>

          <Label>User ID:</Label>
          <Value>{user?.user?.id}</Value>
        </UserDetails>
      </UserCard>
    </ViewWrapper>
  );
};

export default ViewUser;

const ViewWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  padding: 1rem;
`;

const UserCard = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
`;

const UserHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Avatar = styled.div`
  background-color: #3b82f6;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  width: 64px;
  height: 64px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const Status = styled.div<{ isActive: boolean }>`
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.4rem 1rem;
  font-size: 0.875rem;
  color: white;
  border-radius: 20px;
  background-color: ${(props) => (props.isActive ? "#10b981" : "#ef4444")};
`;

const UserDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem 0.5rem;
`;

const Label = styled.div`
  font-weight: 600;
  color: #374151;
`;

const Value = styled.div`
  color: #4b5563;
`;
