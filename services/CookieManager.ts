import { Request, Response} from 'express';

// ms * s * m * h * d = 7 days
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
const COOKIE_ID = 'am-session';

const CookieManager = {
    getCookie: (req: Request) => {
        return req.cookies[COOKIE_ID];
    },

    setCookie: (res: Response, sessionCookie: string) => {
        res.cookie(COOKIE_ID, sessionCookie, {
            maxAge: COOKIE_MAX_AGE,
            secure: false,
        });
    },
};

export default CookieManager;
