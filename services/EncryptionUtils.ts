import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const handleError = (error: Error, reject: (error: Error) => void) => {
    console.error('Error generating salt for password hash', error);
    reject(error);
};

export default {
    encryptPassword: (passwordToEncrypt: string) => {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(SALT_ROUNDS, (saltErr, salt) => {
                if (saltErr) {
                    return handleError(saltErr, reject);
                }

                bcrypt.hash(passwordToEncrypt, salt, (hashErr, hash) => {
                    if (hashErr) {
                        return handleError(hashErr, reject);
                    }

                    resolve(hash);
                });
            });
        });
    },

    comparePasswordToHash: (password: string, hash: string) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, (err, result) => {
                if (err) {
                    handleError(err, reject);
                }

                resolve(result);
            });
        });
    }
};