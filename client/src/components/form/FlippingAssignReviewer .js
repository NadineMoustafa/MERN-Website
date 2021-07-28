import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Mongoose from 'mongoose';
import axios from 'axios';
import 'mdbreact/dist/css/mdb.css';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
class FlippingAssignReviewer extends Component {
	AssignReviewer = (formId) => {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios.put('/routes/api/userDynamicForms/takingForm/' + Mongoose.Types.ObjectId(formId), {
			headers: { Authorization: localStorage.getItem('jwtToken') }
		});
	};
	render() {
		return (
			<Flippy
				flipOnHover={false}
				flipOnClick={true}
				flipDirection="horizontal"
				ref={(r) => (this.flippy = r)}
				style={{ width: '100%', height: '425px' }}
			>
				<FrontSide
					style={{
						borderStyle: 'solid',
						borderWidth: '5px',
						backgroundSize: '464px 400px'
					}}
				>
					<div
						style={{
							textAlign: 'center',
							fontSize: '50px',
							textShadow: '-2px 0 white, 0 2px white, 2px 0 white, 0 -2px white'
						}}
					>
						<h1
							style={{
								textShadow: '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white',
								fontSize: '100px'
							}}
						>
							{this.props.assignToReviewer.companyName}{' '}
						</h1>
						<br />
						<i
							class="fas fa-angle-double-left"
							title="click to view details"
							style={{ paddingRight: '650px' }}
						/>
						<i
							class="fas fa-angle-double-right"
							title="click to view details"
							style={{ paddingLeft: '650px' }}
						/>
						<br />
						<Button
							type="button"
							variant="ali"
							onClick={() => (
								this.AssignReviewer(this.props.assignToReviewer._id),
								alert('This Case is assigned to YOU!!')
							)}
							class="btn btn-info"
						>
							<h6 style={{ color: '#64b9e0' }}>Pick Case</h6>
						</Button>
					</div>
				</FrontSide>
				<BackSide
					style={{
						backgroundColor: '#f7f7f7',
						borderStyle: 'solid',
						borderWidth: '5px',
						paddingLeft: '60px'
					}}
				>
					<h3>
						<i class="fas fa-circle" style={{ fontSize: '15px' }} /> Name In English :<span style={{ textAlign: 'center' }} />{' '}
						<span style={{ color: '#2e5a7c' }}>
							{this.props.assignToReviewer.companyNameInEnglish}
						</span>{' '}
					</h3>
					<h5>
						<i class="fas fa-circle" style={{ fontSize: '15px' }} /> Governorate :<span style={{ textAlign: 'center' }} />{' '}
						<span style={{ color: '#9ad1e7' }}>{this.props.assignToReviewer.companyGovernorate}</span>{' '}
					</h5>
					<h5>
						<i class="fas fa-circle" style={{ fontSize: '15px' }} /> City :<span style={{ textAlign: 'center' }} />{' '}
						<span style={{ color: '#9ad1e7' }}>{this.props.assignToReviewer.companyCity}</span>{' '}
					</h5>
					<h5>
						<i class="fas fa-circle" style={{ fontSize: '15px' }} /> Address :<span style={{ textAlign: 'center' }} />{' '}
						<span style={{ color: '#9ad1e7' }}>{this.props.assignToReviewer.companyAddress}</span>{' '}
					</h5>
					<h5>
						<i class="fas fa-circle" style={{ fontSize: '15px' }} /> Telephone :<span style={{ textAlign: 'center' }} />{' '}
						<span style={{ color: '#9ad1e7' }}>{this.props.assignToReviewer.companyTelephone}</span>{' '}
					</h5>
					<h5>
						<i class="fas fa-circle" style={{ fontSize: '15px' }} /> Fax :<span style={{ textAlign: 'center' }} />{' '}
						<span style={{ color: '#9ad1e7' }}>{this.props.assignToReviewer.companyFax}</span>{' '}
					</h5>
					<h5>
						<i class="fas fa-circle" style={{ fontSize: '15px' }} /> Currency :<span style={{ textAlign: 'center' }} />{' '}
						<span style={{ color: '#9ad1e7' }}>{this.props.assignToReviewer.currency}</span>{' '}
					</h5>
					<h5>
						<i class="fas fa-circle" style={{ fontSize: '15px' }} /> Equity Capital :<span style={{ textAlign: 'center' }} />{' '}
						<span style={{ color: '#9ad1e7' }}>{this.props.assignToReviewer.equityCapital}</span>{' '}
					</h5>
					<h5>
						<i class="fas fa-circle" style={{ fontSize: '15px' }} /> Type :<span style={{ textAlign: 'center' }} />{' '}
						<span style={{ color: '#9ad1e7' }}>{this.props.assignToReviewer.type}</span>{' '}
					</h5>
					<h5>
						<i class="fas fa-circle" style={{ fontSize: '15px' }} /> Creation Date :<span style={{ textAlign: 'center' }} />{' '}
						<span style={{ color: '#9ad1e7' }}>{this.props.assignToReviewer.creationDate}</span>{' '}
					</h5>
				</BackSide>
			</Flippy>
		);
	}
}
export default FlippingAssignReviewer;
