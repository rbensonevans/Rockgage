import {
    Link
} from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import NavDropdown from 'react-bootstrap/NavDropdown';
import market from './rockgage.png'

const Navigation = ({ web3Handler, account }) => {
    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#">
                    <img src={market} width="40" height="40" className="" alt="" />
                    &nbsp; Rockgage
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/create-tokenized-mortgage">Tokenize Mortgage</Nav.Link>
                        <Nav.Link as={Link} to="/list-real-estate">List Real Estate</Nav.Link>
                        <Nav.Link as={Link} to="/my-account">My Wallet</Nav.Link>
                        <Nav.Link as={Link} to="/mortgage-pledge">Mortgage Pledge</Nav.Link>

                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/reserve-token">Mortgage-Backed Stablecoin</NavDropdown.Item>

                        <NavDropdown.Item as={Link} to="/global-ratings">Global Ratings</NavDropdown.Item>

                            <NavDropdown.Item as={Link} to="/user-risk">User Risk</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/system-metrics">System Metrics</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item as={Link} to="/investment-pools">Investment Pools</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/mortgage-origination">Mortgage Origination</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/mortgage-swap">Mortgage Swap</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/pay-day-loan">PayDay Loan</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item as={Link} to="/bond-trader">Bond Trader</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        {account ? (
                            <NavDropdown.Item
                                href={`https://etherscan.io/address/${account}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button nav-button btn-sm mx-4">
                                <Button variant="outline-light">
                                    {account.slice(0, 5) + '...' + account.slice(38, 42)}
                                </Button>

                            </NavDropdown.Item>
                        ) : (
                            <Button onClick={web3Handler} variant="outline-light">Connect Wallet</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Navigation;