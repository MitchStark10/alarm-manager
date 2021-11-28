import create from 'zustand';

type LoginState = 'LOADING' | 'LOGGED_IN' | 'UNAUTHENTICATED';

interface UserStore {
    email: string;
    apiKey: string;
    loginState: LoginState;
    setEmail: (email: string) => void;
    setApiKey: (apiKey: string) => void;
    setLoginState: (loginState: LoginState) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    email: '',
    apiKey: '',
    loginState: 'LOADING',
    setEmail: (email: string) => {
        localStorage.setItem('userEmail', email);
        set({ email });
    },
    setApiKey: (apiKey: string) => {
        localStorage.setItem('userApiKey', apiKey);
        set({ apiKey });
    },
    setLoginState: (loginState: LoginState) => set({ loginState }),
}));
