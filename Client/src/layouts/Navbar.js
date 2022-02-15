import React, { useState } from "react";
import pic from "../img/logo/logo.png";
import Portfolio from "../components/CheckPortfolio";
import {
    Container,
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button
} from "react-bootstrap";

import ModalLogin from "./ModalLogin";

const Navigation = () => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>

            <Navbar bg="dark" variant="dark" expand="sm">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src={pic}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        React Bootstrap
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/portfolio">Portfolio</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


        </>
    );
};
export default Navigation;