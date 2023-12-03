import excel from "exceljs";
// import path from "path";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const excelFilePath = path.resolve(__dirname, "../utils/data.xlsx");

export async function readExcel(req, res) {
  try {
    const workbook = new excel.Workbook();
    await workbook.xlsx.readFile(excelFilePath);
    const worksheet = workbook.getWorksheet(1);

    const data = [];
    const headers = worksheet.getRow(1).values;

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber > 1) {
        const rowData = {};
        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          const header = headers[colNumber];
          rowData[header] = cell.value;
        });
        data.push(rowData);
      }
    });
    return res.status(200).json({ data, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
