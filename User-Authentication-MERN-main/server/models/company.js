import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  job: { type: String, required: true },
  logo: { type: String, default: '' }, // optional
  password: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Company', companySchema);
