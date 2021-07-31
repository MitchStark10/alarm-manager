import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AlarmData } from './AlarmTypes';

interface AlarmCardProps {
    data: AlarmData;
    refreshAlarmList: () => void;
}

export default function AlarmCard({ data, refreshAlarmList }: AlarmCardProps) {
    const [deleteError, setDeleteError] = useState('');
    const handleDeleteAlarm = () => {
        fetch('/api/authenticated/alarm/deleteAlarm', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.Email,
                id: data.ID,
            }),
        })
            .then(() => {
                refreshAlarmList();
            })
            .catch((error) => {
                console.error(error);
                setDeleteError(error);
            });
    };

    return (
        <Card style={{ width: '18rem', marginBottom: '10px' }}>
            <Card.Body>
                <Card.Title>{data.AlarmText}</Card.Title>
                <Card.Text>{data.AlarmDateTime}</Card.Text>
                {deleteError && <p className="error-text">{deleteError}</p>}
                <Button variant="primary" onClick={handleDeleteAlarm}>
                    Delete Alarm
                </Button>
            </Card.Body>
        </Card>
    );
}
