import GymBranches from '../models/GymbranchModel.js';

export const createGym = async (req, res) => {
  try {
    const gymbranch = await GymBranches.create(req.body);

    // TODO ERROR DUPLICATE EMAIL HANDLING
    res.status(201).json({
      status: 'success',
      message: 'Gymbranch Created Succesfully',
      gymbranch,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const getAllGymBranches = async (req, res) => {
  try {
    const gymbranches = await GymBranches.find();

    res.status(200).json({
      status: 'success',
      totalResult: gymbranches.length,
      gymbranches,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const getGymBranch = async (req, res) => {
  try {
    const gymbranch = await GymBranches.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      gymbranch,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const editGymBranch = async (req, res) => {
  try {
    const gymbranch = await GymBranches.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Gym branch successfully updated',
      gymbranch,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const deleteGymBranch = async (req, res) => {
  try {
    await GymBranches.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Gymbranch deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};
