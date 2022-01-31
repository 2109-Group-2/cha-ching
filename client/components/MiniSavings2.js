import React, { Component } from 'react';
import {
	Card,
	CardGroup,
	Row,
	Col,
	OverlayTrigger,
	Tooltip,
	Button,
} from 'react-bootstrap';
import { fetchGoals } from '../store/savingGoals';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class MiniSavings extends Component {
	componentDidMount() {
		this.props.getAllGoals(this.props.auth.user.id);
	}
	render() {
		let goal = this.props.goal;
		goal = goal.slice(0, 1);
		// console.log('goals from inside the mini cropped ', goal);

		return (
			<>
				<OverlayTrigger
					overlay={
						<Tooltip id={`tooltip-right`}>
							<h6>Click to view all goals</h6>
						</Tooltip>
					}
				>
					<Link to="/savings">
						<Row xs={1} md={2} className="g-4">
							{goal.length ? (
								goal.map((singleGoal) => (
									<Col>
										<Card className="accountsComponent">
											<Card.Title>
												<h2>Current Goal</h2>
											</Card.Title>
											<Card.Img
												variant="top"
												src={`/images/${singleGoal.image}`}
												className="savingsMiniImg"
											/>
											<Card.Body>
												<Card.Title>{singleGoal.title}</Card.Title>
												<Card.Text>
													You need a total of $
													{(
														singleGoal.goalTarget - singleGoal.currentBalance
													).toLocaleString()}{' '}
													to complete this goal
												</Card.Text>
												<Button>
													<Link to="/savings">See All Goals</Link>
												</Button>
											</Card.Body>
										</Card>
									</Col>
								))
							) : (
								<Col>
									<Card className="accountsComponent">
										<Card.Title>
											<h2>Current Goal</h2>
										</Card.Title>
										<Card.Img
											variant="top"
											src={`/images/cha-ching.png`}
											className="savingsMiniImg"
										/>
										<Card.Body>
											<Card.Text></Card.Text>
											<Card.Text>There are no goals to display</Card.Text>

											<Card.Text></Card.Text>
											<Button>
												<Link to="/savings">Create a Goal</Link>
											</Button>
										</Card.Body>
									</Card>
								</Col>
							)}
						</Row>
					</Link>
				</OverlayTrigger>
			</>
		);
	}
}

const mapState = (state) => ({
	auth: state.auth,
	goal: state.goal,
});

const mapDispatch = (dispatch) => ({
	getAllGoals: (id) => dispatch(fetchGoals(id)),
});

export default connect(mapState, mapDispatch)(MiniSavings);
