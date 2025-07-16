import { setUser } from "./config";

export function handlerLogin(cmdName: string, ...args: string[]){
  if (args.length !== 1){
    throw new Error("Provide single user name");
  }

  const userName = args[0];
  setUser(userName);
  console.log("User name has been set");
}
