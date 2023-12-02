import Trainer from '../model/TrainerModel.js';

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
