import { Hono } from "hono";
import { login, register } from "../app/controllers/authController";

const authRoute = new Hono();

authRoute.post("/register", register);
authRoute.post("/login", login);

export default authRoute;
