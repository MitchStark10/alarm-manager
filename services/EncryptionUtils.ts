import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const handleError = (error: Error, reject: (error: Error) => void) => {
    console.error('Error generating salt for password hash', error);
    reject(error);
};

const API_KEY_LENGTH = 50;
const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const CHAR_LENGTH = CHARACTERS.length;

export default {
    encryptPassword: (passwordToEncrypt: string): Promise<string> => {
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

    comparePasswordToHash: (password: string, hash: string): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, (err, result) => {
                if (err) {
                    handleError(err, reject);
                }

                resolve(result);
            });
        });
    },

    generateApiKey: (): string => {
        let result = '';
        for ( let i = 0; i < API_KEY_LENGTH; i++ ) {
            result += CHARACTERS.charAt(Math.floor(Math.random() * CHAR_LENGTH));
        }
        return result;
    }
};