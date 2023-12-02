import Trainer from '../model/TrainerModel.js';

export const createTrainer = async (req, res) => {
  try {
    const newTrainer = await Trainer.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        trainer: newTrainer,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();

    res.status(200).json({
      status: 'success',
      totalResult: trainers.length,
      trainers,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const getTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({ message: 'No trainer found with the id' });
    }
    res.status(200).json({
      status: 'success',
      trainer,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const editTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      message: 'Trainer Updated successfully',
      trainer,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'Trainer delete successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};
