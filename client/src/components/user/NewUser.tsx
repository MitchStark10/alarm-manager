import useInputState from '../../hooks/useInputState';
import useTempText from '../../hooks/useTempText';
import { useUserStore } from '../../stores/useUserStore';
import './NewUser.scss';

export default function NewUser() {
    const { setEmail, setLoginState } = useUserStore((state) => ({
        setLoginState: state.setLoginState,
        setEmail: state.setEmail,
    }));
    const [emailInForm, , setEmailFromInput] = useInputState('');
    const [password, , setPasswordFromInput] = useInputState('');
    const [passwordConfirmation, , setConfirmationFromInput] = useInputState('');
    const [errorText, setErrorText] = useTempText();

    const onSubmitNewUser = () => {
        if (!password || !passwordConfirmation || password !== passwordConfirmation) {
            setErrorText('Invalid password', 5000);
            return;
        }

        const requestData = {
            email: emailInForm,
            password,
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData),
        };
        fetch('/api/public/account/addAccount', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setEmail(emailInForm);
                    setLoginState('LOGGED_IN');
                } else {
                    setErrorText(data.message, 5000);
                }
            })
            .catch((error) => setErrorText(error, 5000));
    };

    return (
        <div className="entry-form">
            <h5>New User</h5>
            {errorText && <p className="error-text">{errorText}</p>}
            <input type="text" placeholder="Email" value={emailInForm} onChange={setEmailFromInput}></input>
            <input type="password" placeholder="Password" value={password} onChange={setPasswordFromInput}></input>
            <input
                type="password"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={setConfirmationFromInput}
            ></input>
            <button className="primary-button" type="button" onClick={onSubmitNewUser}>
                SUBMIT
            </button>
        </div>
    );
}
