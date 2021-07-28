import React, { Component } from 'react';
import axios from 'axios';
import '../../App.css';
import { Button, Container, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import 'mdbreact/dist/css/mdb.css';
import AddCommentsLawyer from './AddCommentsLawyer';
import Cardd from '../form/Card';
import { Dropdown, Card } from 'react-bootstrap';
import { MDBProgress } from 'mdbreact';
import { blue200 } from 'material-ui/styles/colors';
import trans from '../translations/getCaseLawyerTranslation';
import swal from 'sweetalert';
const mongoose = require('mongoose');
var $ = require('jquery')(window);

class Companies extends Component {
	state = {
		companies: [],
		modalShow: false
	};
	redirectEdit(formId, formType) {
		console.log(formType);
		localStorage.setItem('formId', formId);
		localStorage.setItem('formType', formType);
		document.location.href = '/EditLawyerCompany';
	}
	componentDidMount() {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
		axios
			.get('/routes/api/userDynamicForms/getLawyerInProgressCases', {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				if (Array.isArray(res.data.data) && res.data.data.length > 0) {
					this.setState({ companies: res.data.data });
				} else {
					swal('You do not have any In Progress Cases yet!');
				}
				console.log(this.state.companies);
			})
			.catch((err) => {
				swal('' + err);
			});
	}

	sort = () => {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios
			.get('/routes/api/userDynamicForms/SpecificFormSortedByFormId', {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				this.setState({ companies: res.data.data });

				// const r = swal.confirm("cases have been sorted?");
				// if(r == true){

				// 	document.location.href = '/getCaseLawyer';
				//  }

				swal('Cases have been sorted');
				setTimeout("document.location.href = '/getCaseLawyer';", 3500);
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
				setTimeout("document.location.href = '/getCaseLawyer';", 3500);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	accept = (formId) => {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios
			.put('/routes/api/userDynamicForms/accept/' + mongoose.Types.ObjectId(formId), {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				swal('The form was accepted succesfully');
				setTimeout("document.location.href = '/getCaseLawyer';", 3500);
			})
			.catch((err) => {
				swal(err.response.data.msg || err.response.data);
				console.log(err.response);
			});
	};

	calculateFees = (formId) => {
		console.log('hi');
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios
			.put('/routes/api/userDynamicForms/calculatingFees/' + mongoose.Types.ObjectId(formId), {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				swal('The fees was calculated succesfully');
				setTimeout("document.location.href = '/getCaseLawyer';", 3500);
			})
			.catch((err) => {
				swal(err.response.data.msg || err.response.data);
				console.log(err.response);
			});
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
									var now = key;
									var temp = '';
									temp = temp + key.charAt(0).toUpperCase();
									for (var j = 1; j < now.length; j++) {
										if (now.charCodeAt(j) >= 65 && now.charCodeAt(j) <= 90) {
											temp = temp + ' ';
											temp = temp + now.charAt(j);
										} else {
											temp = temp + now.charAt(j);
										}
									}
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
														<i class="fas fa-circle" style={{ fontSize: '15px' }} />
														{trans.commentsL}
													</h3>
													{keys.map((att, index) => {
														return (
															<h5 style={{ paddingLeft: '5%', fontSize: '15px' }}>
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
														<i class="fas fa-circle" style={{ fontSize: '15px' }} />
														{trans.commentsR}
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
														<i class="fas fa-circle" />
														{key}
													</h3>
													{keys.map((att, index) => {
														return (
															<h5 style={{ paddingLeft: '5%' }}>
																<i class="fas fa-circle" sstyle={{ fontSize: '0.5em' }} />{' '}
																{att} :
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
									if (key === 'creationDate') {
										var date = constraints.substring(0, 10);
										console.log(date);
										return (
											<div>
												<div key={key}>
													<h3>
														<i class="fas fa-circle" style={{ fontSize: '0.5em' }} /> {temp}{' '}
														:
														<span style={{ textAlign: 'center' }} />{' '}
														<span style={{ color: '#9ad1e7' }}> {date} </span>{' '}
													</h3>
												</div>
											</div>
										);
									} else {
										return (
											<div>
												<div key={key}>
													<h3>
														<i class="fas fa-circle" style={{ fontSize: '0.5em' }} /> {temp}{' '}
														: <span style={{ textAlign: 'center' }} />{' '}
														<span style={{ color: '#9ad1e7' }}>{constraints}</span>{' '}
													</h3>
												</div>
											</div>
										);
									}
								}
							})}
							{/* <MDBProgress  material value={35} color="dark" height="35px">
               <h3> In progress Lawyer </h3>
                </MDBProgress> */}

							<div variant="omar" style={{ textAlign: 'right', color: blue200 }}>
								<ButtonGroup variant="omar" size="sm" className="mt-3" style={{ color: blue200 }}>
									<Button
										variant="omar"
										style={{ width: '120px', height: '65px', backgroundColor: '#a3dbf1' }}
										onClick={() => this.accept(Form._id)}
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
										onClick={() => this.calculateFees(Form._id)}
									>
										<h9>
											<i class="fas fa-money-bill-alt" style={{ fontSize: '1em' }} />
											<br />
											{trans.calculate}
										</h9>
									</Button>
									{Form.status === 'Reviewer rejected' ? (
										<div>
											<Button
												type="button"
												variant="omar"
												style={{ width: '120px', height: '65px', backgroundColor: '#a3dbf1' }}
												onClick={() => this.redirectEdit(Form._id, Form.formType)}
												class="btn btn-info"
											>
												<h3 style={{ fontSize: '15px' }}>
													<i class="fas fa-edit" />
													<br />
													{trans.edit}
													<br />
												</h3>
											</Button>
										</div>
									) : null}
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
										<AddCommentsLawyer
											show={this.state.modalShow}
											onHide={modalClose}
											formId={Form._id}
										/>
									</ButtonToolbar>
								</ButtonGroup>
								<br />
								{Form.status === 'Reviewer rejected' ? (
									<div>
										{/* <Button
												type="button"
												variant="dark"
												onClick={() => this.redirectEdit(Form._id, Form.formType)}
												class="btn btn-info"
											>
												<h3 style={{ color: '#64b9e0', fontSize: '15px' }}>
													{trans.edit}<br />
													<i class="fas fa-edit" />
												</h3>
											</Button>
											<br /> */}
										<MDBProgress material value={60} color="dark" height="63px">
											<h3 style={{ color: '#64b9e0', fontSize: '30px' }}>
												{trans.reviewerR} <br /> 60%
											</h3>
										</MDBProgress>
									</div>
								) : null}

								<div>
									{/* {Form.status === 'Reviewer rejected' ? (
										<div>
											<MDBProgress material value={60} color="dark" height="63px">
												<h3 style={{ color: '#64b9e0', fontSize: '30px' }}>
													{trans.reviewerR} <br /> 60%
												</h3>
											</MDBProgress>
											<br />
											<Button
												type="button"
												variant="dark"
												onClick={() => this.redirectEdit(Form._id, Form.formType)}
												class="btn btn-info"
											>
												<h3 style={{ color: '#64b9e0', fontSize: '15px' }}>
													{trans.edit}<br />
													<i class="fas fa-edit" />
												</h3>
											</Button>
										</div>
									) : null} */}
									{Form.status === 'In progress Lawyer' ? (
										<MDBProgress material value={50} color="dark" height="63px">
											<h3 style={{ color: '#64b9e0', fontSize: '30px' }}>
												{trans.lawyerA} <br />50%{' '}
											</h3>
										</MDBProgress>
									) : null}
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
								<Dropdown.Item
									onClick={() => this.sort()}
									style={{ textAlign: 'left', color: blue200 }}
								>
									{trans.id}
								</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item
									onClick={() => this.sortByCreationDate()}
									style={{ textAlign: 'center', color: blue200 }}
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
