import { useMutation } from "@apollo/client";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { DELETE_USER } from "../graphql/mutation/user";
import { useGetUsersQuery } from "../graphql/generated";

function UserList() {
  const navigate = useNavigate();
  const { data: users, loading, error, refetch } = useGetUsersQuery();
  const [deleteUser] = useMutation(DELETE_USER);

  console.log(users, "vvvv usersusersusers");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching users.</p>;

  const handleDeleteUser = (id: string) => {
    deleteUser({
      variables: { id },
      onCompleted: () => {
        refetch();
      },
    });
  };

  return (
    <>
      <TableWrapper>
        <Header>
          <AddUserBtn onClick={() => navigate("/add-user")}>
            {" "}
            Add User
          </AddUserBtn>
        </Header>
        <Table>
          <thead>
            <tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Email</Th>
              <Th>Mobile</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {users?.users?.map((user) => (
              <tr key={user.id}>
                <Td>{user.first_name}</Td>
                <Td>{user.last_name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.mobile}</Td>
                <Td>{user.is_active ? "Active" : "Inactive"}</Td>
                <Td>
                  <ActionButton
                    variant="edit"
                    onClick={() => {
                      localStorage.setItem(
                        "selectedUser",
                        JSON.stringify(user)
                      );
                      navigate(`/edit-user/${user.id}`);
                    }}
                  >
                    Edit
                  </ActionButton>
                  <ActionButton
                    variant="delete"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </ActionButton>
                  <ActionButton
                    variant="view"
                    onClick={() => navigate(`/user/${user.id}`)}
                  >
                    View
                  </ActionButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </>
  );
}

export default UserList;

const AddUserBtn = styled.button`
  background-color: blue;
  color: white;
  outline: none !important;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const TableWrapper = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const Th = styled.th`
  background-color: #f3f4f6;
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  color: #4b5563;
`;

const ActionButton = styled.button<{
  variant: string;
}>`
  padding: 6px 12px;
  margin-right: 8px;
  font-size: 0.9rem;
  border: none;
  outline: none !important;
  border-radius: 5px;
  cursor: pointer;

  ${({ variant }) => {
    const styles: Record<string, string> = {
      edit: "background-color: #3b82f6; color: white;",
      delete: "background-color: #ef4444; color:white;",
      view: "background-color: #edd84a; color:white;",
    };
    return styles[variant] || "background-color: #6b7280;";
  }}
`;
