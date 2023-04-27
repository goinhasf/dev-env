export type PublishCommand<Topic> = {
  topic: Topic;
  message: string;
};

export type PublishSuccessResponse<Topic> = {
  topic: Topic;
  errorMessage?: string;
};

export type PublishFailedResponse<Topic> = {
  topic: Topic;
  data?: string;
};

export type PublishResponse<Topic> =
  | PublishSuccessResponse<Topic>
  | PublishFailedResponse<Topic>;

export type PublishResponseAsync<Topic> = Promise<PublishResponse<Topic>>;

export interface Producer<Topic> {
  send: (cmd: PublishCommand<Topic>) => PublishResponseAsync<Topic>;
}
