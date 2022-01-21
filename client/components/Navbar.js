import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/auth';
// import logo from './cha-ching.png';

const NavBar = ({ handleClick, auth }) => (
	<div className="navbar">
    <img src={require('./cha-ching.png')} />
		<h1>cha-ching</h1>
		<nav>
			{auth.isAuthenticated ? (
				<div>
					{/* The navbar will show these links after you log in */}
					<Link to="/dashboard">Dashboard</Link>
					<Link to="/transactions">Transactions</Link>
					<a href="#" onClick={handleClick}>
						Logout
					</a>
				</div>
			) : (
				<div>
					{/* The navbar will show these links before you log in */}
					<Link to="/login">Login</Link>
					<Link to="/signup">Sign Up</Link>
				</div>
			)}
		</nav>
		<hr />
	</div>
);

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

export default connect(mapState, mapDispatch)(NavBar);
