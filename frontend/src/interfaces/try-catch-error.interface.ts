export interface ITryCatchError {
  response: {
    status: number;
    data: {
      messages: string | string[];
    };
  };
}
