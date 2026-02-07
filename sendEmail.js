const nodemailer = require("nodemailer");

exports.handler = async function(event, context) {
  try {
    const data = JSON.parse(event.body);

    // Gmail credentials (you’ll use environment variables)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,      // your Gmail address
        pass: process.env.GMAIL_PASS       // your Gmail app password
      }
    });

    // Email content
    const mailOptions = {
      from: `"Local Website Studio" <${process.env.GMAIL_USER}>`,
      to: data.email,  // visitor's email from the form
      subject: "Thanks for submitting your form!",
      text: `Hi ${data.business_name},\n\nThanks for filling the form. We'll get in touch soon!`
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" })
    };

  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};