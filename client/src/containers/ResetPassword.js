/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { MDBInput } from 'mdbreact';
import { blue200 } from 'material-ui/styles/colors';
import { red100 } from 'material-ui/styles/colors';
import { blue100 } from 'material-ui/styles/colors';
import berry from '../components/layout/berry.png';
import { Dropdown } from 'react-bootstrap';

import {
	LinkButtons,
	updateButton,
	homeButton,
	loginButton,
	HeaderBar,
	forgotButton,
	inputStyle,
	SubmitButtons
} from '../containers';

const loading = {
	margin: '1em',
	fontSize: '24px'
};

const title = {
	pageTitle: 'Password Reset Screen'
};

export default class ResetPassword extends Component {
	constructor() {
		super();

		this.state = {
			name: '',
			password: '',
			updated: false,
			isLoading: true,
			error: false,
			showNullError: false
		};
	}

	async componentDidMount() {
		// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
		// axios.get('/routes/api/users/SpecificFormSortedByFormId',{headers: { "Authorization": localStorage.getItem('jwtToken') }})
		console.log(this.props.match.params.token);
		await axios
			.get('/routes/api/users/reset/' + this.props.match.params.token)
			.then((response) => {
				console.log(response);
				if (response.data.message === 'password reset link a-ok') {
					this.setState({
						name: response.data.name,
						updated: false,
						isLoading: false,
						error: false
					});
				}
			})
			.catch((error) => {
				alert(error.response.data.errmsg || error.response.data);
				this.setState({
					updated: false,
					isLoading: false,
					error: true
				});
			});
	}

	handleChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		});
	};

	updatePassword = (e) => {
		console.log(this.state.name);
		e.preventDefault();
		if (this.state.password === '') {
			this.setState({
				showNullError: true
			});
		} else {
			this.setState({
				showNullError: false
			});
		axios
			.put('/routes/api/users/updatePasswordViaEmail', {
				name: this.state.name,
				password: this.state.password,
				resetPasswordToken: this.props.match.params.token
			})
			.then((response) => {
				console.log(response.data);
				if (response.data.message === 'password updated') {
					this.setState({
						updated: true,
						error: false
					});
				} else {
					this.setState({
						updated: false,
						error: true
					});
				}
			})
			.catch((err) => alert(err.response.data.errmsg || err.response.data));
	};
}
	render() {
		const { password, error, isLoading, updated,showNullError } = this.state;

		if (error) {
			return (
				
				<div>
					<div>
				<nav
					class="navbar navbar-expand-sm bg-dark navbar-dark"
					style={{
						position: 'fixed',
						padding: '0.5px',
						listStyle: 'none',
						margin: ' 0 auto',
						left: '0',
						top: '0',
						zIndex: '1',
						width: '100%'
					}}
				>
					<img src={berry} width="80" alt="" />
					<ul class="navbar-nav nav-fill w-100">
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fa fa-home"
								href="/"
								title="Home"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fas fa-newspaper"
								href="/journal"
								title="Electronic Journal"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fa fa-info-circle"
								href="/about"
								title="About us"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item dropdown">
							<Dropdown>
								<Dropdown.Toggle title="Language" variant="omar" id="dropdown-basic">
									<i className="fas fa-language" style={{ color: blue100, fontSize: '1.5em' }} />
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item
										onClick={() => this.props.changelang('en')}
										style={{ textAlign: 'left', color: blue200 }}
									>
										{' '}
										English
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item
										onClick={() => this.props.changelang('ar')}
										style={{ textAlign: 'left', color: blue200 }}
									>
										{' '}
										Arabic
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fas fa-sign-in-alt"
								href="/login"
								title="Sign In"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fas fa-user-plus"
								href="/register"
								title="Sign Up"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
					</ul>
				</nav>
				<br />
				<br />
				<br />
			</div>
				<div
				style={{
              				backgroundColor: '#a3dbf1',
							paddingTop: '10px',
							textAlign: 'center',
							fontSize: '50px',
							color: 'dark',
							flexDirection: 'row',
							justifyContent: 'flex-end',
							height:"140px"
            }}
          >
				Reset Password
            	<br />
					<div style={loading}>
						<h4>Problem resetting password. Please send another reset link.</h4>
						<Button
						// buttonStyle={forgotButton}
						className="btn-block btn-rounded z-depth-1a"
						variant="omar"
						href="/forgotPassword"
						style={{marginTop:"50px",marginLeft: "50px",width:"180px", height:"40px" ,backgroundColor:"#a3dbf1"}}
					>
					Forgot Password?
					</Button>
						{/* <LinkButtons buttonStyle={forgotButton} buttonText="Forgot Password?" link="/forgotPassword" /> */}
					</div>
				</div>
				</div>
			);
		}
		if (isLoading) {
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
				Reset Password
            	<br />
					<div style={loading}>Loading User Data...</div>
				</div>
				</div>
			);
		}
		return (
			<div>
				<div>
				<nav
					class="navbar navbar-expand-sm bg-dark navbar-dark"
					style={{
						position: 'fixed',
						padding: '0.5px',
						listStyle: 'none',
						margin: ' 0 auto',
						left: '0',
						top: '0',
						zIndex: '1',
						width: '100%'
					}}
				>
					<img src={berry} width="80" alt="" />
					<ul class="navbar-nav nav-fill w-100">
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fa fa-home"
								href="/"
								title="Home"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fas fa-newspaper"
								href="/journal"
								title="Electronic Journal"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fa fa-info-circle"
								href="/about"
								title="About us"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item dropdown">
							<Dropdown>
								<Dropdown.Toggle title="Language" variant="omar" id="dropdown-basic">
									<i className="fas fa-language" style={{ color: blue100, fontSize: '1.5em' }} />
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item
										onClick={() => this.props.changelang('en')}
										style={{ textAlign: 'left', color: blue200 }}
									>
										{' '}
										English
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item
										onClick={() => this.props.changelang('ar')}
										style={{ textAlign: 'left', color: blue200 }}
									>
										{' '}
										Arabic
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fas fa-sign-in-alt"
								href="/login"
								title="Sign In"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fas fa-user-plus"
								href="/register"
								title="Sign Up"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
					</ul>
				</nav>
				<br />
				<br />
				<br />
			</div>
				<div
				style={{
              				backgroundColor: '#a3dbf1',
							paddingTop: '8px',
							textAlign: 'center',
							fontSize: '50px',
							color: 'dark',
							flexDirection: 'row',
							justifyContent: 'flex-end',
							height:"80px"
            }}
          >
				Reset Password
            	<br />
				<form className="password-form" onClick={this.updatePassword}>
					<MDBInput
						style={{ width: '500px' ,right:"100%"}}
						id="password"
						label="Password"
						value={password}
						type="password"
						onChange={this.handleChange('password')}
					/>
					<Button
						buttonStyle={forgotButton}
						className="btn-block btn-rounded z-depth-1a"
						variant="omar"
						style={{marginTop:"50px",marginLeft: "50px",marginRight:"2500px",width:"180px", height:"40px" ,backgroundColor:"#a3dbf1"}}
					>
					Update password
					</Button>
					{/* <SubmitButtons buttonStyle={updateButton} buttonText="Update Password" /> */}
				</form>
				{showNullError && (
					<div style={{marginRight:"1170px",color:blue200}}>
						
						<h4>You must insert a password</h4>
					</div>
				)}
				{updated && (
					<div style={{marginRight:"1170px",color:blue200}}>
						<h4>Your password has been successfully reset, please try logging in again.</h4>
						<Button
						buttonStyle={loginButton}
						className="btn-block btn-rounded z-depth-1a"
						variant="omar"
						href='/login'
						style={{marginTop:"50px",marginLeft: "50px",marginRight:"2500px",width:"100px", height:"40px" ,backgroundColor:"#a3dbf1"}}
					>
					Login
					</Button>
					</div>
				)}
				{/* <Button
						buttonStyle={homeButton}
						className="btn-block btn-rounded z-depth-1a"
						variant="omar"
						href='/'
						style={{marginTop:"50px",marginLeft: "50px",marginRight:"2500px",width:"100px", height:"40px" ,backgroundColor:"#a3dbf1"}}
					>
					Home
					</Button> */}
			</div>
			</div>
		);
	}
}

ResetPassword.propTypes = {
	// eslint-disable-next-line react/require-default-props
	match: PropTypes.shape({
		params: PropTypes.shape({
			token: PropTypes.string.isRequired
		})
	})
};
