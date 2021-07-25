import Login from '../components/user/Login';
import NewUser from '../components/user/NewUser';
import LoginNewUserProps from '../types/LoginNewUserProps';

export default function LoginNewUserPage({setLoginState, storeLoginInfo}: LoginNewUserProps) {
    return (
        <>
            <Login
                setLoginState={setLoginState}
                storeLoginInfo={storeLoginInfo}
            />
            <NewUser
                setLoginState={setLoginState}
                storeLoginInfo={storeLoginInfo}
            />
        </>
    );
};
