import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import { registerUser } from '../../actions/authentication';
import { registerLR } from '../../actions/authentication';
import classnames from 'classnames';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { MDBRow, MDBCol } from 'mdbreact';
import { Button, Container, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';
import { blue200, black } from 'material-ui/styles/colors';
import { DiscFull } from '@material-ui/icons';
import trans from '../translations/registerAdminTranslation';

class adminPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userType: 'Lawyer',
			name: '',
			email: '',
			password: '',
			password_confirm: '',
			gender: 'Male',
			nationality: 'Egyptian',
			identificationType: 'National ID',
			identificationNumber: '',
			birthdate: new Date(),
			address: '',
			telephone: '',
			fax: '',
			nationalities: [],
			errors: {}
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	changeHandler = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		var payload = {
			userType: this.state.userType,
			name: this.state.name,
			gender: this.state.gender,
			nationality: this.state.nationality,
			identificationType: this.state.identificationType,
			identificationNumber: this.state.identificationNumber,
			birthdate: this.state.birthdate,
			address: this.state.address,
			email: this.state.email,
			password: this.state.password,
			telephone: this.state.telephone,
			fax: this.state.fax
		};
		this.props.registerLR(payload, this.props.history);
	}
	componentDidMount() {
		axios.get('/routes/api/nationalities').then((res) => {
			this.setState({ nationalities: res.data.data });
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	validateForm() {
		return (
			this.state.email.length >= 3 &&
			this.state.email.length <= 50 &&
			this.state.gender.length >= 4 &&
			this.state.gender.length <= 6 &&
			this.state.identificationNumber.length >= 8 &&
			this.state.identificationNumber.length <= 50 &&
			this.state.address.length >= 5 &&
			this.state.address.length <= 50 &&
			this.state.telephone.length >= 4 &&
			this.state.telephone.length <= 15 &&
			this.state.fax.length >= 5 &&
			this.state.fax.length <= 20 &&
			this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) &&
			this.state.password.length >= 8 &&
			this.state.password_confirm.length <= 20 &&
			this.state.password === this.state.password_confirm
		);
	}

	render() {
		trans.setLanguage(this.props.lang);

		const { errors } = this.state;
		return (
			<div className="container" style={{ marginTop: '50px', width: '700px' }}>
				<br />
				<h2 style={{ marginBottom: '40px', color: blue200 }}>{trans.title}</h2>
				<form onSubmit={this.handleSubmit}>
					<MDBRow>
						<MDBCol>
							<div className="form-group">
								<label htmlFor="userType">{trans.user}</label>
								<select
									className="form-control"
									id="exampleFormControlSelect1"
									name="userType"
									onChange={this.handleInputChange}
									value={this.state.userType}
								>
									<option>{trans.lawyer}</option>
									<option>{trans.reviewer}</option>
								</select>
							</div>
						</MDBCol>
					</MDBRow>

					<div className="form-group">
						<label htmlFor="name">{trans.name}</label>
						<input
							type="text"
							placeholder={trans.nameplace}
							className={classnames('form-control form-control-lg', {
								'is-invalid': errors.name
							})}
							name="name"
							onChange={this.handleInputChange}
							value={this.state.name}
							required
						/>

						{errors.name && <div className="invalid-feedback">{errors.name}</div>}
					</div>

					<MDBRow>
						<MDBCol>
							<div className="form-group">
								<label htmlFor="gender">{trans.gender}</label>
								<select
									className="form-control"
									id="exampleFormControlSelect1"
									name="gender"
									onChange={this.handleInputChange}
									value={this.state.gender}
								>
									<option>{trans.male}</option>
									<option>{trans.female}</option>
								</select>
							</div>
						</MDBCol>
					</MDBRow>

					<div className="form-group">
						<label htmlFor="Nationality">{trans.nationality}</label>
						<select
							className="form-control"
							id="exampleFormControlSelect1"
							name="nationality"
							onChange={this.changeHandler}
							value={this.state.nationality}
						>
							{this.state.nationalities.map((nat) => <option value={nat.name}>{nat.name}</option>)};
						</select>
					</div>

					<MDBRow>
						<MDBCol>
							<div className="form-group">
								<label htmlFor="identificationType">{trans.identificationT}</label>
								<select
									className="form-control"
									id="exampleFormControlSelect1"
									name="identificationType"
									onChange={this.handleInputChange}
									value={this.state.identificationType}
								>
									<option>{trans.id}</option>
									<option>{trans.passport}</option>
								</select>
							</div>
						</MDBCol>
					</MDBRow>

					<div className="form-group">
						<label htmlFor="identificationNumber">{trans.identificationN}</label>
						<input
							type="text"
							placeholder={trans.identificationNplace}
							className={classnames('form-control form-control-lg', {
								'is-invalid': errors.identificationNumber
							})}
							name="identificationNumber"
							onChange={this.handleInputChange}
							value={this.state.identificationNumber}
							required
						/>
						{errors.identificationNumber && (
							<div className="invalid-feedback">{errors.identificationNumber}</div>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="birthdate">{trans.birthdate}</label>
						<input
							type="text"
							placeholder={trans.birthdateplace}
							className={classnames('form-control form-control-lg', {
								'is-invalid': errors.birthdate
							})}
							class="material-icons prefix"
							id="materialFormRegisterNameEx"
							name="birthdate"
							onChange={this.handleInputChange}
							value={this.state.birthdate}
							style={{ width: '250px' }}
							required
						/>
						{errors.birthdate && <div className="invalid-feedback">{errors.birthdate}</div>}
					</div>

					<div className="form-group">
						<label htmlFor="address">{trans.address}</label>
						<input
							type="text"
							placeholder={trans.addressplace}
							className={classnames('form-control form-control-lg', {
								'is-invalid': errors.address
							})}
							name="address"
							onChange={this.handleInputChange}
							value={this.state.address}
							required
						/>
						{errors.address && <div className="invalid-feedback">{errors.address}</div>}
					</div>

					<div className="form-group">
						<label htmlFor="email">{trans.email}</label>
						<input
							type="email"
							placeholder={trans.emailplace}
							className={classnames('form-control form-control-lg', {
								'is-invalid': errors.email
							})}
							name="email"
							onChange={this.handleInputChange}
							value={this.state.email}
							required
						/>
						{errors.email && <div className="invalid-feedback">{errors.email}</div>}
					</div>

					<div className="form-group">
						<label htmlFor="password">{trans.password}</label>
						<input
							type="password"
							placeholder={trans.passwordplace}
							className={classnames('form-control form-control-lg', { 'is-invalid': errors.password })}
							//className={this.state.newPassword.valid?"is-valid" : "is-invalid"}
							name="password"
							onChange={this.handleInputChange}
							value={this.state.password}
							required
						/>

						{errors.password && <div className="invalid-feedback">{errors.password}</div>}
					</div>

					<div className="form-group">
						<label htmlFor="password_confirm">{trans.confirm}</label>
						<input
							type="password"
							placeholder={trans.confirmplace}
							className={classnames('form-control form-control-lg', {
								'is-invalid': errors.password_confirm
							})}
							name="password_confirm"
							onChange={this.handleInputChange}
							value={this.state.password_confirm}
							required
						/>
						{errors.password_confirm && <div className="invalid-feedback">{errors.password_confirm}</div>}
					</div>

					<div className="form-group">
						<label htmlFor="telephone">{trans.telephone}</label>
						<input
							type="text"
							placeholder={trans.telephoneplace}
							className={classnames('form-control form-control-lg', {
								'is-invalid': errors.telephone
							})}
							name="telephone"
							onChange={this.handleInputChange}
							value={this.state.telephone}
						/>
						{errors.telephone && <div className="invalid-feedback">{errors.telephone}</div>}
					</div>

					<div className="form-group">
						<label htmlFor="fax">{trans.fax}</label>
						<input
							type="text"
							placeholder={trans.faxplace}
							className={classnames('form-control form-control-lg', {
								'is-invalid': errors.fax
							})}
							name="fax"
							onChange={this.handleInputChange}
							value={this.state.fax}
						/>
						{errors.fax && <div className="invalid-feedback">{errors.fax}</div>}
					</div>

					<div className="form-group">
						<Button
							type="submit"
							variant="omar"
							style={{ width: '140px', height: '40px', backgroundColor: '#a3dbf1', color: black }}
							disabled={!this.validateForm()}
							onClick={(e) => this.handleSubmit(e)}
						>
							{trans.registerbutton}
						</Button>
					</div>
				</form>
			</div>
		);
	}
}

adminPage.propTypes = {
	registerLR: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	errors: state.errors
});

export default connect(mapStateToProps, { registerLR })(withRouter(adminPage));
