export interface SubscribeCommand<Topic> {
  topic: Topic;
}

export interface Subscription {
  unsubscribe(): void;
}

export interface Consumer<A> {
  subscribe(callback: (_: A) => void): Subscription;
  close(): void;
}
