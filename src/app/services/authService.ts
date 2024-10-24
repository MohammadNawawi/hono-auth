import { sign } from "hono/jwt";
import { createUser, findUserByEmail } from "../repositories/authRepository";

export const registerService = async (
  username: string,
  email: string,
  password: string
) => {
  const hashedPassword = await Bun.password.hash(password);
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }
  const user = await createUser(username, email, hashedPassword);
  return user;
};

export const loginService = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await Bun.password.verify(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const payload = {
    sub: {
      username: user.username,
      email: user.email,
      role: "admin",
    },

    exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 60 minutes
  };
  const secret = process.env.JWT_SECRET || "secret";
  const token = await sign(payload, secret);

  return token;
};
