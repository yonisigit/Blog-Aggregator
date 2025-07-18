import { db } from "..";
import { users } from "../schema";

export async function resetTable() {
  await db.delete(users);
}