import React, { useEffect, Component } from 'react';
import { PlaidLink } from 'react-plaid-link';
import axios from 'axios';
import { connect } from 'react-redux';
import { getAccounts } from '../store/plaid';

class Link extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: null,
			access_token: null,
		};
		this.createLinkToken = this.createLinkToken.bind(this);
		this.getAccessToken = this.getAccessToken.bind(this);
		this.onExit = this.onExit.bind(this);
		this.onEvent = this.onEvent.bind(this);
		this.onSuccess = this.onSuccess.bind(this);
	}
	onExit(error, metadata) {
		return console.log('onExit', error, metadata);
	}

	onEvent(eventName, metadata) {
		console.log('onEvent', eventName, metadata);
		if (eventName === 'HANDOFF') {
			this.props.getAccounts(this.props.auth.user)
		}
	}

	onSuccess(token, metadata) {
		console.log('onSuccess', token, metadata);
		this.getAccessToken(token, metadata);
		
	}

	createLinkToken = async () => {
		const res = await axios.post(
			`http://localhost:8080/api/plaid/create_link_token/${this.props.auth.user.id}`
		);
		const data = res.data.link_token;
		this.setState({ token: data.link_token });
	};

	componentDidMount() {
		this.createLinkToken();
	}

	getAccessToken = async (publicToken, metadata) => {
		//sends the public token to the app server
		const res = await axios.post(
			`http://localhost:8080/api/plaid/accounts/add/${this.props.auth.user.id}`,
			{
				publicToken: publicToken,
				metadata: metadata,
			}
		);
		const data = res.data.access_token;
		//updates state with permanent access token
		this.setState({ access_token: data });
	};

	render() {
		const { id } = this.props.auth;
		return (
			<div>
				<PlaidLink
					className="CustomButton"
					style={{ padding: '20px', fontSize: '16px', cursor: 'pointer' }}
					token={this.state.token ? this.state.token : ''}
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
	};
};

const mapDispatch = (dispatch) => {
	return {
		getAccounts: (userData) => dispatch(getAccounts(userData)),
	};
};

export default connect(mapState, mapDispatch)(Link);
