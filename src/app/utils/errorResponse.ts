import { Response } from "express";

class ErrorResponse extends Error {
  statusCode: number;
  message: string;
  constructor(res: Response, statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    res.status(statusCode).json({
      success: false,
      message: message,
    });
  }
}
export default ErrorResponse;
