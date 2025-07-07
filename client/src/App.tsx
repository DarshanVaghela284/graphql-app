import styled from "styled-components";
import AddOrEditUser from "./components/AddOrEditUser";
import UserList from "./components/UserList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewUser from "./components/ViewUser";
import Login from "./components/LoginPage";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <StyledWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/edit-user/:id" element={<AddOrEditUser />} />
          <Route path="/add-user" element={<AddOrEditUser />} />
          <Route path="/user/:id" element={<ViewUser />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </StyledWrapper>
  );
}

export default App;

const StyledWrapper = styled.div`
  height: 100vh;
`;
