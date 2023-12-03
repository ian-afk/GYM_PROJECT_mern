import Client from '../models/ClientModel.js';

export const createClient = async (req, res) => {
  try {
    const newClient = await Client.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Client created successfully',
      client: newClient,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const getAllClient = async (req, res) => {
  try {
    const clients = await Client.find();

    res.status(200).json({
      status: 'success',
      totalResult: clients.length,
      clients,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      client,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const editClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      message: 'Client updated successfully',
      client,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};

export const deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Client deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'error',
      message: error,
    });
  }
};
