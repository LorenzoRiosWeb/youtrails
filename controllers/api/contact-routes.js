const router = require('express').Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

// Route to handle GET request for contact page
router.get('/contact', (req, res) => {
  try {
    // Render the contact page view
    res.render('contact');
  } catch (err) {
    console.error('Error rendering contact page:', err);
    res.status(500).json({ error: 'Failed to render contact page' });
  }
});

// Route to handle contact form submission (POST /api/contact)
router.post('/', async (req, res) => {
  try {
    // Extract data from the request body
    const { name, email, message } = req.body;

    // Create a transporter using nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define email options
    const mailOptions = {
      from: `${name} <${email}>`,
      to: process.env.EMAIL_USER,
      subject: 'Contact Form Submission',
      text: message,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Respond with success message
    res.status(200).json({ message: 'Your message has been sent successfully!' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
