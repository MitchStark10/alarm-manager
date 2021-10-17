import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useInputState from '../../hooks/useInputState';
import useToggle from '../../hooks/useToggle';
import {useAssigneeOptionsStore} from '../../stores/useAssigneeOptionsStore';
import { AlarmData } from './AlarmTypes';

interface AlarmCardProps {
    data: AlarmData;
    email: string;
    refreshAlarmList: () => void;
}

export default function AlarmCard({ data, refreshAlarmList, email }: AlarmCardProps) {
    const [error, setError] = useState('');
    const [isAssigningCard, toggleIsAssigningCard] = useToggle(false);
    const [assignee, , setAssignee] = useInputState('');
    const assigneeOptions = useAssigneeOptionsStore((state) => state.assigneeOptions);

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
                setError(error);
            });
    };

    const handleAssignAlarm = () => {
        // TODO: Make the api request to assign the alarm
        fetch('/api/authenticated/alarm/assignAlarm', {
            method: 'PUT',
            body: JSON.stringify({
                assigneeId: assignee,
                alarmId: data.ID,
                email,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            toggleIsAssigningCard();
            refreshAlarmList();
        }).catch((error) => {
            console.error(error);
            setError(error);
        });
    };

    let cardBody;

    if (isAssigningCard) {
        cardBody = (
            <Card.Body>
                <Card.Title>{data.AlarmTitle}</Card.Title>
                <datalist id="assignees">
                    {assigneeOptions?.map((option, index) => {
                        console.log('iterating', option);
                        return <option key={index} value={option}/>;
                    })}
                </datalist>
                <input
                    className="mb-3"
                    type="text"
                    placeholder="Assignee"
                    value={assignee}
                    onChange={setAssignee}
                    list="assignees"
                ></input>
                <div className="d-flex justify-content-between">
                    <Button variant="primary" onClick={handleAssignAlarm}>
                        Assign Alarm
                    </Button>
                    <Button variant="secondary" onClick={toggleIsAssigningCard}>
                        Cancel
                    </Button>
                </div>
            </Card.Body>
        );
    } else {
        cardBody = (
            <Card.Body>
                <Card.Title>{data.AlarmTitle}</Card.Title>
                {data.AssigneeID ? <Card.Text><b>Assigned To: {data.AssigneeID}</b></Card.Text> : null}
                <Card.Text>{data.AlarmDateTime}</Card.Text>
                <Card.Text>{data.AlarmDetails}</Card.Text>
                {error && <p className="error-text">{error}</p>}
                <div className="d-flex justify-content-between">
                    <Button variant="primary" onClick={handleDeleteAlarm}>
                        Delete Alarm
                    </Button>
                    <Button variant="secondary" onClick={toggleIsAssigningCard}>
                        Assign Alarm
                    </Button>
                </div>
            </Card.Body>
        );
    }

    return <Card style={{ width: '18rem', marginBottom: '10px' }}>{cardBody}</Card>;
}
