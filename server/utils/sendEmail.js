// utils/sendEmail.js
import nodemailer from 'nodemailer';

export const sendOrderEmail = async (subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yysaurabh2002@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD, // Use App Password here
    },
  });

  await transporter.sendMail({
    from: 'The Luxelife <yysaurabh2002@gmail.com>',
    to: 'yysaurabh2002@gmail.com',
    subject,
    html: htmlContent,
  });
};
