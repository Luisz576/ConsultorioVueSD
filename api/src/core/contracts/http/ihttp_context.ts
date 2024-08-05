import IRequest from "./irequest";
import IResponse from "./iresponse";

export default interface IHttpContext{
    getRequest(): IRequest
    getResponse(): IResponse
    next(): void
}
