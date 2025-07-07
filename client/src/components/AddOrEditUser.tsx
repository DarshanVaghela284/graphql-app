import { useParams } from "react-router-dom";
import UserForm from "./UserForm";

const AddOrEditUser = () => {
  const { id } = useParams();
  return (
    // <div>
    <UserForm id={id} />
    // </div>
  );
};

export default AddOrEditUser;
