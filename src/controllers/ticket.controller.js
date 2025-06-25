import Ticket from '../models/ticket.model.js';
import { ticketValidator } from '../validation/ticket.validation.js';
import { handleError } from "../helpers/error-response.js";
import { successRes } from "../helpers/success-response.js";

export class TicketController {
  static async create(req, res) {
    const { error, value } = ticketValidator.validate(req.body);
    if (error) return handleError(res, error, 422);

    const ticket = await Ticket.create(value);
    return successRes(res, ticket, 201);
  }

  static async getAll(_, res) {
    const tickets = await Ticket.find().populate('transport').populate('customer');
    return successRes(res, tickets);
  }

  static async getById(req, res) {
    const ticket = await Ticket.findById(req.params.id).populate('transport').populate('customer');
    if (!ticket) return handleError(res, 'Not found', 404);
    return successRes(res, ticket);
  }

  static async update(req, res) {
    const { error, value } = ticketValidator.validate(req.body);
    if (error) return handleError(res, error, 422);

    const updated = await Ticket.findByIdAndUpdate(req.params.id, value, { new: true }).populate('transport').populate('customer');
    if (!updated) return handleError(res, 'Not found', 404);
    return successRes(res, updated);
  }

  static async delete(req, res) {
    await Ticket.findByIdAndDelete(req.params.id);
    return successRes(res, { message: 'Deleted' });
  }
}
