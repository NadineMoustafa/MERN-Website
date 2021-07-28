import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import trans from '../components/translations/forgotPasswordTranslation'
import {
	LinkButtons,
	SubmitButtons,
	registerButton,
	homeButton,
	forgotButton,
	inputStyle,
	HeaderBar
} from '../containers';
import { MDBInput } from 'mdbreact';
import { blue200 } from 'material-ui/styles/colors';

const title = {
	pageTitle: 'Forgot Password Screen'
};

class ForgotPassword extends Component {
	constructor() {
		super();

		this.state = {
			email: '',
			showError: false,
			messageFromServer: '',
			showNullError: false
		};
	}

	handleChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		});
	};

	sendEmail = (e) => {
		e.preventDefault();
		const { email } = this.state;
		if (email === '') {
			this.setState({
				showError: false,
				messageFromServer: '',
				showNullError: true
			});
		} else {
			axios
				.post('/routes/api/users/forgotPassword', {
					email
				})
				.then((response) => {
					console.log(response.data);
					if (response.data === 'recovery email sent') {
						this.setState({
							showError: false,
							messageFromServer: 'recovery email sent',
							showNullError: false
						});
					}
				})
				.catch((error) => {
					if (error.response.data === 'email not in db') {
						this.setState({
							showError: true,
							messageFromServer: '',
							showNullError: false
						});
					}
					alert(error.response.data.errmsg || error.response.data);
				});
		}
	};

	render() {
		trans.setLanguage(this.props.lang);
		const { email, messageFromServer, showNullError, showError } = this.state;

		return (
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
							height:"155px"
            }}
          >
				{trans.title}
            	<br />
				<form className="profile-form" onClick={this.sendEmail}>
					<MDBInput
						style={{ width: '500px' ,right:"100%"}}
						id="email"
						label={trans.email}
						value={email}
						onChange={this.handleChange('email')}
						placeholder={trans.emailPlace}
					/>
					<Button
						// buttonStyle={forgotButton}
						className="btn-block btn-rounded z-depth-1a"
						variant="omar"
						style={{marginTop:"50px",marginLeft: "50px",marginRight:"2500px",width:"270px", height:"40px" ,backgroundColor:"#a3dbf1"}}
					>
					{trans.send}
					</Button>
					<br/>
				</form>
				{showNullError && (
					<div style={{marginRight:"1170px",color:blue200}}>
						
						<h4>{trans.valid}</h4>
					</div>
				)}
				{showError && (
					<div style={{marginRight:"1170px",color:blue200}}>
						<h4>{trans.valid2}</h4>
						<LinkButtons buttonText="Register" buttonStyle={registerButton} link="/register" />
					</div>
				)}
				{messageFromServer === 'recovery email sent' && (
					<div style={{marginRight:"1170px",color:blue200}}>
						<h4>{trans.valid3}</h4>
					</div>
				)}
				<br />
			</div>
			</div>
		);
	}
}

export default ForgotPassword;
