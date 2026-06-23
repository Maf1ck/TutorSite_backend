import { sendConsultationNotification } from '../services/telegramService.js';

export async function submitConsultation(req, res, next) {
  try {
    const { name, contact, grade, goal, country, comment } = req.body;

    // Basic validation
    if (!name || !name.trim() || !contact || !contact.trim()) {
      return res.status(400).json({ error: 'Name and contact are required fields.' });
    }

    // Call service to send Telegram notification
    await sendConsultationNotification({ name, contact, grade, goal, country, comment });

    return res.status(200).json({ success: true, message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error handling submitConsultation controller:', error);
    
    // Pass to error handling middleware
    next(error);
  }
}
