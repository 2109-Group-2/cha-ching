import React, { useEffect, Component } from 'react';
import { PlaidLink } from 'react-plaid-link';
import { connect } from 'react-redux';
import { getAccounts, setLinkToken, setAccessToken } from '../store/plaid';

class Link extends Component {
	constructor(props) {
		super(props);

		this.onExit = this.onExit.bind(this);
		this.onEvent = this.onEvent.bind(this);
		this.onSuccess = this.onSuccess.bind(this);
	}
	onExit(error, metadata) {
		return console.log('onExit', error, metadata);
	}

	onEvent(eventName, metadata) {
		console.log('onEvent metadata eentname', metadata.link_session_id);
		if (eventName === 'HANDOFF') {
			this.props.getAccounts(this.props.auth.user)
		}
	}

	onSuccess(token, metadata) {
		console.log('onSuccess', token, metadata);

		this.props.setAccessToken(token, metadata, this.props.auth.user.id);


	}

	componentDidMount() {
		this.props.setLinkToken(this.props.auth.user.id);
	}

	render() {
		const { id } = this.props.plaid;

		return (
			<div>
				<PlaidLink
					className="CustomButton"
					style={{ padding: '20px', fontSize: '16px', cursor: 'pointer' }}
					token={this.props.plaid.token ? this.props.plaid.token : ''}
					onExit={this.onExit}
					onSuccess={this.onSuccess}
					onEvent={this.onEvent}
				>
					Connect an Account!
				</PlaidLink>
			</div>
		);
	}
}

const mapState = (state) => {
	return {
		auth: state.auth,
		orders: state.orders,
		plaid: state.plaid,
	};
};

const mapDispatch = (dispatch) => {
	return {
		getAccounts: (userData) => dispatch(getAccounts(userData)),
		setLinkToken: (userId) => dispatch(setLinkToken(userId)),
		setAccessToken: (publicToken, metadata, userId) => dispatch(setAccessToken(publicToken, metadata, userId))
	};
};

export default connect(mapState, mapDispatch)(Link);