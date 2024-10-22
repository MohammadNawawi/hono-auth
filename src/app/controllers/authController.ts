import type { Context } from "hono";
import { loginValidator, registerValidator } from "../validators/authValidator";
import { sign } from "hono/jwt";
import { db } from "../../config/db";
import { userSchema } from "../../database/schemas/userSchema";
import { createUser, findUserByEmail } from "../repositories/authRepository";

export const register = async (c: Context) => {
  const { username, email, password } = await c.req.json();
  try {
    registerValidator.parse({ username, email, password });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    } else {
      return c.json({ message: "Unknown Error" }, 500);
    }
  }

  try {
    const hashedPassword = await Bun.password.hash(password);
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    await createUser(username, email, hashedPassword);

    return c.json({ success: true }, 201);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    } else {
      return c.json({ message: "Unknown Error" }, 500);
    }
  }
};

export const login = async (c: Context) => {
  const { email, password } = await c.req.json();
  try {
    loginValidator.parse({ email, password });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    } else {
      return c.json({ message: "Unknown Error" }, 500);
    }
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await Bun.password.verify(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const payload = {
      sub: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 60 minutes
    };
    const secret = process.env.JWT_SECRET || "secret";
    const token = await sign(payload, secret);

    return c.json({ success: true, token: token }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    } else {
      return c.json({ message: "Unknown Error" }, 500);
    }
  }
};
