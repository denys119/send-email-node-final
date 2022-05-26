const SMTPTransport = require('nodemailer');

module.exports = async (emailData) => {
  try {
    const transporter = SMTPTransport.createTransport({
      host: process.env.SMTP_HOST,
      service: process.env.SMTP_SERVICE,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.template
    });
    console.log("Email has benn sent to " + emailData.email);
  } catch (e) {
    console.error(e);
  }
}