import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { db } from "../config/db";

await migrate(db, { migrationsFolder: "./drizzle" });
