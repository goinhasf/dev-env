export interface SendResult {
  id: string;
}

export interface SendFailureResult {
  id: string;
  error: Error;
}

export interface SendBatchResult<
  Failure extends SendFailureResult,
  Success extends SendResult
> {
  batchId: string;
  successes: Success[];
  failures: Failure[];
}

export interface Producer<A, B extends SendResult> {
  send(message: A): Promise<B>;
}

export interface BatchProducer<
  A,
  B extends SendBatchResult<SendFailureResult, SendResult>
> {
  sendBatch(message: A[]): Promise<B>;
}


