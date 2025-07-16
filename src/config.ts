import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
  dbUrl: string,
  currentUserName: string
};


export function setUser(user: string){
  const config = readConfig();
  config.currentUserName = user;
  writeConfig(config);
}

export function readConfig(){
  const configString = fs.readFileSync(getConfigFilePath(), {encoding: "utf-8"});
  const configObj = JSON.parse(configString);
  return validateConfig(configObj);
}

function getConfigFilePath(): string{
  return path.join(os.homedir(), ".gatorconfig.json");
}

function writeConfig(config: Config): void{
  const validConfig = {
    db_url: config.dbUrl,
    current_user_name: config.currentUserName
  }

  const configString = JSON.stringify(validConfig, null, 2);
  fs.writeFileSync(getConfigFilePath(), configString);
}

function validateConfig(rawConfig: any): Config{
  if (!rawConfig.db_url || typeof rawConfig.db_url !== "string"){
    throw new Error("db_url is required in config file");
  }

  if (!rawConfig.current_user_name || typeof rawConfig.current_user_name !== "string"){
    throw new Error("current_user_name is required in config file");
  }

  const validConfig: Config = {
    dbUrl: rawConfig.db_url,
    currentUserName: rawConfig.current_user_name
  }

  return validConfig;
}