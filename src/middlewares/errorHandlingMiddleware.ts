import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import InvalidEmailError from "@/errors/InvalidEmail";
import CannotEnrollBeforeStartDateError from "@/errors/CannotEnrollBeforeStartDate";
import InvalidDataError from "@/errors/InvalidData";
import ConflictError from "@/errors/ConflictError";
import UnauthorizedError from "@/errors/Unauthorized";
import NotFoundError from "@/errors/NotFoundError";
import ForbiddenError from "@/errors/Forbidden";
import CannotBuyTicketBeforeEnrollError from "@/errors/CannotBuyTicketBeforeEnrollError";
import NoContentError from "@/errors/NoContentError";
import InvalidQueryParameterError from "@/errors/InvalidQueryParameterError";

/* eslint-disable-next-line */
export default function errorHandlingMiddleware (err: Error, _req: Request, res: Response, _next: NextFunction) {

  /* eslint-disable-next-line */
  //console.error(err);
  if (err instanceof InvalidEmailError) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message
    });
  }

  if (err instanceof CannotEnrollBeforeStartDateError) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message
    });
  }

  if (err instanceof CannotBuyTicketBeforeEnrollError) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message
    });
  }

  if (err instanceof InvalidDataError) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({
      message: err.message,
      details: err.details
    });
  }

  if (err instanceof InvalidQueryParameterError) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message
    });
  }

  if (err instanceof ConflictError) {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message
    });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message
    });
  }
  
  if (err instanceof NotFoundError) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message
    });
  }

  if (err instanceof ForbiddenError) {
    return res.status(httpStatus.FORBIDDEN).send({
      message: err.message
    });
  }

  if (err instanceof NoContentError) {
    return res.status(httpStatus.NO_CONTENT).send({
      message: err.message
    });
  }

  /* eslint-disable-next-line no-console */
  console.error(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    message: "Internal Server Error!"
  });
}
