import PassportInfo from "../models/passport_info.model.js";
import { handleError } from "../helpers/error-response.js";
import { successRes } from "../helpers/success-response.js";

export const create = async (req, res) => {
  try {
    const passport = await PassportInfo.create(req.body);
    successRes(res, passport, "Passport yaratildi");
  } catch (err) {
    handleError(res, err);
  }
};

export const getAll = async (req, res) => {
  try {
    const passports = await PassportInfo.find().populate("customer");
    successRes(res, passports, "Barcha passportlar");
  } catch (err) {
    handleError(res, err);
  }
};

export const getById = async (req, res) => {
  try {
    const passport = await PassportInfo.findById(req.params.id).populate("customer");
    successRes(res, passport, "Passport topildi");
  } catch (err) {
    handleError(res, err);
  }
};

export const update = async (req, res) => {
  try {
    const updated = await PassportInfo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    successRes(res, updated, "Passport yangilandi");
  } catch (err) {
    handleError(res, err);
  }
};

export const remove = async (req, res) => {
  try {
    await PassportInfo.findByIdAndDelete(req.params.id);
    successRes(res, null, "Passport o‘chirildi");
  } catch (err) {
    handleError(res, err);
  }
};
