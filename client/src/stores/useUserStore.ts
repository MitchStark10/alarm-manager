import create from 'zustand';

type LoginState = 'LOADING' | 'LOGGED_IN' | 'UNAUTHENTICATED';

interface UserStore {
    email: string;
    loginState: LoginState;
    setEmail: (email: string) => void;
    setLoginState: (loginState: LoginState) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    email: '',
    loginState: 'LOADING',
    setEmail: (email: string) => {
        localStorage.setItem('userEmail', email);
        set({ email });
    },
    setLoginState: (loginState: LoginState) => set({ loginState }),
}));
