import nodemailer from 'nodemailer';

export const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    let transporter;

    // Use Ethereal for testing if no SMTP details provided
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('No SMTP credentials found, creating Ethereal test account...');
      let testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } else {
      transporter = nodemailer.createTransport({
        service: 'gmail', // or configured host
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    }

    const info = await transporter.sendMail({
      from: '"AI Recipe Generator" <noreply@airecipegen.com>',
      to: userEmail,
      subject: 'Welcome to AI Recipe Generator!',
      text: `Hi ${userName},\n\nWelcome to AI Recipe Generator! We're excited to have you on board. Start generating delicious recipes today!\n\nBest,\nThe AI Recipe Generator Team`,
      html: `<h3>Hi ${userName},</h3><p>Welcome to <strong>AI Recipe Generator</strong>! We're excited to have you on board.</p><p>Start generating delicious recipes today!</p><br><p>Best,<br>The AI Recipe Generator Team</p>`,
    });

    console.log('Welcome email sent: %s', info.messageId);
    if (!process.env.SMTP_USER) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
