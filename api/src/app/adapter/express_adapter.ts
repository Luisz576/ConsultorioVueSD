import { NextFunction, Request, Response } from 'express'
import IHttpContext from "../../core/contracts/http/ihttp_context"
import IRequest from "../../core/contracts/http/irequest"
import IResponse from "../../core/contracts/http/iresponse"

export default class ExpressAdapter implements IHttpContext {
  constructor(
    private req: Request,
    private res: Response,
    private nextFunction: NextFunction
  ){}

  getRequest(): IRequest {
      return this.req
  }

  getResponse(): IResponse {
      return this.res
  }

  next() {
      this.nextFunction()
  }
}
