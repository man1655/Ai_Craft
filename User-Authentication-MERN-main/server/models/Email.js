// models/Email.js
import mongoose from 'mongoose';

const EmailSchema = new mongoose.Schema({
  recipient: { type: String, required: true },
  subject: { type: String, required: true },
  applicationType: { type: String, required: true },
  position: { type: String, required: true },
  jobDescription: { type: String },
  content: { type: String, required: true },
}, { timestamps: true });

const Email = mongoose.model('Email', EmailSchema);
export default Email;
