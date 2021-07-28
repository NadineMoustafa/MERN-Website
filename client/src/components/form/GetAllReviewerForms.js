import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';
import GetCaseReviewer from '../pages/GetCaseReviewer';
import AddCommentsReviewer from '../pages/AddCommentsReviewer';
const mongoose = require('mongoose');

class GetAllReviewerForms extends Component {
	constructor(props) {
		super(props);
		this.state = { modalShow: false };
	}

	getStyle = () => {
		return {
			background: '#050b0f',
			color: '#4B0082',
			padding: '10px',
			borderBottom: '1px #ccc dotted',
			textDecoration: 'none'
		};
	};

	accept = (formId) => {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
		axios.put('/routes/api/users/accept/' + mongoose.Types.ObjectId(formId), {
			headers: { Authorization: localStorage.getItem('jwtToken') }
		});
	};

	reject = (formId) => {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
		axios.put('/routes/api/users/reject/' + mongoose.Types.ObjectId(formId), {
			headers: { Authorization: localStorage.getItem('jwtToken') }
		});
	};

	render() {
		let modalClose = () => this.setState({ modalShow: false });
		return (
			<tr>
				<td>{this.props.company.companyName} </td>
				<td>{this.props.company.companyNameInEnglish} </td>
				<td>{this.props.company.companyGovernorate} </td>
				<td>{this.props.company.companyCity} </td>
				<td>{this.props.company.companyAddress} </td>
				<td>{this.props.company.companyTelephone} </td>
				<td>{this.props.company.companyFax} </td>
				<td>{this.props.company.currency} </td>
				<td>{this.props.company.equityCapital}</td>
				<td>{this.props.company.type}</td>
				<td>{this.props.company.creationDate}</td>
				<td>
					<Button variant="dark" block onClick={() => this.accept(this.props.company._id)}>
						<h3>ACCEPT CASE</h3>
					</Button>
				</td>
				<td>
					<Button variant="dark" block onClick={() => this.reject(this.props.company._id)}>
						<h3>REJECT CASE</h3>
					</Button>
				</td>
				<td>
					<ButtonToolbar>
						<Button variant="dark" block onClick={() => this.setState({ modalShow: true })}>
							Add Comments
						</Button>
						<AddCommentsReviewer
							show={this.state.modalShow}
							onHide={modalClose}
							formId={this.props.company._id}
						/>
					</ButtonToolbar>
				</td>
			</tr>
		);
	}
}
export default GetAllReviewerForms;
