import express from 'express';
import addAccount from './account/addAccount';
import login from './account/login';
import loginWithCookie from './account/loginWithCookie';
const app = express();

app.use('/account/addAccount', addAccount);
app.use('/account/login', login);
app.use('/account/loginWithCookie', loginWithCookie);

export default app;
