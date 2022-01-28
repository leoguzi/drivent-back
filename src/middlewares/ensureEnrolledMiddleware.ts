import { Request, Response, NextFunction } from "express";
import * as enrollmentService from "../services/client/enrollment";
import ForbiddenError from "@/errors/Forbidden";

export default async function ensureEnrolled(req: Request, res: Response, next: NextFunction) {
  const enrollment =  await enrollmentService.getEnrollment(req.user.id);

  if (!enrollment) {
    throw new ForbiddenError("Você precisa completar sua inscrição antes de prosseguir");   
  }
  req.enrollment = enrollment;
  next();
}
