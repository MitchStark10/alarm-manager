import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import useToggle from '../../hooks/useToggle';
import { useUserStore } from '../../stores/useUserStore';
import AlarmCard from './AlarmCard';
import { AlarmListCard } from './AlarmListCard';
import { AlarmData } from './AlarmTypes';

interface AlarmListGrouped {
    [key: string]: AlarmData[];
}

export default function AlarmList() {
    const email = useUserStore((state) => state.email);
    const [alarmList, setAlarmList] = useState<Array<AlarmData>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [toggleToRefreshList, forceAlarmListRefresh] = useToggle();
    const history = useHistory();

    useEffect(() => {
        let isMounted = true;
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
                    isMounted && setAlarmList(response.result);
                } else {
                    console.error(response);
                    isMounted && setError(response.message || response);
                }
            })
            .catch((error) => {
                console.error(error);
                isMounted && setError(error.toString());
            })
            .finally(() => {
                isMounted && setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [email, toggleToRefreshList]);

    if (!email) {
        history.push('/login');
        return null;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const alarmListGroupedByTitle = alarmList.reduce(
        (aggregatedData: AlarmListGrouped, alarm: AlarmData): AlarmListGrouped => {
            if (aggregatedData[alarm.AlarmTitle]) {
                aggregatedData[alarm.AlarmTitle].push(alarm);
            } else {
                aggregatedData[alarm.AlarmTitle] = [alarm];
            }

            return aggregatedData;
        },
        {},
    );

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h3 className="border-bottom border-dark px-5 mb-3">Alarms found</h3>
                {error && <p className="error-text">{error.toString()}</p>}
                {Object.entries(alarmListGroupedByTitle).map((keyValuePair, index) => {
                    const groupedAlarms = keyValuePair[1];

                    if (groupedAlarms.length > 1) {
                        return (
                            <AlarmListCard
                                key={index}
                                alarms={groupedAlarms}
                                refreshAlarmList={forceAlarmListRefresh}
                                email={email}
                            />
                        );
                    }

                    return (
                        <AlarmCard
                            key={index}
                            refreshAlarmList={forceAlarmListRefresh}
                            data={groupedAlarms[0]}
                            email={email}
                        />
                    );
                })}
            </div>
        </>
    );
}
