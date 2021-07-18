import React from 'react';
import LoginNewUserPage from './pages/LoginNewUserPage';
import './App.scss';
import LOGIN_STATES from './utils/LoginStates';

const storeLoginInfo = (email: string) => {
  localStorage.setItem('userEmail', email);
};

const AuthContext = React.createContext<string | null>(null);

function App() {
  const [user, setUser] = React.useState<string | null>(null);
  const [loginState, setLoginState] = React.useState(LOGIN_STATES.LOADING);

  React.useEffect(() => {
    fetch('/api/public/account/loginWithCookie', {
      method: 'POST'
    }).then(response => response.json())
      .then(data => {
        if (data.sucess) {
          const email = localStorage.getItem('userEmail');
          email && setUser(email);
          setLoginState(email ? LOGIN_STATES.LOGGED_IN : LOGIN_STATES.UNAUTHENTICATED);
        } else {
          setLoginState(LOGIN_STATES.UNAUTHENTICATED);
        }
      })
      .catch(error => {
        console.error('error occurred during cookie login', error);
        setLoginState(LOGIN_STATES.UNAUTHENTICATED);
      })
  }, []);

  if (loginState === LOGIN_STATES.LOADING) {
    return null;
  }

  console.log('here');
  return loginState === LOGIN_STATES.LOGGED_IN ? (
    <AuthContext.Provider value={user}>
      <div className="app">
        <p>You are logged in.</p>
      </div>
    </AuthContext.Provider>
  ) : (
    <LoginNewUserPage
      setLoginState={setLoginState}
      storeLoginInfo={storeLoginInfo}
    />
  );
}

export default App;
