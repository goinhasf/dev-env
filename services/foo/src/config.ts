const getOrThrow = (name: string) => {
  const variable = process.env[name];
  if (!variable) {
    throw new Error(`Could not find ${name} env variable`);
  }

  return variable;
};

const defaultCorsHeader = process.env.CORS ?? 'https://ui.docker.localhost';
const port = process.env.PORT ?? 3000;
const isProdEnv = process.env.NODE_ENV === 'production';
const kafkaControlCenterUrl = getOrThrow('KAFKA_CONTROL_CENTER_URL');

export default {
  defaultCorsHeader,
  port,
  isProdEnv,
  kafkaControlCenterUrl,
};
