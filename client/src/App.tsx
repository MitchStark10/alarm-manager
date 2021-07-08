import React from 'react';
import LoginNewUserPage from './pages/LoginNewUserPage';
import './App.css';

interface UserData {
  email: string | null,
  apiKey: string | null
};

const EMPTY_USER_INFORMATION = {
  email: null,
  apiKey: null
};

const AuthContext = React.createContext<UserData>(EMPTY_USER_INFORMATION);

const LOGIN_STATES = {
  'LOADING': 'LOADING',
  'LOGGED_IN': 'LOGGED_IN',
  'UNAUTHENTICATED': 'UNAUTHENTICATED'
};

function App() {
  const [user, setUser] = React.useState<UserData>(EMPTY_USER_INFORMATION);
  const [loginState, setLoginState] = React.useState(LOGIN_STATES.LOADING);

  React.useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const apiKey = localStorage.getItem('apiKey');

    setUser({
      email,
      apiKey
    });

    setLoginState(email && apiKey ? LOGIN_STATES.LOGGED_IN : LOGIN_STATES.UNAUTHENTICATED);
  }, []);

  if (loginState === LOGIN_STATES.LOADING) {
    return null;
  }

  return loginState === LOGIN_STATES.LOGGED_IN ? (
    <AuthContext.Provider value={user}>
      <div className="app">
        <p>You are logged in.</p>
      </div>
    </AuthContext.Provider>
  ) : (
    <LoginNewUserPage />
  );
}

export default App;
