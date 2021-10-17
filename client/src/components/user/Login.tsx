import { useState } from 'react';
import { useHistory } from 'react-router';
import useInputState from '../../hooks/useInputState';
import { useUserStore } from '../../stores/useUserStore';
import shallow from 'zustand/shallow';

export default function Login() {
    const { setEmail, setLoginState } = useUserStore(
        (state) => ({
            setLoginState: state.setLoginState,
            setEmail: state.setEmail,
        }),
        shallow,
    );
    const [emailInForm, , setEmailInForm] = useInputState('');
    const [password, , setPassword] = useInputState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const submitLogin = () => {
        fetch('/api/public/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailInForm, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setEmail(emailInForm);
                    setLoginState('LOGGED_IN');
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
                <input type="text" placeholder="Email" value={emailInForm} onChange={setEmailInForm}></input>
                <input type="password" placeholder="Password" value={password} onChange={setPassword}></input>
                <button type="button" className="primary-button" onClick={submitLogin}>
                    Submit
                </button>
            </div>
        </>
    );
}
