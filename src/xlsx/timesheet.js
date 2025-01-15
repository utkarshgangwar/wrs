const XLSX = require('xlsx');
const timesheetModel = require('../models/timesheet.model');

const XlsxTimesheet = () => {

    const download = async (req, res, next) => {
        try {
            // const data = [
            //     { Date: 'Alice', Day: 25, 'employee_name': seconds },
            // ];
            const data = await timesheetModel.aggByProjectId("677f8f99301c08798ce15ab4");

            // Convert JSON data to a worksheet
            const worksheet = XLSX.utils.json_to_sheet(data);

            // Create a new workbook and append the worksheet
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

            // Write workbook to a buffer
            const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

            // Set response headers for file download
            res.setHeader('Content-Disposition', 'attachment; filename=timesheet.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

            // Send the buffer as a response
            res.send(excelBuffer);
        } catch (error) {
            console.log(error)
        }
    };

    return {
        download
    };
};

module.exports = XlsxTimesheet();
