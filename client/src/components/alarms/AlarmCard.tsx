import React from 'react';
import {AlarmData} from './AlarmTypes';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

interface AlarmCardProps {
    data: AlarmData
}

export default function AlarmCard({data}: AlarmCardProps) {
    return (
        <Card style={{width: '18rem'}}>
            <Card.Body>
                <Card.Title>{data.AlarmText}</Card.Title>
                <Card.Text>
                    {data.AlarmDateTime}
                </Card.Text>
                <Button variant="primary">Delete Alarm</Button>
            </Card.Body>
        </Card>
    );
}
