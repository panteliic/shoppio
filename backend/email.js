const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const router = express.Router();

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: true,
});

router.post(
  "/send-mail",
  asyncHandler(async (req, res) => {
    const { email, products, firstname, lastname, total, address } = req.body;
    const mailData = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for your purchase",
      text: `thanks`,
      html: `
    <b>Hello ${firstname} ${lastname},</b>
    <p>Thank you for your purchase! Here are the details of your order:</p>
    <ul>
      ${products
        .map(
          (product) =>
            `<li>${product.name} (Quantity: ${product.quantity}, Price: ${product.price} RSD)</li>`
        )
        .join("")}
    </ul>
    <p><b>Total:</b> ${total} RSD</p>
    <p><b>Shipping Address:</b> ${address}</p>
    <p>We appreciate your business and hope to see you again soon!</p>
    <p>Best regards,<br/>Your Shop Team</p>
  `,
    };

    await transporter.sendMail(mailData, function (err, info) {
      if (err) return console.log(err);
      res
        .status(200)
        .send({ message: "Mail send", message_id: info.messageId });
    });
  })
);

module.exports = router;
