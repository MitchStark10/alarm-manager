import Login from '../components/user/Login';
import NewUser from '../components/user/NewUser';

export default function LoginNewUserPage() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <Login />
            <NewUser />
        </div>
    );
}
