import useInputState from "../../hooks/useInputState";

export default function NewUser() {
	const [email, , setEmailFromInput] = useInputState('');
	const [password, , setPasswordFromInput] = useInputState('');
	const [passwordConfirmation, , setConfirmationFromInput] = useInputState('');

	return (
		<>
			<p>New User</p>
			<input type="text" placeholder="Email" value={email} onChange={setEmailFromInput}></input>
			<input type="password" placeholder="Password" value={password} onChange={setPasswordFromInput}></input>
			<input type="password" placeholder="Confirm Password" value={passwordConfirmation} onChange={setConfirmationFromInput}></input>
			<button type="button">SUBMIT</button>
		</>
	)
}