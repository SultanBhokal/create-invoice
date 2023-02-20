import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useGlobalStore } from '../context/store';

function NavBar() {

    const darkMode = useGlobalStore((state)=>state.darkMode)
    const setDarkMode = useGlobalStore((state)=>state.setDarkMode)

    return (
        <Navbar bg={darkMode?"dark":"light"} expand="lg" variant={darkMode?"dark":"light"}>
            <Container fluid>
                <Navbar.Brand href="/"><h2>INVOICE GENERATOR</h2></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="w-100 me-auto my-2 my-lg-0 d-flex justify-content-end"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <div className='d-flex justify-content-end my-2'>
                            <div className='d-flex bg-light rounded-pill shadow p-1 bg-white mx-1'>
                                <Form.Label className='mx-2'>
                                    <img src={darkMode ? "./moon.svg" : "./sun.svg"} alt='mode' />
                                </Form.Label>
                                <Form.Switch checked={darkMode ? true:false} onChange={() => setDarkMode(!darkMode)} />
                            </div>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;