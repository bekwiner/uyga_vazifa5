import { Schema, model } from 'mongoose';

const AdminSchema = new Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['superadmin','admin'], default: 'admin' }
}, { timestamps: true });

export default model('Admin', AdminSchema);