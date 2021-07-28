import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authentication';
import classnames from 'classnames';
import trans from '../translations/loginTranslation';
import { Button } from 'react-bootstrap';
import { MDBInput } from 'mdbreact';
import { InputAdornment, withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { RemoveRedEye } from '@material-ui/icons';
const styles = (theme) => ({
	eye: {
		cursor: 'pointer'
	}
});

class PasswordInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			passwordIsMasked: true
		};
	}

	togglePasswordMask = () => {
		this.setState((prevState) => ({
			passwordIsMasked: !prevState.passwordIsMasked
		}));
	};

	render() {
		const { classes } = this.props;
		const { passwordIsMasked } = this.state;

		return (
			<div className="md-form pb-3">
				<TextField
					placeholder={trans.password}
					type={passwordIsMasked ? 'password' : 'text'}
					{...this.props}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<RemoveRedEye className={classes.eye} onClick={this.togglePasswordMask} />
							</InputAdornment>
						)
					}}
				/>
			</div>
		);
	}
}

PasswordInput.propTypes = {
	classes: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.func.isRequired
};

PasswordInput = withStyles(styles)(PasswordInput);

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: {}
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange1 = this.onChange1.bind(this);
	}

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const user = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.loginUser(user);
		//handle the redirect to the corresponding page --omar
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	onChange1 = (event) => {
		const { name, value } = event.target;

		this.setState({ [name]: value });
	};

	render() {
		
		const { errors } = this.state;
		const { password } = this.state;
		trans.setLanguage(this.props.lang);

		return (
			<div>
				<br/>
				<br/>
				<div className="modal-dialog" role="document">
					{/* <form onSubmit={this.handleSubmit}> */}
					<div className="modal-content form-elegant">
						<div className="modal-header text-center">
							<h3 className="modal-title w-100 dark-grey-text font-weight-bold my-3" id="myModalLabel">
								<strong> {trans.loginTitle}</strong>
							</h3>
						</div>

						<div className="modal-body mx-4">
							<div className="md-form mb-5">
								<MDBInput
									type="email"
									hint="example@hotmail.com"
									className={
										this.state.email.length === 0 ||
										this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? (
											'is-valid'
										) : (
											'is-invalid' 
										)
									}
									id="Form-email1"
									//className="form-control validate"
									name="email"
									onChange={this.handleInputChange}
									value={this.state.email}
								>
									<div className="valid-feedback">{trans.valid}</div>
									<div className="invalid-feedback">{trans.invalid}</div>
								</MDBInput>

								{/* <label data-error="wrong" data-success="right" htmlFor="Form-email1">
									{trans.hintemail}
								</label> */}
							</div>
							<div className="md-form pb-3">
								<PasswordInput
									//type="password"
									id="Form-pass1"
									//className="form-control validate"
									className={this.state.password.length > 0 ? 'is-valid' : 'is-invalid'}
									onChange={this.onChange1}
									name="password"
									value={this.state.password}
									style={{ width: '100%' }}
								>
									<div className="valid-feedback">{trans.validP}</div>
									<div className="invalid-feedback">{trans.invalidP}</div>
								</PasswordInput>
								{/* <label data-error="wrong" data-success="right" htmlFor="Form-pass1">
									{trans.hintpassword}
								</label> */}
								<p className="font-small blue-text d-flex justify-content-end">
									{' '}
									<a href="forgotPassword" className="blue-text ml-1">
										{trans.forgot}
									</a>
								</p>
							</div>
							<div className="text-center mb-3">
								<Button
									variant="omar"
									style={{ width: '120px', height: '55px',backgroundColor:"#a3dbf1" }}  
									onClick={(e) => this.handleSubmit(e)}
									type="submit"
								>
									{trans.loginbutton}
								</Button>
							</div>
						</div>

						<div className="modal-footer mx-5 pt-3 mb-1">
							<p className="font-small grey-text d-flex justify-content-end">
								{trans.member}{' '}
								<a href="/register" className="blue-text ml-1">
									{trans.signup}
								</a>
							</p>
						</div>
					</div>
					{/* </form> */}
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
