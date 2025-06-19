import Customer from "../models/customer.model.js";
import {
  signupValidator,
  loginValidator,
  updateValidator,
} from "../validation/customer.validation.js";
import { handleError, successRes } from "../helpers/error-response.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET;

export class CustomerController {
  static async signup(req, res) {
    const { value, error } = signupValidator.validate(req.body);
    if (error) return handleError(res, error, 422);

    const exists = await Customer.findOne({ email: value.email });
    if (exists) return handleError(res, "Email already exists", 409);

    const hashed = await bcrypt.hash(value.password, 7);
    const customer = await Customer.create({ ...value, password: hashed });

    return successRes(res, { id: customer._id, email: customer.email }, 201);
  }

  static async login(req, res) {
    const { value, error } = loginValidator.validate(req.body);
    if (error) return handleError(res, error, 422);

    const customer = await Customer.findOne({ email: value.email });
    if (
      !customer ||
      !(await bcrypt.compare(value.password, customer.password))
    ) {
      return handleError(res, "Invalid credentials", 401);
    }

    const token = jwt.sign({ id: customer._id }, JWT_SECRET, {
      expiresIn: "15m",
    });
    return successRes(res, { token });
  }

  static async me(req, res) {
    const customer = await Customer.findById(req.user.id).select("-password");
    return successRes(res, customer);
  }

  static async update(req, res) {
    const { value, error } = updateValidator.validate(req.body);
    if (error) return handleError(res, error, 422);

    if (value.password) {
      value.password = await bcrypt.hash(value.password, 7);
    }

    const updated = await Customer.findByIdAndUpdate(req.params.id, value, {
      new: true,
    }).select("-password");
    return successRes(res, updated);
  }

  static async delete(req, res) {
    await Customer.findByIdAndDelete(req.params.id);
    return successRes(res, { message: "Deleted" });
  }
}
