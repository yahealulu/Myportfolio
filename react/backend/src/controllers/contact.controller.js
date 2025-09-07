import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Get contact information
export const getContactInfo = async (req, res) => {
  try {
    // Since there should only be one contact record, get the first one
    const contactInfo = await Contact.findOne();
    
    if (!contactInfo) {
      return res.status(404).json({ message: 'Contact information not found' });
    }
    
    res.status(200).json(contactInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or update contact information
export const updateContactInfo = async (req, res) => {
  try {
    const { email, phone, linkedin, github, twitter } = req.body;
    
    // Check if contact info already exists
    const existingContact = await Contact.findOne();
    
    if (existingContact) {
      // Update existing record
      await existingContact.update({
        email,
        phone,
        linkedin,
        github,
        twitter
      });
      
      res.status(200).json({
        message: 'Contact information updated successfully',
        contact: existingContact
      });
    } else {
      // Create new record
      const newContact = await Contact.create({
        email,
        phone,
        linkedin,
        github,
        twitter
      });
      
      res.status(201).json({
        message: 'Contact information created successfully',
        contact: newContact
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send contact email
export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide name, email and message' });
    }
    
    // Configure email transporter
    // Note: In production, you should use real SMTP credentials
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.example.com',
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER || 'user@example.com',
        pass: process.env.EMAIL_PASS || 'password'
      }
    });
    
    // Email content
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER || 'user@example.com'}>`,
      to: process.env.CONTACT_EMAIL || 'your-email@example.com',
      subject: `Portfolio Contact: ${subject || 'New message'}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact email error:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
};