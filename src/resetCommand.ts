import { PgTable } from "drizzle-orm/pg-core";
import { resetTable } from "./db/queries/reset";

export async function handlerReset(cmdName: string, ...args: string[]) {
  await resetTable();
  console.log("Table reset");
}