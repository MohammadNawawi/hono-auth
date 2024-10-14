import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const userSchema = sqliteTable("users", {
  id: integer("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  releaseYear: integer("release_year"),
});
