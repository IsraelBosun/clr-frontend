// pages/api/sendMail.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { to, subject, text } = req.body; // Get email details from the request body

    try {
      // Create a transporter object
      const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service provider (e.g., Gmail)
        auth: {
          user: process.env.EMAIL_USER, // Your email address (store in environment variables)
          pass: process.env.EMAIL_PASS, // Your email password (store in environment variables)
        },
      });

      // Send the email
      await transporter.sendMail({
        from: process.env.EMAIL_USER, // Sender's email
        to, // Recipient's email
        subject, // Subject line
        text, // Email body
      });

      res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to send email' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
