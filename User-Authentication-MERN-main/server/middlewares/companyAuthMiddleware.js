import jwt from 'jsonwebtoken';
import Company from '../models/company.js';

const companyAuthMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const company = await Company.findById(decoded.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found.' });
    }

    req.company = company;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default companyAuthMiddleware;
