import { db } from "../../config/database";
import { userSchema } from "../schemas/userSchema";

const users = [
  {
    username: "admin1",
    email: "admin1@example.com",
    password: "admin123",
    releaseYear: 1990,
  },
];

export const userSeeder = async () => {
  for (const user of users) {
    try {
      const hashedPassword = await Bun.password.hash(user.password);
      await db
        .insert(userSchema)
        .values({
          username: user.username,
          email: user.email,
          password: hashedPassword,
          releaseYear: user.releaseYear,
        })
        .execute();

      console.log("User seeded");
    } catch (error) {
      console.log("Error seeding users", error);
    }
  }
};
