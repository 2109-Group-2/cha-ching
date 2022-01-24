import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import happy from '../../img/happy.gif'

class Landing extends Component {
	componentDidMount() {
		// If logged in, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	render() {
		return (
			<div className="landing">
				<div className="container valign-wrapper landing-wrapper">
					<div className="col-s6">
						<h1 className="">Stay on top of your finances like a boss.</h1>
            <div className='landingButtons'>
              <Link
							to="/signup"
							className="btn btn-large waves-effect waves-light btn-get-started"
						>
							Get Started
						</Link>

						<Link
							to="/login"
							className="btn btn-large waves-effect waves-light btn-get-started"
						>
							Log In
						</Link>
            </div>

						
					</div>
				</div>
			</div>
		);
	}
}

Landing.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
