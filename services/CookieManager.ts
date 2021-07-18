import {Response} from 'express';

// ms * s * m * h * d = 7 days
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;

const CookieManager = {
    setCookie: (res: Response, sessionCookie: string) => {
        res.cookie('am-session', sessionCookie, {
            maxAge: COOKIE_MAX_AGE,
            secure: false,
        });
    },
};

export default CookieManager;
