import { OperatorFunction, pipe, catchError, of } from 'rxjs';
import { Paginable } from './response';

export function handleResponseError<T>(): OperatorFunction<T, T | []> {
  return pipe(
    catchError((error) => {
      const errorMessage = `Resource Stream Error: ${error.message || JSON.stringify(error)}`;
      console.error(errorMessage);
      return of([] as T);
    }),
  );
}

export function handleResponseErrorWithDefault<T>(defaultValue: T): OperatorFunction<T, T | []> {
  return pipe(
    catchError((error) => {
      const errorMessage = `Resource Stream Error: ${error.message || JSON.stringify(error)}`;
      console.error(errorMessage);
      return of(defaultValue);
    }),
  );
}

export function handleResponsePaginableError<T extends Paginable<any>>(): OperatorFunction<T, T> {
  const emptyResponse: Paginable<any> = {
    content: [],
    totalItems: 0,
    page: 0,
    pageSize: 0,
  };
  return pipe(
    catchError((error) => {
      const errorMessage = `Resource Stream Error: ${error.message || JSON.stringify(error)}`;
      console.error(errorMessage);
      return of(emptyResponse as T);
    }),
  );
}
