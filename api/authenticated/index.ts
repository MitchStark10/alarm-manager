import express from 'express';
import addAlarm from './alarm/addAlarm';
import AuthUtils from '../../services/AuthUtils';
const app = express();

app.use(async (req, res, next) => {
    const {email, apiKey} = req.body;
    if (await AuthUtils.isUserAuthorized(email, apiKey)) {
        next();
    } else {
        res.status(401).json({
            success: false,
            message: 'You are not authenticated. Please authenticate and then try again.'
        });
    }
});

app.use('/alarm/addAlarm', addAlarm);

export default app;