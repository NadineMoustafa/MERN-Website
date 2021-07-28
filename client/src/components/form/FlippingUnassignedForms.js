import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import 'mdbreact/dist/css/mdb.css';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
const mongoose = require('mongoose');
class FlippingUnassignedForms extends Component {
	AssignCase = (formId) => {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios
			.put('/routes/api/userDynamicForms/takingForm/' + mongoose.Types.ObjectId(formId), {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => console.log(res))
			.catch((err) => alert(err.response.data.errmsg || err.response.data));
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
							fontSize: '70px',
							textShadow: '-2px 0 white, 0 2px white, 2px 0 white, 0 -2px white'
						}}
					>
						<h1
							style={{
								textShadow: '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white',
								fontSize: '60px'
							}}
						>
							{this.props.unassigned.companyName}{' '}
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
							onClick={() => (this.AssignCase(Form._id), alert('This Case is assigned to YOU!!'))}
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
					<h2>
						<i class="fas fa-circle" style={{ fontSize: '15px' }} />Name In English :<span style={{ textAlign: 'center' }} />{' '}
						<span style={{ color: '#9ad1e7' }}>{this.props.unassigned.companyNameInEnglish}</span>{' '}
					</h2>
					<h4>
						<i class="fas fa-circle" style={{ fontSize: '15px' }} />Governorate :<span style={{ textAlign: 'center' }} />{' '}
						<span style={{ color: '#9ad1e7' }}>{this.props.unassigned.companyGovernorate}</span>{' '}
					</h4>
					<h4>
						<i class="fas fa-circle" style={{ fontSize: '15px' }} />City :<span style={{ textAlign: 'center' }} />{' '}
						<span style={{ color: '#9ad1e7' }}>{this.props.unassigned.companyCity}</span>{' '}
					</h4>
					<h4>
						<i class="fas fa-circle" style={{ fontSize: '15px' }} /> Address :<span style={{ textAlign: 'center' }} />{' '}
						<span style={{ color: '#9ad1e7' }}>{this.props.unassigned.companyAddress}</span>{' '}
					</h4>
					<h4>
						<i class="fas fa-circle" style={{ fontSize: '15px' }} /> Telephone :<span style={{ textAlign: 'center' }} />{' '}
						<span style={{ color: '#9ad1e7' }}>{this.props.unassigned.companyTelephone}</span>{' '}
					</h4>
					<h4>
						<i class="fas fa-circle" style={{ fontSize: '15px' }} /> Fax :<span style={{ textAlign: 'center' }} />{' '}
						<span style={{ color: '#9ad1e7' }}>{this.props.unassigned.companyFax}</span>{' '}
					</h4>
					<h4>
						<i class="fas fa-circle" style={{ fontSize: '15px' }} /> Currency :<span style={{ textAlign: 'center' }} />{' '}
						<span style={{ color: '#9ad1e7' }}>{this.props.unassigned.currency}</span>{' '}
					</h4>
					<h4>
						<i class="fas fa-circle" style={{ fontSize: '15px' }} /> Equity Capital :<span style={{ textAlign: 'center' }} />{' '}
						<span style={{ color: '#9ad1e7' }}>{this.props.unassigned.equityCapital}</span>{' '}
					</h4>
					<h4>
						<i class="fas fa-circle" style={{ fontSize: '15px' }} />Type :<span style={{ textAlign: 'center' }} />{' '}
						<span style={{ color: '#9ad1e7' }}>{this.props.unassigned.type}</span>{' '}
					</h4>
					<h4>
						<i class="fas fa-circle" style={{ fontSize: '15px' }} />creation Date :<span style={{ textAlign: 'center' }} />{' '}
						<span style={{ color: '#9ad1e7' }}>{this.props.unassigned.creationDate}</span>{' '}
					</h4>
				</BackSide>
			</Flippy>
		);
	}
}
export default FlippingUnassignedForms;
