import { eq } from "drizzle-orm";
import { db } from "../../config/db";
import { userSchema } from "../../database/schemas/userSchema";

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    await db.insert(userSchema).values({ username, email, password }).run();
    return true;
  } catch (error) {
    console.log("Error creating user", error);
    return false;
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    const user = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.email, email))
      .get();
    return user;
  } catch (error) {
    console.log("Error getting user by email", error);
    return null;
  }
};
