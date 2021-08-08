import 'bootstrap/dist/css/bootstrap.css';
import React, { useCallback } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import AlarmList from './components/alarms/AlarmList';
import Header from './components/Header';
import SignOut from './components/user/SignOut';
import LoginNewUserPage from './pages/LoginNewUserPage';
import LOGIN_STATES from './utils/LoginStates';

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

    return (
        <>
            <Header userEmail={email} />
            <BrowserRouter>
                <Switch>
                    <Route path="/login">
                        <LoginNewUserPage
                            setLoginState={setLoginState}
                            storeLoginInfo={storeLoginInfo}
                        />
                    </Route>
                    <Route path="/sign-out">
                        <SignOut setEmail={storeLoginInfo} />
                    </Route>
                    <Route path="/">
                        <AlarmList email={email} />
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
