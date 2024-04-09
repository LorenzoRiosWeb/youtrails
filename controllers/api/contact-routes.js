const router = require('express').Router();
// Nodemailer is a module for Node.js applications that allows you to send emails easily
const nodemailer = require('nodemailer');

// Load environment variables
require('dotenv').config();

// Contact route
router.post('/contact', async (req, res) => {
    try {
        // Extract data from request body
        const { name, email, message } = req.body;

        // Validate data (add more validation if needed)
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required.' });
        }

        // Configure nodemailer to send email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS 
            }
        });

        // Email options
        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER, 
            subject: 'Website Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Failed to send email.' });
            }
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Your message has been sent successfully. Thank you for contacting us!' });
        });

    } catch (err) {
        console.error('Error in contact route:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;
