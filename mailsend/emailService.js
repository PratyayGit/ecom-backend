const ejs = require("ejs");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();
// Configure your SMTP transport
const transporter = nodemailer.createTransport({
  service: "Gmail", // Or use your preferred email service
  auth: {
    user: process.env.PROJECT_EMAIL,
    pass: process.env.PROJECT_EMAIL_PASSWORD, // Use app-specific password for Gmail
  },
});

// Function to send a welcome email
const sendWelcomeEmail = async (userName, recipientEmail) => {
  const templatePath = path.join(__dirname, "views", "welcome.ejs");

  // Render the EJS template
  ejs.renderFile(templatePath, { userName }, async (err, html) => {
    if (err) {
      console.error("Error rendering welcome template:", err);
      return;
    }

    const mailOptions = {
      from: process.env.PROJECT_EMAIL,
      to: recipientEmail,
      subject: "Welcome to Our Service!",
      html: html,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Welcome email sent successfully to ${recipientEmail}!`);
    } catch (error) {
      console.error("Error sending welcome email:", error);
    }
  });
};

// Function to send a password reset email
const sendPasswordResetEmail = async (firstName, otp, recipientEmail) => {
  const templatePath = path.join(__dirname, "views", "forgotPassword.ejs");

  // Render the EJS template
  ejs.renderFile(templatePath, { firstName, otp }, async (err, html) => {
    if (err) {
      console.error("Error rendering password reset template:", err);
      return;
    }

    const mailOptions = {
      from: process.env.PROJECT_EMAIL,
      to: recipientEmail,
      subject: "Password Reset Request",
      html: html,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(
        `Password reset email sent successfully to ${recipientEmail}!`
      );
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  });
};

// Export the email sending functions
module.exports = { sendWelcomeEmail, sendPasswordResetEmail };
