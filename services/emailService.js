import { createTransport } from 'nodemailer';

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: 'mentoringspeed@gmail.com',
    pass: 'pwqmkimuumztulwq'
  }
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'mentoringspeed@gmail.com',
    to,
    subject,
    text
  };

  return transporter.sendMail(mailOptions);
};

export default { sendEmail };