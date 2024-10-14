import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { db } from "../config/database";

await migrate(db, { migrationsFolder: "./drizzle" });
