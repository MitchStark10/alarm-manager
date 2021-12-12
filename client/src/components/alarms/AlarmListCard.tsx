// This component is intended to be used as a representation for multiple alarms with the same title
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import AlarmCard from './AlarmCard';
import { AlarmData } from './AlarmTypes';

interface AlarmListCardProps {
    alarms: AlarmData[];
    email: string;
    refreshAlarmList: () => void;
}

const alarmDateTimeComparator = (a: AlarmData, b: AlarmData): number => {
    const aDate = new Date(a.AlarmDateTime);
    const bDate = new Date(b.AlarmDateTime);

    if (aDate > bDate) {
        return -1;
    } else if (aDate < bDate) {
        return 1;
    }

    return 0;
};

export const AlarmListCard = ({ alarms, email, refreshAlarmList }: AlarmListCardProps) => {
    const [seeIndividualCards, setSeeIndividualCards] = useState(false);
    const [pendingDelete, setPendingDelete] = useState(false);

    const deleteAllAlarms = () => {
        setPendingDelete(true);

        // Using any is okay in this instance, because we aren't actually accessing any data
        const deleteRequestPromises: Promise<any>[] = [];

        alarms.forEach((alarm) => {
            deleteRequestPromises.push(
                fetch('/api/authenticated/alarm/deleteAlarm', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: alarm.Email,
                        id: alarm.ID,
                    }),
                }),
            );
        });

        Promise.allSettled(deleteRequestPromises).then(() => {
            refreshAlarmList();
            setPendingDelete(false);
        });
    };

    if (seeIndividualCards) {
        return (
            <>
                {alarms.map((alarmData, index) => (
                    <AlarmCard key={index} data={alarmData} refreshAlarmList={refreshAlarmList} email={email} />
                ))}
            </>
        );
    }

    const sortedAlarms = alarms.sort(alarmDateTimeComparator);
    const latestAlarmTime: AlarmData | null = sortedAlarms?.[0];

    return (
        <Card style={{ width: '18rem', marginBottom: '10px' }}>
            <Card.Body>
                <Card.Title>{alarms[0]?.AlarmTitle}</Card.Title>
                <Card.Text>Latest Alarm: {new Date(latestAlarmTime.AlarmDateTime).toLocaleString()}</Card.Text>
                <Card.Text>Number of Triggered Alarms: {alarms.length}</Card.Text>
                <Button variant="primary" className="w-100" onClick={() => setSeeIndividualCards(true)}>
                    See Individual Alarms
                </Button>
                <Button variant="secondary" className="mt-1 w-100" onClick={deleteAllAlarms}>
                    {pendingDelete ? 'Deleting...' : 'Delete All Alarms'}
                </Button>
            </Card.Body>
        </Card>
    );
};
