import { Request, Response } from "express";
import * as certificateService from "@/services/client/certificate";

export async function getCertificatePDF(request: Request, response: Response) {
  const certificate = await certificateService.getCertificatePDF(request.enrollment, request.ticket);
  
  const filename = "certificate.pdf"; 
  
  response.setHeader("Content-disposition", "inline; filename=\"" + filename + "\"");
  response.setHeader("Content-type", "application/pdf");
  certificate.pipe(response);
}
