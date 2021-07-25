import React, {useEffect, useState} from 'react';
import AlarmCard from './AlarmCard';
import {AlarmData} from './AlarmTypes';

interface AlarmListProps {
    email: string
}

export default function AlarmList({email}: AlarmListProps) {
    const [alarmList, setAlarmList] = useState<Array<AlarmData>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = {
            email,
        };
        fetch('/api/authenticated/alarm/retrieveAlarms', {
            method: 'POST',
            body: JSON.stringify(fetchData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((data) => data.json())
            .then((response) => {
                if (response.success) {
                    setAlarmList(response.result);
                } else {
                    console.error(response);
                    setError(response.message || response);
                }
            })
            .catch((error) => {
                console.error(error);
                setError(error.toString());
            })
            .finally(() => setIsLoading(false));
    }, [email]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {error && <p className="error-text">{error.toString()}</p>}
            {alarmList.length ?
                (<div className={"d-flex flex-column justify-content-center align-items-center"}>
                    <h3 className="border-bottom border-dark px-5 mb-3">Alarms found</h3>
                    {alarmList.map((alarmData) => <AlarmCard data={alarmData} key={alarmData.ID} />)}
                </div>) :
                <p>No alarms found</p>
            }
        </>
    );
};
