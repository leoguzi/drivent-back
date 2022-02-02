import { Request, Response } from "express";
import httpStatus from "http-status";
import * as certificateService from "@/services/client/certificate";

export async function getCertificatePDF(request: Request, response: Response) {
  const certificate = await certificateService.getDummy();

  response.setHeader("Content-Type", "application/pdf");
  response.setHeader(
    "Content-Disposition",
    `attachment; filename="items-${Date.now()}.pdf"`,
  );
  response.setHeader("Cache-Control", "no-cache");
  response.setHeader("Pragma", "no-cache");
  return response.status(httpStatus.NOT_IMPLEMENTED).send(certificate);
}
