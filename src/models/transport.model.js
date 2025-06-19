import { Schema, model } from 'mongoose';

const transportSchema = new Schema({
  type: { type: String, enum: ['bus', 'train', 'plane'], required: true },
  name: { type: String, required: true },
  seatCount: { type: Number, required: true }
}, { timestamps: true });

export default model('Transport', transportSchema);
