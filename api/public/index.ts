import express from 'express';
import addAccount from './account/addAccount';
import login from './account/login';
import loginWithCookie from './account/loginWithCookie';
import signOut from './account/signOut';
const app = express();

app.use('/account/addAccount', addAccount);
app.use('/account/login', login);
app.use('/account/loginWithCookie', loginWithCookie);
app.use('/account/signOut', signOut);

export default app;
