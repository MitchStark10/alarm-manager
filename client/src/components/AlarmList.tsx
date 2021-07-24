import { useEffect, useState } from "react";

interface AlarmListProps {
	email: string
}

export default function AlarmList({ email }: AlarmListProps) {
	const [alarmList, setAlarmList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		console.log('email', email);
		const fetchData = {
			email
		};
		fetch('/api/authenticated/alarm/retrieveAlarms', {
			method: 'POST',
			body: JSON.stringify(fetchData),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(data => data.json())
		.then(response => {
			console.log("response", response);
			if (response.success) {
				setAlarmList(response.result)
			} else {
				console.error(response);
				setError(response.error || response);
			}
		})
		.catch(error => {
			console.error(error);
			setError(error.toString());
		})
		.finally(() => setIsLoading(false));
	}, [email]);
	console.log('isLoading', isLoading);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<>
		{error && <p className="error-text">{error}</p>}
		{alarmList.length ? <p>Alarms found</p> : <p>No alarms found</p>}
		</>
	);
};