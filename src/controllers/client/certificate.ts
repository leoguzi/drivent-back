import { Request, Response } from "express";
import httpStatus from "http-status";

import * as certificateService from "@/services/client/certificate";

export async function getCertificate(rec: Request, res: Response) {
  const enrollment = rec.enrollment;
  await certificateService.generateCertificate(enrollment);
  return res.attachment("certificate.pdf").sendStatus(httpStatus.OK);
}
