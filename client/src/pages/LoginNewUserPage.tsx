import NewUser from '../components/user/NewUser';

type LoginNewUserProps = {
	setLoginState: (newValue: string) => void
};

export default function LoginNewUserPage({setLoginState}: LoginNewUserProps) {
	return (
		<NewUser
			setLoginState={setLoginState}
		/>
	)
};