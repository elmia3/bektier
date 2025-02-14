const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "elmiabdullah6@gmail.com", // Jouw Gmail-adres
    pass: "cptl mwcs bynw gjae", // App-specifiek wachtwoord
  },
});

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: "elmiabdullah6@gmail.com",
    subject: `Nieuwe IT-consultatie aanvraag van ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #f1c40f; background-color: #1e2f23; padding: 20px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="cid:logo" alt="BekTier Logo" style="max-width: 150px;"/>
        </div>
        <h2 style="color: #f1c40f; text-align: center;">Nieuwe consultatie aanvraag</h2>
        <div style="background: #2c3e30; padding: 15px; border-radius: 5px;">
          <p><strong>Naam:</strong> ${name}</p>
          <p><strong>E-mail:</strong> <a href="mailto:${email}" style="color: #f1c40f;">${email}</a></p>
          <p><strong>Bericht:</strong></p>
          <blockquote style="background: #344b40; padding: 15px; border-left: 5px solid #f1c40f; color: white;">
            ${message}
          </blockquote>
        </div>
        <p style="text-align: center; color: #f1c40f;">Met vriendelijke groet,</p>
        <p style="text-align: center; font-weight: bold; color: #f1c40f;">TB BekTier</p>
      </div>
    `,
    attachments: [
      {
        filename: "logo_groen.jpg",
        path: __dirname + "/public/images/logo_groen.jpg", // Zorg ervoor dat dit pad correct is
        cid: "logo",
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res
        .status(500)
        .send({ success: false, message: "Failed to send email." });
    } else {
      console.log("Email sent:", info.response);
      res
        .status(200)
        .send({ success: true, message: "Email sent successfully!" });
    }
  });
});

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
