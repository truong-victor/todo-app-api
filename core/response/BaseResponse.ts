import { Response } from 'express';

export interface BaseResponseDataProps<T> {
  code: number;
  data: T;
  msg: string;
}

export interface BaseResponseProps<T> {
  res: Response;
  data: BaseResponseDataProps<T>;
}

export interface BasePagingData<T> {
  dataTable: T[];
  page: number;
  pageSize: number;
}

export const BaseResponse = <T>(
  responseHandler: BaseResponseProps<T>,
): Record<string, any> => {
  const {
    res,
    data: { data, code, msg },
  } = responseHandler;
  return res.status(code).json({ data, msg });
};
