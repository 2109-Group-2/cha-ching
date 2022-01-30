import React, { Component } from 'react';
import {
	Carousel,
	Card,
	CardGroup,
	Row,
	Col,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap';
import { fetchGoals } from '../store/savingGoals';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class MiniSavings extends Component {
	componentDidMount() {
		this.props.getAllGoals(this.props.auth.user.id);
	}
	render() {
		let goals = this.props.goal;
		goals = goals.slice(0, 2);
		console.log('goals from inside the mini cropped ', goals);

		//console.log('the value of goal from mini savings ', goals[0].title);
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
						<Card className="accountsComponent" style={{backgroundColor: 'white'}}>
							<Row xs={1} md={2} className="g-4">
								{goals.map((goal) => {
									return (
										<Col>
											<Card className="miniSavingsCard">
												<Card.Header>
													<h3>{goal.title}</h3>
												</Card.Header>
												<Card.Img variant="top" 	src={`/images/${goal.image}`} /*className='savingsMiniImg'*/
                         style={{height: '1px'}, {width: '1px'}, {marginLeft: 'auto'},{marginRight: 'auto'}} />
												<Card.Body>
													<Card.Text>
														your current balance: {goal.currentBalance}
													</Card.Text>
													<Card.Text>
														your goal target: {goal.goalTarget}
													</Card.Text>
													<Card.Text>
														you still have a total of{' '}
														{goal.goalTarget - goal.currentBalance} left to
														complete this goal
													</Card.Text>
												</Card.Body>
												<Card.Footer>{goal.category}</Card.Footer>
											</Card>
										</Col>
									);
								})}
							</Row>
						</Card>
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
