import { useContext } from 'react';

import AuthContext from '../../context/AuthContext';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import BNavbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';

function Navbar() {
  const { authenticated, user, logout } = useContext(AuthContext);

  return (
    <BNavbar
      bg='light'
      expand='lg'
    >
      <Container>
        <BNavbar.Brand href={authenticated ? '/dashboard' : '/'}>
          Students Portal
        </BNavbar.Brand>
        <BNavbar.Toggle aria-controls='navbarScroll' />
        <BNavbar.Collapse
          className='justify-content-end'
          id='navbarScroll'
        >
          {authenticated ? (
            <>
              <NavDropdown
                title={user?.first_name + ' ' + user?.last_name}
                id='basic-nav-dropdown'
              >
                <NavDropdown.Item href='/dashboard'>Dashboard</NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <Nav.Link href='/'>Login</Nav.Link>
          )}
        </BNavbar.Collapse>
      </Container>
    </BNavbar>
  );
}

export default Navbar;
