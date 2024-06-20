type Environment = "development" | "production" | "local" | undefined;

type ConfigType = {
  env: Environment;
  apiUrl: string | undefined;
};

const Config = {
  env: process.env.EXPO_PUBLIC_ENV as Environment,
  apiUrl: process.env.EXPO_PUBLIC_API_URL,
} satisfies ConfigType;

export default Config;
