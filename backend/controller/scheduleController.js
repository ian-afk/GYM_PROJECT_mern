import Schedule from '../model/ScheduleModel.js';

export const createSchedule = async (req, res) => {
  try {
    const newSchedule = await Schedule.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Schedule successfully created',
      schedule: newSchedule,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();

    res.status(200).json({
      status: 'success',
      totalResult: schedules.length,
      schedules,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      schedule,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const editSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      message: 'schedule updated successfully',
      schedule,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'schedule deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};
