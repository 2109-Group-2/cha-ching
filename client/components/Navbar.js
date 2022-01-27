import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/auth';

const NavBar = ({ handleClick, auth }) => (
	<>
		<div className="navbar">
			<img src={'/cha-ching.png'} width={'50px'} />
			<h1> cha-ching</h1>
			<nav>
				{auth.isAuthenticated ? (
					<div>
						{/* The navbar will show these links after you log in */}
						<Link to="/dashboard">Dashboard</Link>
						<Link to="/transactions">Transactions</Link>
						<Link to="/savings">Savings</Link>
						<a href="/" onClick={handleClick}>
							Logout
						</a>
						<Link to="/settings">
							<img src={'/user-Icon.png'} height={'60px'} width={'60px'} />
						</Link>
						<Link to="/feedback">Feedback</Link>
					</div>
				) : (
					<div>
						{/* The navbar will show these links before you log in */}
						<Link to="/login">Login</Link>
						<Link to="/signup">Sign Up</Link>
						<Link to="/feedback">Feedback</Link>
					</div>
				)}
			</nav>
			<hr />
		</div>
	</>
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
