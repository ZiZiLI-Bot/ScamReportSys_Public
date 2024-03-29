import { PaginationDto } from './pagination.dto';

export type TSuccess<TData> = {
  success: true;
  statusCode: number;
  data: TData;
  pagination?: PaginationDto;
};

export class HttpRes {
  static success<T>(data: T, statusCode: number = 200, pagination?: PaginationDto): TSuccess<T> {
    return {
      success: true,
      statusCode,
      data,
      pagination,
    };
  }
}
