import { useHistory } from 'react-router';

interface SignOutProps {
    setEmail: (email: string) => void;
}

export default function SignOut({ setEmail }: SignOutProps) {
    const history = useHistory();
    setEmail('');
    fetch('/api/public/account/signOut').finally(() => {
        history.push('/login');
    });
    return null;
}
