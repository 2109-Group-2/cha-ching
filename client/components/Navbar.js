import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/auth';
import {
	NavDropdown,
	Navbar,
	Offcanvas,
	Container,
	Button,
	Nav,
	Form,
	FormControl,
} from 'react-bootstrap';

// import logo from './cha-ching.png';
let image = '/user-icon.png';
const NavieBar = ({ handleClick, auth }) => {
	const [expanded, setExpanded] = useState(false);
	return (
		<>
			{auth.isAuthenticated ? (
				<Navbar expand={false} expanded={expanded} className="navbar">
					<Container fluid>
						<img src={'/cha-ching.png'} width={'50px'} />
						<Navbar.Brand>chaa-ching</Navbar.Brand>
						<Navbar.Toggle
							className="navbarToggle"
							aria-controls="offcanvasNavbar"
							onClick={() => setExpanded(expanded ? false : 'expanded')}
						/>
						<Navbar.Offcanvas
							id="offcanvasNavbar"
							aria-labelledby="offcanvasNavbarLabel"
							placement="end"
						>
							<Offcanvas.Header
								closeButton
								onClick={() => setExpanded(expanded ? false : 'expanded')}
							>
								<Offcanvas.Title id="offcanvasNavbarLabel">
									Menu
								</Offcanvas.Title>
							</Offcanvas.Header>
							<Offcanvas.Body>
								<Nav className="justify-content-end flex-grow-1 pe-3">
									<Nav.Link
										onClick={() =>
											setTimeout(() => {
												setExpanded(false);
											}, 150)
										}
										as={Link}
										to="/dashboard"
									>
										<img
											src={'/icons/icons8-dashboard-50.png'}
											width={'20px'}
										/>
										{'    '}
										Dashboard
									</Nav.Link>
									<Nav.Link
										onClick={() =>
											setTimeout(() => {
												setExpanded(false);
											}, 150)
										}
										as={Link}
										to="/transactions"
									>
										<img src={'/icons/icons8-ledger-50.png'} width={'20px'} />
										{'    '}Transactions
									</Nav.Link>
									<NavDropdown title="Planning" id="offcanvasNavbarDropdown">
										<NavDropdown.Item
											as={Link}
											to="/savings"
											onClick={() =>
												setTimeout(() => {
													setExpanded(false);
												}, 150)
											}
										>
											<img
												src={'/icons/icons8-savings-50-3.png'}
												width={'20px'}
											/>
											{'    '}Savings Calculator
										</NavDropdown.Item>
										<NavDropdown.Item
											as={Link}
											to="/planning"
											onClick={() =>
												setTimeout(() => {
													setExpanded(false);
												}, 150)
											}
										>
											<img
												src={'/icons/icons8-savings-50.png'}
												width={'20px'}
											/>
											{'    '}Budget Planner
										</NavDropdown.Item>
									</NavDropdown>
<Nav.Link
										onClick={() =>
											setTimeout(() => {
												setExpanded(false);
											}, 150)
										}
										as={Link}
										to="/settings"
									>
										<img
											src={'/icons/icons8-feedback-50-2.png'}
											width={'20px'}
										/>
										{'    '}Change User Settings
									</Nav.Link>

									<Nav.Link
										onClick={() =>
											setTimeout(() => {
												setExpanded(false);
											}, 150)
										}
										as={Link}
										to="/feedback"
									>
										<img
											src={'/icons/icons8-feedback-50-2.png'}
											width={'20px'}
										/>
										{'    '}Tell Us What You Think
									</Nav.Link>
									<Nav.Link
										onClick={() =>
											setTimeout(() => {
												handleClick();
												setExpanded(false);
											}, 150)
										}
										as={Link}
										to="/"
									>
										<img src={'/icons/icons8-logout-64.png'} width={'20px'} />
										{'    '}Logout
									</Nav.Link>
								</Nav>
							</Offcanvas.Body>
						</Navbar.Offcanvas>
					</Container>
				</Navbar>
			) : (
				<div className="navbar guest">
					{/* The navbar will show these links before you log in */}
					<img src={'/cha-ching.png'} width={'50px'} />
					<h1>chaa-ching</h1>
					<nav>
						<Link to="/login">Login</Link>
						<Link to="/signup">Sign Up</Link>
						<Link to="/feedback">Feedback</Link>
					</nav>
				</div>
			)}
		</>
	);
};

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		auth: state.auth,
	};
};

const mapDispatch = (dispatch) => {
	return {
		handleClick() {
			dispatch(logout());
		},
	};
};

export default connect(mapState, mapDispatch)(NavieBar);
