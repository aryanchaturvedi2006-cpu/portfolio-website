import Contact from '../models/Contact.js';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Name is required' });
    }

    if (name.trim().length > 100) {
      return res.status(400).json({ success: false, error: 'Name cannot exceed 100 characters' });
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address' });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    if (message.trim().length > 2000) {
      return res.status(400).json({ success: false, error: 'Message cannot exceed 2000 characters' });
    }

    const newContact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    });

    await newContact.save();

    return res.status(201).json({
      success: true,
      message: 'Message received'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }

    console.error('Contact submission error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Failed to save message. Please try again later.'
    });
  }
};
