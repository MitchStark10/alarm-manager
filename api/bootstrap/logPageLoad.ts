import express from 'express';
import mysql from 'mysql';
import nodemailer from 'nodemailer';
import QueryRunner from '../../services/QueryRunner';
const app = express();

// TODO: This is duplicated with the new account service. Probably should
// find some way to share this bit of code.
const ADD_NEW_ACCOUNT_SQL = `
INSERT INTO Alarm
(Email, AlarmTitle, AlarmDetails, AlarmDateTime)
VALUES (?, ?, ?, NOW())
`;

app.post('', async (req, res) => {
    const { alarmTitle, alarmDetails } = req.body;
    const emailToAddTheLogTo = process.env.BOOTSTRAP_EMAIL;
    const query = mysql.format(ADD_NEW_ACCOUNT_SQL, [emailToAddTheLogTo, alarmTitle, alarmDetails]);
    const response = await QueryRunner.runQueryWithErrorHandling(query);

    if (response.success) {
        console.log('creating email client', {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.BOOTSTRAP_EMAIL,
            subject: alarmTitle,
            text: alarmDetails,
        };

        // TODO: If an error occurs during the mail, what should happen?
        await transporter.sendMail(mailOptions);
    }

    res.status(response.success ? 200 : 500).json(response);
});

export default app;
