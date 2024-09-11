import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import UserModel from '../../app/models/User';
import bcrypt from 'bcryptjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    // Debug: Log the request body
    console.log('Request Body:', req.body);

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    try {
      // Connect to MongoDB
      if (!mongoose.connection.readyState) {
        await mongoose.connect(process.env.MONGODB_URI || '');
      }

      // Check if user already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const passwordHash = await bcrypt.hash(password, 10);

      // Create a new user
      const user = new UserModel({ username, email, passwordHash });
      await user.save();

      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
