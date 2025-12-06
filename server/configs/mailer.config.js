const nodemailer = require("nodemailer");

const sendMail = async (name, to) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // Verify transporter once (improves reliability)
        await transporter.verify();

        const info = await transporter.sendMail({
            from: `"Agatuvoice Online" <${process.env.EMAIL_ADDRESS}>`,
            to: to,
            subject: "Testing Nodemailer on Hostinger",
            text: "Email sent successfully!",
            html: `<b>Email sent successfully! Welcome </b>${name}`
        });

        console.log("Mail sent:", info.messageId);
        return true;

    } catch (err) {
        console.error("Email Error:", err.message);
        return false;
    }
};

module.exports = sendMail;
