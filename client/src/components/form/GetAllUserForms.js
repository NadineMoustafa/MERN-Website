// import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
// import { ButtonToolbar } from 'react-bootstrap';
// import axios from 'axios';
// //import GetCaseSpecified from '../pages/GetCaseSpecified';
// import AddCommentsLawyer from '../pages/AddCommentsLawyer';
// import { Link } from 'react-router-dom';
// const mongoose = require('mongoose');

// class GetAllUserForms extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = { modalShow: false };
// 	}

// 	getStyle = () => {
// 		return {
// 			background: '#050b0f',
// 			color: '#4B0082',
// 			padding: '10px',
// 			borderBottom: '1px #ccc dotted',
// 			textDecoration: 'none'
// 		};
// 	};

// 	accept = (formId) => {
// 		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
// 		axios.put('/routes/api/users/accept/' + mongoose.Types.ObjectId(formId), {
// 			headers: { Authorization: localStorage.getItem('jwtToken') }
// 		});
// 	};

// 	addComment = (formId) => {
// 		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
// 		axios.put('/routes/api/users/lawyerComments/' + mongoose.Types.ObjectId(formId), {
// 			headers: { Authorization: localStorage.getItem('jwtToken') }
// 		});
// 	};

// 	calculateFees = (formId) => {
// 		console.log('hi');
// 		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
// 		axios.put('/routes/api/users/CalculatingFees/' + mongoose.Types.ObjectId(formId), {
// 			headers: { Authorization: localStorage.getItem('jwtToken') }
// 		});
// 	};

// 	render() {
// 		let modalClose = () => this.setState({ modalShow: false });
// 		return (
// 			<tr>
// 				<td>{this.props.company.companyName} </td>
// 				<td>{this.props.company.companyNameInEnglish} </td>
// 				<td>{this.props.company.companyGovernorate} </td>
// 				<td>{this.props.company.companyCity} </td>
// 				<td>{this.props.company.companyAddress} </td>
// 				<td>{this.props.company.companyTelephone} </td>
// 				<td>{this.props.company.companyFax} </td>
// 				<td>{this.props.company.currency} </td>
// 				<td>{this.props.company.equityCapital}</td>
// 				<td>{this.props.company.type}</td>
// 				<td>{this.props.company.creationDate}</td>
// 				<td>{this.props.company.fees}</td>
// 				<td>
// 					<Button variant="dark" block onClick={() => this.accept(this.props.company._id)}>
// 						<h3>ACCEPT CASE</h3>
// 					</Button>
// 				</td>
// 				<td>
// 					<ButtonToolbar>
// 						<Button variant="dark" block onClick={() => this.setState({ modalShow: true })}>
// 							Add Comments
// 						</Button>
// 						<AddCommentsLawyer
// 							show={this.state.modalShow}
// 							onHide={modalClose}
// 							formId={this.props.company._id}
// 						/>
// 					</ButtonToolbar>
// 				</td>
// 				<td>
// 					<Button variant="dark" block onClick={() => this.calculateFees(this.props.company._id)}>
// 						Calculate The Fees
// 					</Button>
// 				</td>
// 			</tr>
// 		);
// 	}
// }
// export default GetAllUserForms;
