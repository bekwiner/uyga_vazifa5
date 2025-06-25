import Transport from "../models/transport.model.js";
import { transportValidator } from "../validation/transport.validation.js";
import { handleError } from "../helpers/error-response.js";
import { successRes } from "../helpers/success-response.js";

export class TransportController {
  static async create(req, res) {
    const { error, value } = transportValidator.validate(req.body);
    if (error) return handleError(res, error, 422);

    const transport = await Transport.create(value);
    return successRes(res, transport, 201);
  }

  static async getAll(_, res) {
    const transports = await Transport.find();
    return successRes(res, transports);
  }

  static async getById(req, res) {
    const transport = await Transport.findById(req.params.id);
    if (!transport) return handleError(res, "Not found", 404);
    return successRes(res, transport);
  }

  static async update(req, res) {
    const { error, value } = transportValidator.validate(req.body);
    if (error) return handleError(res, error, 422);

    const updated = await Transport.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    if (!updated) return handleError(res, "Not found", 404);
    return successRes(res, updated);
  }

  static async delete(req, res) {
    await Transport.findByIdAndDelete(req.params.id);
    return successRes(res, { message: "Deleted" });
  }
}
