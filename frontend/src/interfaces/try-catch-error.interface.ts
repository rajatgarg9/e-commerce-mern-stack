export interface ITryCatchError {
  response: {
    status: number;
    data: {
      message: string;
    };
  };
}
