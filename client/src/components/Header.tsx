import React, { useState } from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

interface HeaderProps {
    userEmail?: string | null;
    apiKey?: string | null;
}

export default function Header({ userEmail, apiKey }: HeaderProps) {
    const [revealApiKey, setRevealApiKey] = useState(false);

    const handleRevealApiKey = (e: React.MouseEvent) => {
        e.stopPropagation();
        setRevealApiKey(true);
    };

    return (
        <Navbar bg="dark" variant="dark" expand="md">
            <Container>
                <Navbar.Brand href="/">
                    <img className="header-logo" src="/chasm_color_nobg.svg"></img>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/features">Features</Nav.Link>
                        <Nav.Link href="/pricing">Pricing</Nav.Link>
                    </Nav>
                    {userEmail ? (
                        <NavDropdown title={'Signed in as: ' + userEmail} id="sign-out">
                            <NavDropdown.Item>
                                API Key:
                                {!revealApiKey ? (
                                    <Button className="m-2" onClick={handleRevealApiKey}>
                                        Click to Reveal
                                    </Button>
                                ) : null}
                                {revealApiKey ? apiKey : null}
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/sign-out">Sign Out</NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <Nav className="user">
                            <Button href="/login">Sign In</Button>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
