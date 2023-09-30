import { IResponse } from './response.interface';

export class ResponseCommon<T> implements IResponse<T> {
  constructor(code: number, isSuccess: boolean, message: string, data?: T) {
    this.code = code;
    this.success = isSuccess;
    this.message = message;
    this.data = data; //    console.warn(new Date().toString() + ' - [Response]: ' + message + (data ? ' - ' + JSON.stringify(data): ''));
  }
  code: number;
  message: string;
  data: T;
  errorMessage: any;
  success: boolean;
}
