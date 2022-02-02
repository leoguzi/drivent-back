import PDFDocument from "pdfkit";
import fs from "fs";

export function createCertificate() {
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream("certificate.pdf"));

  doc
    .font("./fonts/roboto/Roboto-Regular.ttf")
    .fontSize(25)
    .text("Olar pessoal!", 100, 100);

  doc.end();
}
