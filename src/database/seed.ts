import { userSeeder } from "./seeders/userSeeder";

(async () => {
  try {
    await userSeeder();
    console.log("Users seeded");
  } catch (error) {
    console.error("Failed to seed users", error);
  }
})();
