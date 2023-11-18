import * as nodemailer from 'nodemailer';
import 'dotenv/config';

const email = process.env.NODEMAILER_EMAIL;
const password = process.env.NODEMAILER_PASSWORD;

export class NodemailerService {
  private static transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password,
    },
  });

  private static mailOptions = {
    from: email,
  };

  static sendEmail = async (subject: string, html: string, to = email) => {
    const email = process.env.NODEMAILER_EMAIL;
    const password = process.env.NODEMAILER_PASSWORD;
    console.log(email, password);
    await NodemailerService.transporter.sendMail({
      ...NodemailerService.mailOptions,
      to,
      subject,
      html,
    });
  };
}
