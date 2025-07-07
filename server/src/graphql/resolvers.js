import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUser,
} from "../api/user/user.dao.js";
import { loginUser } from "../api/user/user.service.js";
import { requireAuth } from "../utils/authentication.js";

export default {
  Query: {
    users: requireAuth(async () => {
      return await getAllUsers();
    }),
    user: requireAuth(async (_, { id }) => {
      return await getUserById(id);
    }),
  },
  Mutation: {
    createUser: requireAuth(async (_, payload) => {
      return await createUser(payload);
    }),
    updateUser: requireAuth(
      async (_, { id, ...payload }) => await updateUserById(id, payload)
    ),

    deleteUser: requireAuth(async (_, { id }) => {
      return await deleteUser(id);
    }),
    loginUser: async (_, { mobile, password }) => {
      return await loginUser({ mobile, password });
    },
  },
};
