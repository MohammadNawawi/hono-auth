import type { Context } from "hono";
import { loginValidator, registerValidator } from "../validators/authValidator";
import { sign } from "hono/jwt";
import { db } from "../../config/db";
import { userSchema } from "../../database/schemas/userSchema";

import { handleError } from "../helpers/handleError";
import { loginService, registerService } from "../services/authService";

export const register = async (c: Context) => {
  const { username, email, password } = await c.req.json();
  try {
    registerValidator.parse({ username, email, password });
  } catch (error) {
    handleError(c, error, 400);
  }

  try {
    await registerService(username, email, password);
    return c.json({ success: true }, 201);
  } catch (error) {
    handleError(c, error, 400);
  }
};

export const login = async (c: Context) => {
  const { email, password } = await c.req.json();
  try {
    loginValidator.parse({ email, password });
  } catch (error) {
    handleError(c, error, 400);
  }

  try {
    const token = await loginService(email, password);
    return c.json({ success: true, token: token }, 200);
  } catch (error) {
    handleError(c, error, 400);
  }
};
