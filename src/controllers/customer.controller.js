import Customer from "../models/customer.model.js";
import {
  signupValidator,
  loginValidator,
  updateValidator,
} from "../validation/customer.validation.js";
import { handleError } from "../helpers/error-response.js";
import { successRes } from "../helpers/success-response.js";
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
    const authHeader = req.headers.authorization;
    if (!authHeader) return handleError(res, "Token yo‘q", 401);

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const customer = await Customer.findById(decoded.id).select("-password");
      return successRes(res, customer);
    } catch (err) {
      return handleError(res, "Token yaroqsiz", 403);
    }
  }

  static async updateCustomer(req, res) {
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

  static async deleteCustomer(req, res) {
    await Customer.findByIdAndDelete(req.params.id);
    return successRes(res, { message: "Deleted" });
  }

  static async getAllCustomers(req, res) {
    const customers = await Customer.find().select("-password");
    return successRes(res, customers);
  }

  static async getCustomerById(req, res) {
    const customer = await Customer.findById(req.params.id).select("-password");
    if (!customer) return handleError(res, "Customer not found", 404);
    return successRes(res, customer);
  }
}
