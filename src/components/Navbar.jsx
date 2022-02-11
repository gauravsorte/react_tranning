import React from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    NavbarText,
    DropdownItem,
    Button,
} from 'reactstrap'

import '../CSS/navbar.css'

function navbar(props) {


    const logOut = () => {
        props.onLogout();
    }
    return (
        <div>
            <Navbar
                color="light"
                expand="md"
                fixed="top"
                full
                // light
                className='navbar'
            >
                <NavbarBrand href="/" className="nav_brand">
                    React App
                </NavbarBrand>
                <Collapse navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >
                        <NavItem>
                            <NavLink href="/users">
                                Users
                            </NavLink>
                        </NavItem>
                        
                    </Nav>
                    {props.showLoginPage ? (<div></div>) : (<Button onClick={logOut} className="logout_btn">Logout</Button>)}
                    {/* // <Button onClick={logOut}>Logout</Button> */}
                </Collapse>
            </Navbar>
        </div>
    );
}

export default navbar;
