import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import ErrorResponse from "./../utils/errorResponse";

export default class ValidateReq {
  static async init(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const error: any = validationResult(req);
    const err: any = error.array();
    let message: any = {};
    err.map((val: any, ind: any) => {
      message[val.param] = val.msg;
    });
    if (Object.keys(message).length > 0) {
      next(new ErrorResponse(res, 400, message));
      return true;
    }
    return false;
  }
}
