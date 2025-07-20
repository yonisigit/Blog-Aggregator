import { handlerAggregate } from "./aggCommand";
import { type CommandsRegistry, registerCommand, runCommand } from "./commands";
import { handlerAddFeed } from "./feeds";
import { handlerReset } from "./resetCommand";
import { handlerLogin, handlerRegister, handlerUsers } from "./users";

async function main() {
  const cliArgs = process.argv.slice(2);

  if (cliArgs.length < 1) {
    console.log("No args provided");
    process.exit(1);
  }

  const commandRegistry: CommandsRegistry = {};

  registerCommand(commandRegistry, "login", handlerLogin);
  registerCommand(commandRegistry, "register", handlerRegister);
  registerCommand(commandRegistry, "reset", handlerReset);
  registerCommand(commandRegistry, "users", handlerUsers);
  registerCommand(commandRegistry, "agg", handlerAggregate);
  registerCommand(commandRegistry, "addfeed", handlerAddFeed);

  const cmdName = cliArgs[0];
  const cmdArgs = cliArgs.slice(1);

  try {
    await runCommand(commandRegistry, cmdName, ...cmdArgs);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error running command ${cmdName}: ${err.message}`);
    } else {
      console.error(`Error running command ${cmdName}: ${err}`);
    }
    process.exit(1);
  }

  process.exit(0);
}

main();