import kafkajs from 'kafkajs';

import config from './config';
import { getAsJson } from './http-client';

type KafkaClustersApiResponse = {
  bootstrapServers: string[];
}[];

const findBroker = async () => {
  const [{ bootstrapServers }] = await getAsJson<KafkaClustersApiResponse>(
    `http://${config.kafkaControlCenterUrl}/2.0/clusters/kafka`
  );
  return bootstrapServers;
};

const { Kafka } = kafkajs;
const kafka = new Kafka({
  clientId: 'foo',
  brokers: findBroker,
});

export default kafka;
