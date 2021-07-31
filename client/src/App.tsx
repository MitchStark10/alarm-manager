import React from 'react';
import LoginNewUserPage from './pages/LoginNewUserPage';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import LOGIN_STATES from './utils/LoginStates';
import AlarmList from './components/alarms/AlarmList';

const storeLoginInfo = (email: string) => {
    localStorage.setItem('userEmail', email);
};

function App() {
    const [email, setEmail] = React.useState<string | null>(null);
    const [loginState, setLoginState] = React.useState(LOGIN_STATES.LOADING);

    React.useEffect(() => {
        const email = localStorage.getItem('userEmail');

        if (!email) {
            setLoginState(LOGIN_STATES.UNAUTHENTICATED);
            return;
        }

        fetch('/api/public/account/loginWithCookie').then((response) => response.json())
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

    return loginState === LOGIN_STATES.LOGGED_IN ? (
        <AlarmList email={email!}/>
    ) : (
        <LoginNewUserPage
            setLoginState={setLoginState}
            storeLoginInfo={storeLoginInfo}
        />
    );
}

export default App;
