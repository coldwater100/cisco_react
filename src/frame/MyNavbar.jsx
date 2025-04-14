import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../user/Authcontext';

export const MyNavbar = () => {
  const { isLoggedIn, username, setIsLoggedIn, setUsername } = useAuth();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setIsLoggedIn(false);
      setUsername("");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <Navbar expand="lg" className="navi-area">
      <Container>
        <Navbar.Brand href="/">Bluefence</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/test">Otp발행</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="/user/register">Register User</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav className="ms-auto">
            {!isLoggedIn ? (
              <Nav.Link href="/login">Login</Nav.Link>
            ) : (
              <NavDropdown title={username} id="user-nav-dropdown" align="end">
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
