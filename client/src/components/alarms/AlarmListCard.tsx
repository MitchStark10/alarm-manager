// This component is intended to be used as a representation for multiple alarms with the same title
import {useState} from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import AlarmCard from './AlarmCard';
import { AlarmData } from './AlarmTypes';

interface AlarmListCardProps {
    alarms: AlarmData[];
}

export const AlarmListCard: React.FC<AlarmListCardProps> = ({ alarms }: AlarmListCardProps) => {
    const [seeIndividualCards, setSeeIndividualCards] = useState(false);

    if (seeIndividualCards) {
        return (
            <>
                {alarms.map((alarmData, index) =>
                    <AlarmCard key={index} data={alarmData} refreshAlarmList={() => {}}/>,
                )}
            </>
        );
    }

    return (
        <Card style={{ width: '18rem', marginBottom: '10px' }}>
            <Card.Body>
                <Card.Title>{alarms[0]?.AlarmTitle}</Card.Title>
                <Card.Text>Latest Alarm: TBD</Card.Text>
                <Card.Text>Number of Triggered Alarms: {alarms.length}</Card.Text>
                <Button variant="primary" className="w-100" onClick={() => setSeeIndividualCards(true)}>
                    See Individual Alarms
                </Button>
                <Button variant="secondary" className="mt-1 w-100">
                    Delete All Alarms
                </Button>
            </Card.Body>
        </Card>
    );
};
