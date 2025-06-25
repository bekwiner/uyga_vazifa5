import mongoose from "mongoose";

const passportInfoSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
    unique: true
  },
  series: { type: String, required: true },
  number: { type: String, required: true },
  issuedBy: { type: String },
  dateOfIssue: { type: Date },
  dateOfExpiry: { type: Date }
}, { timestamps: true });

export default mongoose.model("PassportInfo", passportInfoSchema);
