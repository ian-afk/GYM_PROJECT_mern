import Payments from '../models/paymentModel.js';

export const createPayment = async (req, res) => {
  try {
    const newPayment = await Payments.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Payment created successfully',
      payment: newPayment,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payments.find();

    res.status(200).json({
      status: 'success',
      totalResult: payments.length,
      payments,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const getPayment = async (req, res) => {
  try {
    const payment = await Payments.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      payment,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const editPayment = async (req, res) => {
  try {
    const payment = await Payments.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      message: 'Payment updated successfully',
      payment,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const deletePayment = async (req, res) => {
  try {
    await Payments.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: 'success',
      message: 'Payment deleted Successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};
