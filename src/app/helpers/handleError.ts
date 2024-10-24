import type { Context } from "hono";

export const handleError = (c: Context, error: unknown, statusCode: any) => {
  if (error instanceof Error) {
    return c.json({ message: error.message }, statusCode);
  } else {
    return c.json({ message: "Unknown Error" }, statusCode);
  }
};
