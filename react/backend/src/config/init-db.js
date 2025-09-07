import bcrypt from 'bcrypt';
import User from '../models/User.js';
import About from '../models/About.js';
import Contact from '../models/Contact.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Initialize database with default admin user and sample data
 */
export const initializeDatabase = async () => {
  try {
    console.log('Checking for admin user...');
    
    // Check if admin user exists
    const adminExists = await User.findOne({ where: { email: process.env.ADMIN_EMAIL || 'admin@example.com' } });
    
    if (!adminExists) {
      console.log('Creating admin user...');
      // Create admin user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', salt);
      
      await User.create({
        username: 'admin',
        email: process.env.ADMIN_EMAIL || 'admin@example.com',
        password: hashedPassword
      });
      
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
    
    // Check if about info exists
    const aboutExists = await About.findOne();
    
    if (!aboutExists) {
      console.log('Creating default about information...');
      // Create default about info
      await About.create({
        name: 'Your Name',
        skills: ['JavaScript', 'React', 'Node.js', 'Express', 'PostgreSQL'],
        passion: 'I am passionate about creating elegant, efficient, and user-friendly web applications.'
      });
      
      console.log('Default about information created successfully');
    }
    
    // Check if contact info exists
    const contactExists = await Contact.findOne();
    
    if (!contactExists) {
      console.log('Creating default contact information...');
      // Create default contact info
      await Contact.create({
        email: 'your.email@example.com',
        phone: '+1234567890',
        linkedin: 'https://linkedin.com/in/yourprofile',
        github: 'https://github.com/yourusername',
        twitter: 'https://twitter.com/yourhandle'
      });
      
      console.log('Default contact information created successfully');
    }
    
    console.log('Database initialization completed');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};