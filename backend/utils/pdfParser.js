const fs = require("fs/promises");

const { PDFParse } = require("pdf-parse");

/**
 * Extract text from pdf file
 * @param {string} filePath -Path to PDF FILE
 * @return {Promise<{text: string ,numPages:number}>}
 *
 */

const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = await fs.readFile(filePath);

    //pdf-parse expects a Uint8Array not a buffer

    const parser = new PDFParse(new Uint8Array(dataBuffer));

    const data = await parser.getText();

    return {
      text: data.text,
      numPages: data.numpages,
      info: data.info,
    };
  } catch (error) {
    console.error("PDF parsing error", error);
    throw new Error("failed to extract text from PDF");
  }
};

module.exports = { extractTextFromPDF };
