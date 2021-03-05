import React from "react";
import {Dropdown} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'


const UserMenu = ({handleLogout}) => {
    return (

        <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
                Hi, USERNAME
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="/">My Plans</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default UserMenu