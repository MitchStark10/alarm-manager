import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

interface HeaderProps {
    userEmail?: string | null;
}

export default function Header({ userEmail }: HeaderProps) {
    return (
        <Navbar bg="dark" variant="dark" expand="md">
            <Container>
                <Navbar.Brand href="/">Alarm Manager</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/features">Features</Nav.Link>
                        <Nav.Link href="/pricing">Pricing</Nav.Link>
                    </Nav>
                    {userEmail ? (
                        <Navbar.Text>
                            Signed in as: <a href="/login">{userEmail}</a>
                        </Navbar.Text>
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
