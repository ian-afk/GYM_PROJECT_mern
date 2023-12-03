import Membership from '../models/membershipModel.js';

export const createMembership = async (req, res) => {
  try {
    const newMembership = await Membership.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Membership successfully created',
      membership: newMembership,
    });
  } catch (error) {
    console.log(error);
    res.stauts(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const getAllMembership = async (req, res) => {
  try {
    const memberships = await Membership.find();

    res.status(200).json({
      status: 'success',
      totalResult: memberships.length,
      memberships,
    });
  } catch (error) {
    console.log(error);
    res.stauts(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const getMembership = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      membership,
    });
  } catch (error) {
    console.log(error);
    res.stauts(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const editMembership = async (req, res) => {
  try {
    const membership = await Membership.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Membership updated successfully',
      membership,
    });
  } catch (error) {
    console.log(error);
    res.stauts(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const deleteMembership = async (req, res) => {
  try {
    await Membership.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Membership deleted successfully ',
    });
  } catch (error) {
    console.log(error);
    res.stauts(404).json({
      status: 'error',
      message: error,
    });
  }
};
