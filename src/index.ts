import { Hono } from "hono";
import { jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";
import authRoute from "./routes/authRoute";

type Variables = JwtVariables;
const app = new Hono<{ Variables: Variables }>().basePath("/api");

app.use(
  "/dashboard/*",
  jwt({
    secret: process.env.JWT_SECRET || "secret",
  })
);

app.route("/auth", authRoute);

app.get("/dashboard/home", (c) => {
  return c.json("You are authenticated!");
});

export default {
  port: process.env.APP_PORT || 3000,
  fetch: app.fetch,
};
