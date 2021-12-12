import uniq from 'lodash/uniq';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { filterNullish } from '../../filterUndefined';
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
    const [assigneeFilter, setAssigneeFilter] = useState('All');
    const [toggleToRefreshAlarmList, forceAlarmListRefresh] = useToggle();
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
    }, [email, toggleToRefreshAlarmList]);

    if (!email) {
        history.push('/login');
        return null;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const alarmListGroupedByTitle = alarmList.reduce(
        (aggregatedData: AlarmListGrouped, alarm: AlarmData): AlarmListGrouped => {
            const doesFilterMatch =
                assigneeFilter === 'All' ||
                alarm.AssigneeID === assigneeFilter ||
                (assigneeFilter === 'Unassigned' && !alarm.AssigneeID);

            if (doesFilterMatch) {
                if (aggregatedData[alarm.AlarmTitle]) {
                    aggregatedData[alarm.AlarmTitle].push(alarm);
                } else {
                    aggregatedData[alarm.AlarmTitle] = [alarm];
                }
            }

            return aggregatedData;
        },
        {},
    );

    const assigneeOptions: string[] = ['All', 'Unassigned'].concat(
        uniq(alarmList)
            .map((alarm) => alarm.AssigneeID)
            .filter(filterNullish),
    );

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h3 className="border-bottom border-dark px-5 mb-3">Alarms found</h3>
                {assigneeOptions.length ? (
                    <>
                        <label>Filter By Assignee:</label>
                        <select value={assigneeFilter} onChange={(e) => setAssigneeFilter(e.target.value)}>
                            {assigneeOptions.map((assignee) => (
                                <option key={assignee} value={assignee}>
                                    {assignee}
                                </option>
                            ))}
                        </select>
                    </>
                ) : null}
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
