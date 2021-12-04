import { IsOptional, IsInt, Min } from 'class-validator';

import { Type } from 'class-transformer';

export interface IPaginationResponse {
  pagination: {
    limit: number;
    lastPage: number;
    currentPage: number;
    total: number;
  };
}

export class IPaginationQueryParam {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}
