const XLSX = require('xlsx');
const projectModel = require('../models/project.model.js');

const XlsxTimesheet = () => {
    const download = async (req, res, next) => {
        try {
            const projectData = await projectModel.findOne({ _id: "677f8f99301c08798ce15ab4" }, {}, {})
            const date = new Date();
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
            const todayDate = date.toLocaleDateString('en-IN', options);
            const projectStartDate = new Date(projectData['startDate'] * 1000).toLocaleDateString('en-IN', options);
            const projectCloseDate = new Date(projectData['closeDate'] * 1000).toLocaleDateString('en-IN', options);

            // Prepare worksheet data
            const worksheetData = [
                // Row 1: Merged Header
                ["WSR Date", null, null, todayDate, null, null],
                // Row 2: Subheaders
                ["Project Name", projectData['name'], null, "Project Start Date", projectStartDate],
                ["Client Name", projectData["Client Name"] || "-", null, "Project Close Date", projectCloseDate || "-"],
                ["Project Manager", projectData.managers[0] || "-", null, "Current Sprint", projectData["currentSprint"]],
                [null, null, null, "Total Sprint", projectData["totalSprints"]],
                // Executive Summary
                [], // Empty row for spacing
                ["Executive Summary", null, [projectData["executiveSummary"].join("\n"), null, null, null, null], null, null, null], // Row for Executive Summary Header
                [],
                // Commercial Health
                ["Commercial Health"],
                ["All Applicable invoices Raised"],
                ["All Applicable invoices PAID", null, null, "GREEN"],
                []
                ["Original vs Actual Effor", null, null, "RED"],
                ["Original Effort Hours (SOW)", null, "A", 295],
                ["Effort Hours Consumed (Timesheet)", null, "C", 305],
                ["Shadow / Trainee Resources Hours", null, "D", 0],
                ["Actual Hours Consumed", null, "Z=C-D", 305],
                ["% Hours Consumed", null, "Z/(A+B)", "103%"],
                []

            ];

            // Create the worksheet
            const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

            // Merge cells
            worksheet['!merges'] = [
                { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }, // Merge "WSR Date"
                { s: { r: 0, c: 3 }, e: { r: 0, c: 5 } },  // Merge "30-Apr-24"
                { s: { r: 6, c: 0 }, e: { r: 10, c: 1 } }, // Merge "Executive Summary" header
                { s: { r: 6, c: 2 }, e: { r: 10, c: 5 } }, // Merge "Executive Summary" content
                { s: { r: 12, c: 0 }, e: { r: 12, c: 2 } } // Merge "Commercial Health" header

            ];

            // Set column widths
            worksheet['!cols'] = [
                { wch: 20 }, // Column A (WSR Date and subheaders)
                { wch: 30 }, // Column B (Values under WSR Date)
                { wch: 10 }, // Column C (Spacer)
                { wch: 20 }, // Column D (Date subheaders)
                { wch: 30 }, // Column E (Values under Date)
                { wch: 10 }  // Column F (Spacer)
            ];
            

            // Enable text wrapping
            Object.keys(worksheet).forEach(cell => {
                if (cell[0] !== '!') {
                    worksheet[cell].s = {
                        alignment: {
                            wrapText: true, // Enable text wrapping
                            vertical: "center", // Vertical alignment
                            horizontal: "center" // Horizontal alignment
                        }
                    };
                }
            });

            // Create a new workbook and append the worksheet
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

            // Write workbook to a buffer
            const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

            // Set response headers for file download
            res.setHeader('Content-Disposition', 'attachment; filename=project-health.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

            // Send the buffer as a response
            res.send(excelBuffer);
        } catch (error) {
            console.log(error);
            res.status(500).send("Error generating Excel file");
        }
    };

    return {
        download
    };
};

module.exports = XlsxTimesheet();
