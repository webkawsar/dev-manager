import React from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userLoggedOut } from '../features/auth/authSlice';



const Header = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        
        // remove redux state data
        dispatch(userLoggedOut());

        // clear local storage data
        localStorage.clear();

        // show logout msg
        toast.success("Logout successful");

        // redirect to the user
        navigate("/login");
    }
    
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/" className='brand'>Dev Manager</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                    >
                        {
                            user ? 
                                <>
                                    <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                                    <Nav.Link as={NavLink} to="/contacts">Contacts</Nav.Link>
                                    <Nav.Link as={NavLink} to="/new/contacts">Add Contact</Nav.Link>
                                    <Nav.Link as={NavLink} to="/dashboard/profile">Dashboard</Nav.Link>
                                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                                </>
                                :
                                <>
                                    <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                                    <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                                    <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                                </>
                        }                        
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;