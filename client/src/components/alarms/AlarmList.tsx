import React, { useEffect, useState } from 'react';
import useToggle from '../../hooks/useToggle';
import AlarmCard from './AlarmCard';
import { AlarmData } from './AlarmTypes';

interface AlarmListProps {
    email: string;
}

export default function AlarmList({ email }: AlarmListProps) {
    const [alarmList, setAlarmList] = useState<Array<AlarmData>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [toggleToRefreshList, forceAlarmListRefresh] = useToggle();

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
    }, [email, toggleToRefreshList]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h3 className="border-bottom border-dark px-5 mb-3">
                    Alarms found
                </h3>
                {error && <p className="error-text">{error.toString()}</p>}
                {alarmList.length ? (
                    alarmList.map((alarmData) => (
                        <AlarmCard
                            refreshAlarmList={forceAlarmListRefresh}
                            data={alarmData}
                            key={alarmData.ID}
                        />
                    ))
                ) : (
                    <p>No alarms found</p>
                )}
            </div>
        </>
    );
}
