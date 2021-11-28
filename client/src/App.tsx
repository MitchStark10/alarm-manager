import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import AlarmList from './components/alarms/AlarmList';
import Header from './components/Header';
import SignOut from './components/user/SignOut';
import Documentation from './pages/Documentation';
import Features from './pages/Features';
import LoginNewUserPage from './pages/LoginNewUserPage';
import Pricing from './pages/Pricing';
import { useAssigneeOptionsStore } from './stores/useAssigneeOptionsStore';
import { useUserStore } from './stores/useUserStore';

interface AssigneeOptionApiResponse {
    AssigneeID: string;
}

function App() {
    const { loginState, email, apiKey, setEmail, setApiKey, setLoginState } = useUserStore();
    const setAssigneeOptions = useAssigneeOptionsStore((state) => state.setAssigneeOptions);

    React.useEffect(() => {
        const localStorageEmail = localStorage.getItem('userEmail');
        const localStorageApiKey = localStorage.getItem('userApiKey');

        if (!localStorageEmail || !localStorageApiKey) {
            setLoginState('UNAUTHENTICATED');
            return;
        }

        fetch('/api/public/account/loginWithCookie')
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setEmail(localStorageEmail);
                    setApiKey(localStorageApiKey);
                    setLoginState('LOGGED_IN');
                } else {
                    setEmail('');
                    setLoginState('UNAUTHENTICATED');
                }
            })
            .catch(() => {
                setEmail('');
                setLoginState('UNAUTHENTICATED');
            });

        fetch('/api/bootstrap/logPageLoad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                alarmTitle: 'Visit Occurred',
                alarmDetails: 'URL: ' + window.location.pathname,
            }),
        });
    }, []);

    useEffect(() => {
        if (email) {
            fetch('/api/authenticated/assignees/getAssignees', {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setAssigneeOptions(data.result.map((option: AssigneeOptionApiResponse) => option.AssigneeID));
                })
                .catch((error) => {
                    console.error('Error retrieving assignee list', error);
                });
        }
    }, [email]);

    if (loginState === 'LOADING') {
        return null;
    }

    return (
        <>
            <Header userEmail={email} apiKey={apiKey} />
            <BrowserRouter>
                <Switch>
                    <Route path="/login">
                        <LoginNewUserPage />
                    </Route>
                    <Route path="/sign-out">
                        <SignOut />
                    </Route>
                    <Route path="/features">
                        <Features />
                    </Route>
                    <Route path="/pricing">
                        <Pricing />
                    </Route>
                    <Route path="/documentation">
                        <Documentation />
                    </Route>
                    <Route path="/">
                        <AlarmList />
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
