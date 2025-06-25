import Admin from "../models/admin.model.js";
import {
  signupValidator,
  loginValidator,
  updateValidator,
} from "../validation/admin.validation.js";

import { handleError } from "../helpers/error-response.js";
import { successRes } from "../helpers/success-response.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET;

export class AdminController {
  static async signup(req, res) {
    const { value, error } = signupValidator.validate(req.body);
    if (error) return handleError(res, error, 422);

    const exists = await Admin.findOne({ email: value.email });
    if (exists) return handleError(res, "Email already exists", 409);

    const hashed = await bcrypt.hash(value.password, 7);
    const admin = await Admin.create({ email: value.email, password: hashed });

    return successRes(res, { id: admin._id, email: admin.email }, 201);
  }

  static async login(req, res) {
    const { value, error } = loginValidator.validate(req.body);
    if (error) return handleError(res, error, 422);

    const admin = await Admin.findOne({ email: value.email });
    if (!admin || !(await bcrypt.compare(value.password, admin.password))) {
      return handleError(res, "Invalid credentials", 401);
    }

    const token = jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET, {
      expiresIn: "15m",
    });

    return successRes(res, { token });
  }

  static async getAll(_, res) {
    const admins = await Admin.find().select("-password");
    return successRes(res, admins);
  }

  static async getById(req, res) {
    const admin = await Admin.findById(req.params.id).select("-password");
    if (!admin) return handleError(res, "Not found", 404);
    return successRes(res, admin);
  }

  static async update(req, res) {
    const { value, error } = updateValidator.validate(req.body);
    if (error) return handleError(res, error, 422);

    if (value.password) {
      value.password = await bcrypt.hash(value.password, 7);
    }

    const updated = await Admin.findByIdAndUpdate(req.params.id, value, {
      new: true,
    }).select("-password");
    return successRes(res, updated);
  }

  static async delete(req, res) {
    await Admin.findByIdAndDelete(req.params.id);
    return successRes(res, { message: "Deleted" });
  }
}
