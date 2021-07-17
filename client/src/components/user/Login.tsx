import { useState } from "react";
import LoginNewUserProps from "../../types/LoginNewUserProps";
import useInputState from "../../hooks/useInputState";
import loginStates from "../../utils/LoginStates";

export default function Login({ storeLoginInfo, setLoginState }: LoginNewUserProps) {
    const [email, , setEmail] = useInputState('');
    const [password, , setPassword] = useInputState('');
    const [error, setError] = useState('');

    const submitLogin = () => {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    storeLoginInfo(email);
                    setLoginState(loginStates.LOGGED_IN);
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
        <div>
            <p>Login</p>
            {error && <p className="error-text">{error}</p>}
            <input type="text" placeholder="Email" value={email} onChange={setEmail}></input>
            <input type="password" placeholder="Password" value={password} onChange={setPassword}></input>
            <button type="button" onClick={submitLogin}>Submit</button>
        </div>
    )
}