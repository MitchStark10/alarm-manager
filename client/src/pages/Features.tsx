import React from 'react';
import { Card } from 'react-bootstrap';

interface FeatureCardProps {
    cardTitle: string;
    cardText: string;
}

function FeatureCard({ cardTitle, cardText }: FeatureCardProps) {
    return (
        <Card style={{ width: '18rem', margin: '10px' }}>
            <Card.Body>
                <Card.Title>{cardTitle}</Card.Title>
                <Card.Text>{cardText}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default function Features() {
    return (
        <>
            <h1 style={{ marginLeft: '10px' }}>Features</h1>
            <div className="d-flex flex-row flex-wrap">
                <FeatureCard
                    cardTitle="Easy NodeJS Integration"
                    cardText={`Pre-built node module allows you to integrate
                    your node applications with minimal additional code.`}
                />
                <FeatureCard
                    cardTitle="Simple Alert Management"
                    cardText={`No need for complex UIs for visibility into your
                            application. You define the alerts that matter to
                            you with no extra bloat.`}
                />
                <FeatureCard
                    cardTitle="Open Source"
                    cardText={`The platform is open and extensible for any use
                            case. Feel free to fork the project for your own use
                            or contribute to the base project!`}
                />
                <FeatureCard
                    cardTitle="Free Hosting"
                    cardText={`For light uses, you can use the built-in hosting option 
                    for free. This means less time focusing on setting up monitoring 
                    tools and more time focusing on impacting your end users.`}
                />
            </div>
        </>
    );
}
