import PDFDocument from "pdfkit";

export function createCertificate(certificateData: { name: string, ticketType: string, hours: number}) {
  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
  });
  
  //MARGIN
  const distanceMargin = 16;
  doc
    .fillAndStroke("#FF5A8F")
    .lineWidth(20)
    .lineJoin("round")
    .rect(
      distanceMargin,
      distanceMargin,
      doc.page.width - distanceMargin * 2,
      doc.page.height - distanceMargin * 2,
    )
    .stroke();
  
  //TITLE
  doc
    .fillAndStroke("#00000")
    .font("./fonts/Diploma-Regular/Diploma-Regular.ttf")
    .fontSize(60)
    .text("Certificado", 300, 65);
  
  doc
    .fillAndStroke("#00000")
    .font("./fonts/Diploma-Regular/Diploma-Regular.ttf")
    .fontSize(30)
    .text("Certificamos que:", 330, 155);

  doc
    .fillAndStroke("#00000")
    .font("./fonts/roboto/Roboto-Bold.ttf")
    .fontSize(30)
    .text(certificateData.name, 330, 215);
  
  doc
    .fillAndStroke("#00000")
    .font("./fonts/Diploma-Regular/Diploma-Regular.ttf")
    .fontSize(30)
    .text("participou das atividades do evento", 230, 270);
  
  doc
    .fillAndStroke("#00000")
    .font("./fonts/roboto/Roboto-Italic.ttf")
    .fontSize(30)
    .text(`DRIVENT - ${certificateData.ticketType === "presential" ? "PRESENCIAL" : "ONLINE"}`,
      certificateData.ticketType === "presential" ? 270 : 300, 325);
  
  doc
    .fillAndStroke("#00000")
    .font("./fonts/Diploma-Regular/Diploma-Regular.ttf")
    .fontSize(30)
    .text("com a carga horária total de: ", 270, 380);
  
  doc
    .fillAndStroke("#00000")
    .font("./fonts/roboto/Roboto-Italic.ttf")
    .fontSize(30)
    .text(`${certificateData.hours} horas.`, 370, 430);

  //SELO
  const maxWidth = 150;
  const maxHeight = 400;
  doc.image(
    "assets/selo.png",
    650,
    400, 
    {
      fit: [maxWidth, maxHeight],
      align: "center",
    }
  );

  doc.end();
  return doc;
}
