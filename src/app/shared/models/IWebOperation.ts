
export interface IWebFailResult {
  error: IWebFailResultError;
}
export interface IWebFailResultError {
  code: string;
  message: IErrorMessage;
  innererror: IInnerErrorMessage;
}
export interface IErrorMessage {
  lang: string;
  value: string;
}
export interface IInnerErrorMessage {
  message: string;
  type: string;
  stacktrace: string;
  internalexception?: IInnerErrorMessage;
}
