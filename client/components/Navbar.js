import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/auth';
import {
	CDBSidebar,
	CDBSidebarContent,
	CDBSidebarFooter,
	CDBSidebarHeader,
	CDBSidebarMenu,
	CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import logo from '../../public/cha-ching.png';

const Navbar = ({ handleClick, auth }) => (
	// <div>
	// 	<h1>cha-ching</h1>
	// 	<nav>
	// 		{auth.isAuthenticated ? (
	// 			<div>
	// 				{/* The navbar will show these links after you log in */}
	// 				<Link to="/dashboard">Dashboard</Link>
	// 				<Link to="/transactions">Transactions</Link>
	// 				<a href="#" onClick={handleClick}>
	// 					Logout
	// 				</a>
	// 			</div>
	// 		) : (
	// 			<div>
	// 				{/* The navbar will show these links before you log in */}
	// 				<Link to="/login">Login</Link>
	// 				<Link to="/signup">Sign Up</Link>
	// 			</div>
	// 		)}
	// 	</nav>
	// 	<hr />
	// </div>
	<div className="navbar">
		{auth.isAuthenticated ? (
			<CDBSidebar backgroundColor="#ffff" textColor="#C8AD55">
				<CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
					<a
						href="/"
						className="text-decoration-none"
						style={{ color: 'inherit' }}
					>
						<img src={logo} />
						cha-ching
					</a>
				</CDBSidebarHeader>

				<CDBSidebarContent className="sidebar-content">
					<CDBSidebarMenu>
						<NavLink exact to="/dashboard" activeClassName="activeClicked">
							<CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
						</NavLink>
						<NavLink exact to="/transactions" activeClassName="activeClicked">
							<CDBSidebarMenuItem icon="table">Transactions</CDBSidebarMenuItem>
						</NavLink>
						<NavLink
							exact
							to="/"
							activeClassName="activeClicked"
							onClick={handleClick}
						>
							<CDBSidebarMenuItem icon="chart-line">Logout</CDBSidebarMenuItem>
						</NavLink>
					</CDBSidebarMenu>
				</CDBSidebarContent>

				<CDBSidebarFooter style={{ textAlign: 'center' }}>
					<div
						style={{
							padding: '20px 5px',
						}}
					>
						Sidebar Footer
					</div>
				</CDBSidebarFooter>
			</CDBSidebar>
		) : (
			<CDBSidebar backgroundColor="#ffff" textColor="#C8AD55">
				<CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
					<a
						href="/"
						className="text-decoration-none"
						style={{ color: 'inherit' }}
					>
						<img src={logo} />
						cha-ching
					</a>
				</CDBSidebarHeader>

				<CDBSidebarContent className="sidebar-content">
					<CDBSidebarMenu>
						<NavLink exact to="/login" activeClassName="activeClicked">
							<CDBSidebarMenuItem icon="columns">Login</CDBSidebarMenuItem>
						</NavLink>
						<NavLink exact to="/signup" activeClassName="activeClicked">
							<CDBSidebarMenuItem icon="table">Sign Up</CDBSidebarMenuItem>
						</NavLink>
					</CDBSidebarMenu>
				</CDBSidebarContent>

				<CDBSidebarFooter style={{ textAlign: 'center' }}>
					<div
						style={{
							padding: '20px 5px',
						}}
					>
						Ⓒ cha-ching
					</div>
				</CDBSidebarFooter>
			</CDBSidebar>
		)}
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

export default connect(mapState, mapDispatch)(Navbar);
