import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, currentUser}) => (
  <div>
    <h1>cha-ching</h1>
    <nav>
      {currentUser.isAuthenticated ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>          
          <Link to="/savings">Savings</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/savings">Savings</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// // import logo from '../../img/logo.svg';
// import { logout } from '../store/auth';

// class Navbar extends Component {
// 	onLogoutClick = (e) => {
// 		e.preventDefault();
// 		this.props.logout();
// 	};

// 	render() {
// 		return (
// 			<nav>
// 				<div className="nav-wrapper container">
					
// 					<ul id="nav-mobile" className="right hide-on-med-and-down">
//             <li>
//               <Link to="/">
// 						Home
// 					</Link>
//             </li>
// 						<li>
// 							<button
// 								onClick={this.onLogoutClick}
// 							>
// 								Logout
// 							</button>
// 						</li>
// 						<li>
// 							<Link to="/login">Login</Link>
// 						</li>
// 					</ul>
// 				</div>
// 			</nav>
// 		);
// 	}
// }

// Navbar.propTypes = {
// 	logout: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => ({
// 	auth: state.auth,
// });

// const mapDispatch = (dispatch) => ({
// 	logout: (userData) => dispatch(logout(userData)),
// });

// export default connect(mapStateToProps, mapDispatch)(Navbar);
