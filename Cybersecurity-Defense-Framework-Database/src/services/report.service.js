const reportCrud = require("../database/crud/report.crud");
const reportAggregations = require("../database/aggregations/report.aggregations");

const registerPdfReportMetadata = async (reportData) =>
  reportCrud.createReport({
    ...reportData,
    format: "pdf",
  });

module.exports = {
  registerPdfReportMetadata,
  getReportById: reportCrud.getReportById,
  getReportsByUser: reportCrud.getReportsByUser,
  getAllReports: reportCrud.getAllReports,
  updateReport: reportCrud.updateReport,
  deleteReport: reportCrud.deleteReport,
  getReportsGeneratedPerUser: reportAggregations.getReportsGeneratedPerUser,
  getReportsByType: reportAggregations.getReportsByType,
};
