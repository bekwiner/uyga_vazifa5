import { Schema, model, Types } from 'mongoose';

const ticketSchema = new Schema({
  transport: { type: Types.ObjectId, ref: 'Transport', required: true },
  customer: { type: Types.ObjectId, ref: 'Customer', required: true },
  price: { type: Number, required: true },
  seatNumber: { type: Number, required: true }
}, { timestamps: true });

export default model('Ticket', ticketSchema);
