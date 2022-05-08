import { ApiErrorCodes } from "@enums/api-handler.enum";

export interface ITryCatchError {
  response: {
    status: ApiErrorCodes;
    data: {
      messages: string | string[];
    };
  };
}
