import React, { Component } from 'react';
import axios from 'axios';
import '../../App.css';
import { Button, Container, ButtonGroup, ButtonToolbar, Card } from 'react-bootstrap';
import 'mdbreact/dist/css/mdb.css';
import { MDBProgress } from 'mdbreact';
import AddCommentsReviewer from '../pages/AddCommentsReviewer';
import { Dropdown } from 'react-bootstrap';
import { blue200 } from 'material-ui/styles/colors';
import trans from '../translations/getReviewerTranslation';
import swal from 'sweetalert';
const mongoose = require('mongoose');
var $ = require('jquery')(window);

class Companies extends Component {
	state = {
		companies: [],
		modalShow: false
	};
	componentDidMount() {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
		axios
			.get('/routes/api/userDynamicForms/getReviewerInProgressCases', {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				if (Array.isArray(res.data.data) && res.data.data.length > 0) {
					this.setState({ companies: res.data.data });
				} else {
					swal('You do not have any In Progress Cases yet!');
				}
			});
	}
	accept = (formId) => {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios
			.put('/routes/api/userDynamicForms/accept/' + mongoose.Types.ObjectId(formId), {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((response) => {
				console.log('hello');
				swal('Accepted');
				setTimeout("document.location.href = '/GetReviewer';", 3500);
			})
			.catch((err) => {
				swal(err.response.data.msg || err.response.data);

				console.log(err.response);
			});
	};

	reject = (formId) => {
		console.log('hi');
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios
			.put('/routes/api/userDynamicForms/reject/' + mongoose.Types.ObjectId(formId), {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				console.log('Reject');
				swal('rejected');
				setTimeout("document.location.href = '/GetReviewer';", 3500);
			});
	};

	sort = () => {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios
			.get('/routes/api/userDynamicForms/SpecificFormSortedByFormId', {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				this.setState({ companies: res.data.data });
				swal('Cases have been sorted');
				setTimeout("document.location.href = '/GetReviewer';", 3500);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	sortByCreationDate = () => {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios
			.get('/routes/api/userDynamicForms/SpecificformsSortedByformDate', {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				this.setState({ companies: res.data.data });
				swal('Cases have been sorted');
				setTimeout("document.location.href = '/GetReviewer';", 3500);
			})
			.catch((err) => alert(err.response.data.errmsg || err.response.data));
	};
	getAttributes = () => {
		let modalClose = () => this.setState({ modalShow: false });
		return this.state.companies.map((Form, index) => {
			var KEYS = [];
			// console.log(Form)
			for (var key in Form) {
				KEYS.push(key);
			}
			return (
				<Card>
					<Card.Body>
						<div>
							{KEYS.map((key, index) => {
								if (
									key !== '_proto' &&
									key !== '_id' &&
									key !== 'formType' &&
									key !== 'investorId' &&
									key !== 'lawyerId' &&
									key !== 'reviewerId' &&
									key !== '__v'
								) {
									var constraints = Form[key];
									if (Array.isArray(constraints)) {
										if (!constraints['0']) return;
										var keys = [];
										for (var att in constraints['0']) {
											keys.push(att);
										}

										if (key === 'lawyerComments') {
											return (
												<div>
													{' '}
													<h3>
														<i class="fas fa-circle" />
														LawyerComments
													</h3>
													{keys.map((att, index) => {
														return (
															<h5 style={{ paddingLeft: '5%' }}>
																<span style={{ textAlign: 'center' }} />{' '}
																<span style={{ color: '#9ad1e7' }}>{constraints[att]}</span>{' '}
															</h5>
														);
													})}
												</div>
											);
										} else if (key === 'reviewerComments') {
											return (
												<div>
													{' '}
													<h3>
														<i class="fas fa-circle" />
														ReviewerComments
													</h3>
													{keys.map((att, index) => {
														return (
															<h5 style={{ paddingLeft: '5%' }}>
																<span style={{ textAlign: 'center' }} />{' '}
																<span style={{ color: '#9ad1e7' }}>{constraints[att]}</span>{' '}
															</h5>
														);
													})}
												</div>
											);
										} else {
											return (
												<div>
													{' '}
													<h3>
														<i class="fas fa-circle" style={{ fontSize: '0.5em' }} />
														{key}
													</h3>
													{keys.map((att, index) => {
														return (
															<h5 style={{ paddingLeft: '5%' }}>
																<i class="fas fa-cicle" /> {att} :
																<span style={{ textAlign: 'center' }} />{' '}
																<span style={{ color: '#9ad1e7' }}>
																	{constraints['0'][att]}
																</span>{' '}
															</h5>
														);
													})}
												</div>
											);
										}
									}

									return (
										<div>
											<div key={key}>
												<h3>
													<i class="fas fa-circle" style={{ fontSize: '0.5em' }} /> {key} :{' '}
													<span style={{ textAlign: 'center' }} />{' '}
													<span style={{ color: '#9ad1e7' }}>{constraints}</span>{' '}
												</h3>
											</div>
										</div>
									);
								}
							})}
							<div variant="omar" style={{ textAlign: 'right', color: blue200 }}>
								<ButtonGroup variant="omar" size="sm" className="mt-3" style={{ color: blue200 }}>
									<Button
										variant="omar"
										style={{ width: '120px', height: '65px', backgroundColor: '#a3dbf1' }}
										onClick={() => (
											this.accept(Form._id),
											swal('The form was accepted succesfully'),
											setTimeout("document.location.href = '/GetReviewer';", 3500)
										)}
									>
										<h6>
											<i class="fas fa-handshake" style={{ fontSize: '1em' }} />
											<br />
											{trans.accept}
										</h6>
									</Button>
									<Button
										variant="omar"
										style={{ width: '120px', height: '65px', backgroundColor: '#a3dbf1' }}
										onClick={() => (
											this.reject(Form._id),
											swal('Form rejected Succesfully'),
											(document.location.href = '/GetReviewer')
										)}
									>
										<h6>
											<i class="fas fa-ban" style={{ fontSize: '1em' }} />
											<br /> {trans.reject}
										</h6>
									</Button>
									<ButtonToolbar>
										<Button
											variant="omar"
											style={{ width: '120px', height: '65px', backgroundColor: '#a3dbf1' }}
											onClick={() => this.setState({ modalShow: true })}
										>
											<h6>
												<i class="fas fa-comment" style={{ fontSize: '1em' }} />
												<br />
												{trans.comments}
											</h6>
										</Button>
										<AddCommentsReviewer
											show={this.state.modalShow}
											onHide={modalClose}
											formId={Form._id}
										/>
									</ButtonToolbar>
									<br />
								</ButtonGroup>
								<div>
									<MDBProgress material value={75} color="dark" height="63px">
										<h3 style={{ color: '#64b9e0', fontSize: '30px' }}>
											{' '}
											{trans.reviewerP} <br /> 75%{' '}
										</h3>
									</MDBProgress>
								</div>
							</div>
						</div>
					</Card.Body>
				</Card>
			);
		});
	};

	render() {
		trans.setLanguage(this.props.lang);
		return (
			<div>
				<div>
					<div
						style={{
							backgroundColor: '#a3dbf1',
							paddingTop: '70px',
							textAlign: 'center',
							fontSize: '50px',
							color: 'dark',
							flexDirection: 'row',
							justifyContent: 'flex-end',
							height: '205px'
						}}
					>
						{trans.title}
						<br />
						<Dropdown>
							<Dropdown.Toggle
								//className="btn blue-gradient btn-block btn-rounded z-depth-1a"
								variant="omar"
								id="dropdown-basic"
								style={{ width: '150px', left: '0', padding: '0.5px' }}
							>
								{trans.sortB}
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item onClick={() => this.sort()} style={{ textAlign: 'left' }}>
									{trans.id}
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() => this.sortByCreationDate()}
									style={{ textAlign: 'center' }}
								>
									{trans.date}
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				</div>

				{this.getAttributes()}
			</div>
		);
	}
}
export default Companies;
