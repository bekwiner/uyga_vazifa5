import PassportInfo from "../models/passport_info.model.js";
import { handleError } from "../helpers/error-response.js";
import { successRes } from "../helpers/success-response.js";

export const createPassport = async (req, res) => {
  try {
    const passport = await PassportInfo.create(req.body);
    successRes(res, "Passport info created", passport);
  } catch (err) {
    handleError(res, err);
  }
};

export const getAllPassports = async (req, res) => {
  try {
    const data = await PassportInfo.find().populate("customer");
    successRes(res, "All passport info", data);
  } catch (err) {
    handleError(res, err);
  }
};

export const getPassportById = async (req, res) => {
  try {
    const data = await PassportInfo.findById(req.params.id).populate("customer");
    if (!data) return res.status(404).json({ message: "Not found" });
    successRes(res, "Passport info", data);
  } catch (err) {
    handleError(res, err);
  }
};

export const updatePassport = async (req, res) => {
  try {
    const data = await PassportInfo.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!data) return res.status(404).json({ message: "Not found" });
    successRes(res, "Updated", data);
  } catch (err) {
    handleError(res, err);
  }
};

export const deletePassport = async (req, res) => {
  try {
    const data = await PassportInfo.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });
    successRes(res, "Deleted", data);
  } catch (err) {
    handleError(res, err);
  }
};
