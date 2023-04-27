import express from 'express';

import config from './config';

const cors: express.RequestHandler = (_, res, next) => {
  res.append('Access-Control-Allow-Origin', config.defaultCorsHeader);
  next();
};

const devCors: express.RequestHandler = (req, res, next) => {
  const origin = req.header('origin');
  const isLocalhost = req.header('origin')?.includes('//localhost');
  const corsHeaderValue = isLocalhost ? origin : config.defaultCorsHeader;

  res.append('Access-Control-Allow-Origin', corsHeaderValue);

  next();
};

export default config.isProdEnv ? cors : devCors;
