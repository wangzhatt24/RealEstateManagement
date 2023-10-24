export class IResponse<T> {
  success: boolean;
  code: number;
  message: string;
  errorMessage: string;
  data: T;
}
