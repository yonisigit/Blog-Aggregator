import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm"

export async function createUser(name: string) {
  const userCheck = await getUserByName(name);
  if (userCheck) {
    throw new Error("User already exists");
  }
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUserByName(name: string) {
  const [result] = await db.select().from(users).where(eq(users.name, name));
  return result;
}

export async function getUsers() {
  const result = await db.select({
    name: users.name
  }).from(users);
  return result;
}