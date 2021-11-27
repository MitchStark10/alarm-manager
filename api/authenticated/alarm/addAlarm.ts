import express from 'express';
import mysql from 'mysql';
import nodemailer from 'nodemailer';
import queryRunner from '../../../services/QueryRunner';
const app = express();

const ADD_NEW_ACCOUNT_SQL = `
INSERT INTO Alarm
(Email, AlarmTitle, AlarmDetails, AlarmDateTime, SendEmail)
VALUES (?, ?, ?, NOW(), ?)
`;

app.post('', async (req, res) => {
    const { email, alarmTitle, alarmDetails, sendEmail } = req.body;
    const addNewAlarmQuery = mysql.format(ADD_NEW_ACCOUNT_SQL, [email, alarmTitle, alarmDetails, sendEmail]);
    const addNewAlarmResult = await queryRunner.runQueryWithErrorHandling(addNewAlarmQuery);

    if (addNewAlarmResult.success && sendEmail) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: alarmTitle,
            text: alarmDetails,
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error occured during email send: ', error);
            return res.status(500).json({
                success: false,
                message: 'Unable to send email',
                error: error,
            });
        }
    }

    res.status(addNewAlarmResult.success ? 200 : 500).json(addNewAlarmResult);
});

export default app;
