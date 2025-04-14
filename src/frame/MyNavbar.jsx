import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../user/Authcontext';

export const MyNavbar = () => {
  const { isLoggedIn, username, setIsLoggedIn, setUsername } = useAuth();

  // 로그아웃 함수
  const handleLogout = () => {
    setIsLoggedIn(false);  // 로그인 상태 false로 변경
    setUsername("");  // username 초기화
    sessionStorage.removeItem("isLoggedIn");  // 세션 스토리지에서 로그인 상태 제거
    sessionStorage.removeItem("username");  // 세션 스토리지에서 username 제거
  };

  return (
    <Navbar expand="lg" className="navi-area">
      <Container>
        <Navbar.Brand href="/">Bluefence</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/user/register">Test</Nav.Link>
            { isLoggedIn && (
              <NavDropdown title="관리자메뉴" id="basic-nav-dropdown">
                <NavDropdown.Item href="/user/register">Register User</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/view_qr">QR 발행</NavDropdown.Item>
              </NavDropdown>
            )}
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
