import express from 'express';
import addAlarm from './alarm/addAlarm';
import retrieveAlarms from './alarm/retrieveAlarms';
import AuthUtils from '../../services/AuthUtils';
import CookieManager from '../../services/CookieManager';
const app = express();

app.use(async (req, res, next) => {
    console.log('req.body', req.body);
    const {email, apiKey} = req.body;
    const cookie = CookieManager.getCookie(req);
    if (await AuthUtils.isUserAuthorized(email, apiKey, cookie)) {
        next();
    } else {
        console.log('returning 401')
        res.status(401).json({
            success: false,
            message: 'You are not authenticated. Please authenticate and then try again.'
        });
    }
});

app.use('/alarm/addAlarm', addAlarm);
app.use('/alarm/retrieveAlarms', retrieveAlarms);

export default app;