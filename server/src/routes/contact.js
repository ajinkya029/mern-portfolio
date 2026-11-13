import { Router } from "express";
import Message from "../models/Message.js";
import transporter from "../config/mailer.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { name, email, message } = req.body ?? {};

    if (
      ![name, email, message].every(
        (value) => typeof value === "string" && value.trim(),
      )
    ) {
      return res.status(400).json({
        message: "Please provide your name, email, and message.",
      });
    }

    if (
      name.trim().length < 2 ||
      name.length > 80 ||
      message.trim().length < 10 ||
      message.length > 3000
    ) {
      return res.status(400).json({
        message: "Please check the length of your name or message.",
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length > 160 || !emailPattern.test(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address.",
      });
    }

    const saved = await Message.create({
      name,
      email,
      message,
    });

    let emailNotification = "sent";

    try {
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.RECEIVER_EMAIL,
        replyTo: email,
        subject: `New Portfolio Message from ${name}`,
        text: `
You received a new message from your portfolio website.

Name: ${name}
Email: ${email}

Message:
${message}

Received: ${new Date().toLocaleString()}
        `,
      });
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
      emailNotification = "failed";
    }

    return res.status(201).json({
      message: "Message received.",
      id: saved._id,
      emailNotification,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
