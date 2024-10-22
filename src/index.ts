import { Hono } from "hono";
import authRoute from "./routes/authRoute";

const app = new Hono().basePath("/api");

app.route("/auth", authRoute);

export default {
  port: process.env.APP_PORT || 3000,
  fetch: app.fetch,
};
