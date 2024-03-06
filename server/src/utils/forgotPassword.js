import nodemailer from 'nodemailer';
import config from '../config/env.config.js';
export default async function sentAnEmailForResetPassword(token, email) {
  console.log('forgotPassword: token is ', token);
  console.log('forgotPassword: email is ', email);
  console.log('🚀 ~ process.env.SMTP_SERVER:', config.smtp_server);

  const transporter = nodemailer.createTransport({
    host: config.smtp_server,
    port: config.smtp_port,
    secure: false,
    auth: {
      user: config.smtp_user,
      pass: config.smtp_pass,
    },
  });
  console.log('app url', config.client_app_url);
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <baggyhally@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'Instructions to change your password on edume ✔', // Subject line
    text: 'Instructions to change your password on edume', // plain text body
    html: `
        <h3>Forgot your password?</h3>
        <p>To change your password please click on the following link:</p>
        <a href="${config.client_app_url}/changePassword/${token}">Change password</a>`,
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}
