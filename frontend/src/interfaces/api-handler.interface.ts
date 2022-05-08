/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestHeaders } from "axios";

import { IApiError } from "@interfaces/api-error.interface";

import { ApiMethodTypes } from "@enums/api-handler.enum";

interface ICommonApiHandlerConfig<R> {
  endpoint: string;
  headers?: AxiosRequestHeaders;
  params?: any;
  baseURL?: string;
  onStartCb: () => any;
  onSuccessCb: (res: R) => any;
  onFailCb: (error: IApiError) => any;
  isPublic: boolean;
}
interface ICommonApiHandlerConfigWithoutData<R>
  extends ICommonApiHandlerConfig<R> {
  method: ApiMethodTypes.GET | ApiMethodTypes.DELETE;
  data: never;
}

interface ICommonApiHandlerConfigWithData<D, R>
  extends ICommonApiHandlerConfig<R> {
  method: Exclude<ApiMethodTypes, ApiMethodTypes.GET | ApiMethodTypes.DELETE>;
  data?: D;
}

export type IApiHandlerConfig<D, R> =
  | ICommonApiHandlerConfigWithoutData<R>
  | ICommonApiHandlerConfigWithData<D, R>;
