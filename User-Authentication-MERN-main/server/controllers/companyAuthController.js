import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Company from '../models/company.js';

export const registerCompany = async (req, res) => {
  const { name, address, email, job, logo, password } = req.body;
  try {
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: 'Company already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const company = new Company({
      name,
      address,
      email,
      job,
      logo: logo || '',
      password: hashedPassword
    });

    await company.save();

    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, company: { id: company._id, name, email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

export const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, company: { id: company._id, name: company.name, email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};
