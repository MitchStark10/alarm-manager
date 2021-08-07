import React from 'react';
import LoginNewUserPage from './pages/LoginNewUserPage';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import LOGIN_STATES from './utils/LoginStates';
import AlarmList from './components/alarms/AlarmList';
import { useCallback } from 'react';
import Header from './components/Header';

function App() {
    const [email, setEmail] = React.useState<string | null>(null);
    const [loginState, setLoginState] = React.useState(LOGIN_STATES.LOADING);

    const storeLoginInfo = useCallback((email: string) => {
        localStorage.setItem('userEmail', email);
        setEmail(email);
    }, []);

    React.useEffect(() => {
        const email = localStorage.getItem('userEmail');

        if (!email) {
            setLoginState(LOGIN_STATES.UNAUTHENTICATED);
            return;
        }

        fetch('/api/public/account/loginWithCookie')
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setEmail(email);
                    setLoginState(LOGIN_STATES.LOGGED_IN);
                } else {
                    storeLoginInfo('');
                    setLoginState(LOGIN_STATES.UNAUTHENTICATED);
                }
            })
            .catch(() => {
                storeLoginInfo('');
                setLoginState(LOGIN_STATES.UNAUTHENTICATED);
            });
    }, []);

    if (loginState === LOGIN_STATES.LOADING) {
        return null;
    }

    const mainContent = loginState === LOGIN_STATES.LOGGED_IN ? (
        <AlarmList email={email!} />
    ) : (
        <LoginNewUserPage
            setLoginState={setLoginState}
            storeLoginInfo={storeLoginInfo}
        />
    );

    return (
        <>
            <Header />
            {mainContent}
        </>
    );
}

export default App;
