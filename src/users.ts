import { readConfig, setUser } from "./config";
import { createUser, getUserByName, getUsers } from "./db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("Provide single user name");
  }
  const userName = args[0];

  const checkUser = await getUserByName(userName);
  if (!checkUser) {
    throw new Error("User is not registered");
  }

  setUser(userName);
  console.log("User name has been set");
}


export async function handlerRegister(_: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("Provide single user name");
  }

  const userName = args[0];
  const newUser = await createUser(userName);
  setUser(newUser.name);

  console.log("User registered");
  console.log(newUser);

}

export async function handlerUsers(_: string, ...args: string[]) {
 const usersList = await getUsers();
 const currentUser = readConfig().currentUserName;
 for (const user of usersList){
    if(user.name === currentUser){
      console.log(`* ${user.name} (current)`);
      continue;
    }
    console.log(`* ${user.name}`);
 }
}