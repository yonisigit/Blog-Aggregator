import { type CommandsRegistry, registerCommand, runCommand } from "./commands";
import { handlerLogin } from "./users";

function main() {
  const cliArgs = process.argv.slice(2);

  if (cliArgs.length < 1) {
    console.log("No args provided");
    process.exit(1);
  }

  const commandRegistry: CommandsRegistry = {};

  registerCommand(commandRegistry, "login", handlerLogin);

  const cmdName = cliArgs[0];
  const cmdArgs = cliArgs.slice(1);

  try {
    runCommand(commandRegistry, cmdName, ...cmdArgs);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error running command ${cmdName}: ${err.message}`);
    } else {
      console.error(`Error running command ${cmdName}: ${err}`);
    }
    process.exit(1);
  }



}

main();