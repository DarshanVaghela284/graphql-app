import User from "./user.model.js";

const buildSaveuserJson = (props) => {
  const json = {};
  json.first_name = props.first_name;
  json.last_name = props.last_name || null;
  json.mobile = props.mobile || null;
  json.email = props.email || null;
  json.password = props.password;
  json.is_active = true;
  return json;
};

export const getAllUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

export const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};

export const createUser = async (userDetail) => {
  try {
    const user = new User(buildSaveuserJson(userDetail));
    const result = await user.save();
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateUserById = async (userId, params) => {
  try {
    const updatePayload = { ...params };
    const user = await User.findOneAndUpdate({ _id: userId }, updatePayload, {
      new: true,
    }).select("-password -createdAt -updatedAt --v");
    return user;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const user = await User.findOneAndDelete({ _id: userId });
    return user._id.toString();
  } catch (error) {
    throw error;
  }
};

export const checkUserWithMobile = async (props) => {
  try {
    const user = await User.findOne(props);
    return user;
  } catch (error) {
    throw error;
  }
};
