import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useUserStore } from '../../stores/useUserStore';

export default function SignOut() {
    const history = useHistory();
    const setEmail = useUserStore((state) => state.setEmail);

    useEffect(() => {
        setTimeout(() => {
            fetch('/api/public/account/signOut').finally(() => {
                history.push('/login');
                setEmail('');
            });
        }, 0);
    }, []);


    return null;
}
