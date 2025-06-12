const Admin = require('../models/admin.model');
const validateAdmin = require('../validation/admin.validation')
const { hashPassword } = require('../utils/hash.util')

const createAdmin = async (req, res) => {
  const { error } = validateAdmin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, email, password } = req.body;
  const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
  if (existingAdmin) return res.status(409).send('Username or email already exists.');

  const hashedPassword = await hashPassword(password);

  const newAdmin = new Admin({ username, email, password: hashedPassword });
  await newAdmin.save();
  res.status(201).send('Admin created successfully.');
};

const getAdmins = async (req, res) => {
  const admins = await Admin.find();
  res.status(200).json(admins);
};

const getAdminById = async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (!admin) return res.status(404).send('Admin not found.');
  res.status(200).json(admin);
};

const updateAdmin = async (req, res) => {
  const { error } = validateAdmin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedAdmin) return res.status(404).send('Admin not found.');
  res.status(200).json(updatedAdmin);
};

const deleteAdmin = async (req, res) => {
  const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
  if (!deletedAdmin) return res.status(404).send('Admin not found.');
  res.status(200).send('Admin deleted successfully.');
};

module.exports = { createAdmin, getAdmins, getAdminById, updateAdmin, deleteAdmin };