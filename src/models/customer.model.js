import { Schema, model } from "mongoose";

const customerSchema = new Schema(
  {
    fullName: { type: String, required: true },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^998[0-9]{9}$/.test(v),
        message: "Telefon raqam 998 bilan boshlanishi kerak (masalan: 998901234567)",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: "Email formati noto‘g‘ri",
      },
    },
    birthDate: { type: Date, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Customer = model("Customer", customerSchema);
export default Customer;
