import Report from '../models/ReportModel.js';

export const createReport = async (req, res) => {
  try {
    const newReport = await Report.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Report created successfully',
      report: newReport,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find();

    res.status(200).json({
      status: 'success',
      totalResult: reports.length,
      reports,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const getReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      report,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const editReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      message: 'Report updated successfully',
      report,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const deleteReport = async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Report updated successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};
