export class ResponseWrapper<T>{
    StatusCode:StatusCode;
    Body:T;
    Message?:string;
    Error?:string;

}

export enum StatusCode{
    Success = 200,
    Failed = 400,
    Error = 500
}