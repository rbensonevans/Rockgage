import {
    Link
} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Container } from 'react-bootstrap';

import market from './rockgage.png'

const Navigation = ({ web3Handler, account }) => {
    return (
        <Navbar expand="lg" bg="blue" variant="dark">
            <Container>
                <Navbar.Brand href="#">
                    <img src={market} width="40" height="40" className="" alt="" />
                    &nbsp;Rockgage
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link> <br/>
                        <Nav.Link as={Link} to="/create-tokenized-mortgage">CreateTokenizedMortgage</Nav.Link><br/>
                        <Nav.Link as={Link} to="/list-real-estate">List Real Estate</Nav.Link><br/>
                        <Nav.Link as={Link} to="/my-account">My Account</Nav.Link><br/>
                        <Nav.Link as={Link} to="/global-ratings">Global Ratings</Nav.Link><br/>
                        <Nav.Link as={Link} to="/user-risk">User Risk</Nav.Link><br/>
                        <Nav.Link as={Link} to="/mortgage-pledge">Mortgage Pledge</Nav.Link><br/>
                        <Nav.Link as={Link} to="/pay-day-loan">PayDay Loan</Nav.Link><br/>
                        <Nav.Link as={Link} to="/mortgage-swap">Mortgage Swap</Nav.Link><br/>
                        <Nav.Link as={Link} to="/investment-pools">Investment Pools</Nav.Link><br/>
                        <Nav.Link as={Link} to="/reserve-token">Reserve Token</Nav.Link><br/>
                        <Nav.Link as={Link} to="/mortgage-origination">Mortgage Origination</Nav.Link><br/>
                        <Nav.Link as={Link} to="/bond-trader">Bond Trader</Nav.Link><br/>
                        <Nav.Link as={Link} to="/system-metrics">System Metrics</Nav.Link><br/>


                    </Nav>
                    <Nav>
                        {account ? (
                            <Nav.Link
                                href={`https://etherscan.io/address/${account}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button nav-button btn-sm mx-4">
                                <Button variant="outline-light">
                                    {account.slice(0, 5) + '...' + account.slice(38, 42)}
                                </Button>

                            </Nav.Link>
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