import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import '../Styles/NavStyles.css';
class NavbarComponent extends Component {
    render() {
        return (
                <Navbar className="navbar" collapseOnSelect expand="lg"  variant="dark">
                    <Navbar.Brand >Flow Cytometry</Navbar.Brand>
                </Navbar>
        );
    }
}

export default NavbarComponent;