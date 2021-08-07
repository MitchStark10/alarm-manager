import express from 'express';
import CookieManager from '../../../services/CookieManager';
const app = express();

app.get('/signOut', (req, res) => {
    CookieManager.unsetCookie(res);
    res.sendStatus(200);
});

export default app;
