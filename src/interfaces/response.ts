import { AxiosError, AxiosResponse } from "axios";

export type ResponseModel<T> = {
  result: boolean;
  message: string;
  errorCode?: string;
  data: T;
};

export type ResponseListModel<T> = Omit<ResponseModel<T>, "data"> & {
  data: {
    data: T[];
    length: number;
  };
};
