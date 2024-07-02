import { version } from "../package.json";

type Environment = "development" | "production" | "local" | undefined;

type ConfigType = {
  env: Environment;
  apiUrl: string | undefined;
  version: string | undefined;
};

const Config = {
  env: process.env.EXPO_PUBLIC_ENV as Environment,
  apiUrl: process.env.EXPO_PUBLIC_API_URL,
  version,
} satisfies ConfigType;

export default Config;
