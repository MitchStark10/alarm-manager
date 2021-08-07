import React, { useState } from 'react';
import { useHistory } from 'react-router';
import useInputState from '../../hooks/useInputState';
import LoginNewUserProps from '../../types/LoginNewUserProps';
import loginStates from '../../utils/LoginStates';

export default function Login({
    storeLoginInfo,
    setLoginState,
}: LoginNewUserProps) {
    const [email, , setEmail] = useInputState('');
    const [password, , setPassword] = useInputState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const submitLogin = () => {
        fetch('/api/public/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    storeLoginInfo(email);
                    setLoginState(loginStates.LOGGED_IN);
                    history.push('/');
                } else {
                    setError('Email or login is incorrect');
                }
            })
            .catch((error) => {
                console.error(error);
                setError(error.toString());
            });
    };

    return (
        <>
            <div className="entry-form border-bottom border-dark pb-3 mb-3 w-50 mt-3">
                <h5>Login</h5>
                {error && <p className="error-text">{error}</p>}
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={setEmail}
                ></input>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={setPassword}
                ></input>
                <button
                    type="button"
                    className="primary-button"
                    onClick={submitLogin}
                >
                    Submit
                </button>
            </div>
        </>
    );
}
