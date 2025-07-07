import Format from "../../config/format.js";
import { signToken } from "../../utils/authentication.js";
import { checkUserWithMobile } from "./user.dao.js";

export async function loginUser({ mobile, password }) {
  const user = await checkUserWithMobile({ mobile });

  console.log(user);
  if (!user) {
    return Format.notFound(null, "User not registered with this mobile!");
  }

  const passwordMatch = password?.trim() === user.password;
  if (!passwordMatch) {
    return Format.forbidden(null, "Incorrect password!");
  }

  if (!user.is_active) {
    return Format.forbidden(
      null,
      "Please contact our help-desk to activate your account!"
    );
  }

  const tokenPayload = {
    first_name: user.first_name,
    last_name: user.last_name,
    mobile: user.mobile,
    email: user?.email || null,
  };

  const token = signToken(tokenPayload);

  return Format.success({ user, token }, "Login Successful");
}
