// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import UserModel from '../../app/models/User'; // Ensure the path is correct

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' });
    }

    try {
      // Connect to MongoDB if not already connected
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URI || '', {
          // Remove deprecated options
          // useNewUrlParser and useUnifiedTopology are no longer needed
        });
      }

      // Check if user exists
      const user = await UserModel.findOne({ email });

      // Log the user object to debug
      console.log('User:', user);

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Compare passwords
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Return success response
      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
