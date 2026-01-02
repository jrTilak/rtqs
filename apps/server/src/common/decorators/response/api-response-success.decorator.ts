import { applyDecorators, Type } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

export class ApiResponseBaseDto {
  @ApiProperty({
    example: 200,
    description: 'HTTP status code',
  })
  statusCode: number;
  @ApiProperty({
    example: 'Success',
    description: 'Response message',
  })
  message: string;
}

/**
 * Custom decorator that creates standardized API success responses
 * Automatically sets status codes and messages based on HTTP method
 * Wraps the provided schema in a 'data' property to match ResponseInterceptor format
 */
type ApiResponseSuccessOptions = {
  description?: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  type: Type<unknown> | Function | [Function] | undefined;
  message?: string;

  /** Indicates, if the response is an array of items */
  isArray?: boolean;

  example?: any;
};

let successResponseCounter = 0;

export function ApiResponseSuccess(options: ApiResponseSuccessOptions) {
  const {
    description,
    method,
    type,
    message = '',
    isArray = false,
    example,
  } = options;

  /** Determine status code and default message based on HTTP method */
  const getStatusAndMessage = (httpMethod: string) => {
    switch (httpMethod) {
      case 'POST':
        return { statusCode: 201, defaultMessage: 'Created successfully' };
      case 'PUT':
      case 'PATCH':
        return { statusCode: 200, defaultMessage: 'Updated successfully' };
      case 'DELETE':
        return { statusCode: 200, defaultMessage: 'Deleted successfully' };
      case 'GET':
      default:
        return { statusCode: 200, defaultMessage: 'Retrieved successfully' };
    }
  };

  const { statusCode, defaultMessage } = getStatusAndMessage(method);

  if (!type) {
    return applyDecorators(
      ApiResponse({
        status: statusCode,
        description: description || defaultMessage,
        type: ApiResponseBaseDto,
      }),
    );
  }

  const uniqueId = ++successResponseCounter;
  const typeName = (typeof type === 'function' && type.name) || 'Unknown';

  class SuccessResponseTypeDto extends ApiResponseBaseDto {
    @ApiProperty({
      type: type,
      description: message || defaultMessage,
      isArray,
      example,
    })
    data: ApiResponseSuccessOptions['type'] | undefined;
  }

  /** Make the class name unique to avoid Swagger conflicts */
  Object.defineProperty(SuccessResponseTypeDto, 'name', {
    value: `SuccessResponseTypeDto_${typeName}_${uniqueId}`,
  });

  return applyDecorators(
    ApiResponse({
      status: statusCode,
      description: description || defaultMessage,
      type: SuccessResponseTypeDto,
    }),
  );
}
type ApiTypedResponseOptions = Omit<ApiResponseSuccessOptions, 'method'>;

/**
 * Convenience decorators for specific HTTP methods
 */
export const ApiGetSuccess = (options: ApiTypedResponseOptions) =>
  ApiResponseSuccess({ ...options, method: 'GET' });

export const ApiPostSuccess = (options: ApiTypedResponseOptions) =>
  ApiResponseSuccess({ ...options, method: 'POST' });

export const ApiPutSuccess = (options: ApiTypedResponseOptions) =>
  ApiResponseSuccess({ ...options, method: 'PUT' });

export const ApiPatchSuccess = (options: ApiTypedResponseOptions) =>
  ApiResponseSuccess({ ...options, method: 'PATCH' });

export const ApiDeleteSuccess = (
  options: Partial<ApiTypedResponseOptions> = {},
) =>
  ApiResponseSuccess({
    type: String,
    isArray: true,
    description: 'Array of ids that are successfully deleted',
    example: ['34bc82e0-ce4d-42ba-a054-a953ffae44f5'],
    ...options,
    method: 'DELETE',
  });

class ApiPaginatedResponseMetaBaseDto {
  @ApiProperty({
    example: 100,
    description: 'Total number of items for this resource with current filter',
  })
  totalItems: number;
  @ApiProperty({
    example: 10,
    description: 'Total number of pages',
  })
  totalPages: number;
  @ApiProperty({
    example: 1,
    description: 'Current page number',
  })
  currentPage: number;
  @ApiProperty({
    example: 10,
    description: 'Number of items per page',
  })
  itemsPerPage: number;
  @ApiProperty({
    example: true,
    description: 'Indicates if there is a next page',
  })
  hasNext: boolean;
  @ApiProperty({
    example: false,
    description: 'Indicates if there is a previous page',
  })
  hasPrev: boolean;
}

let paginatedResponseCounter = 0;

export const ApiGetSuccessPaginated = (options: ApiTypedResponseOptions) => {
  const { type, ...rest } = options;

  const uniqueId = ++paginatedResponseCounter;
  const typeName = (typeof type === 'function' && type.name) || 'Unknown';

  class PaginatedResponseTypeDto {
    @ApiProperty({
      type: type,
      isArray: true,
      description: 'List of items',
    })
    items: ApiResponseSuccessOptions['type'];

    @ApiProperty({
      type: ApiPaginatedResponseMetaBaseDto,
      description: 'Pagination metadata',
    })
    meta: ApiPaginatedResponseMetaBaseDto;
  }

  /** Make the class name unique to avoid Swagger conflicts */
  Object.defineProperty(PaginatedResponseTypeDto, 'name', {
    value: `PaginatedResponseTypeDto_${typeName}_${uniqueId}`,
  });

  return ApiResponseSuccess({
    type: PaginatedResponseTypeDto,
    ...rest,
    method: 'GET',
  });
};
