import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import trans from '../translations/sscTranslation';
import swal from 'sweetalert';
var mongoose = require('mongoose');

class SSCForm extends React.Component {
	constructor(props) {
		super(props);
		this.show = this.show.bind(this);
		this.state = {
			// userId: {
			//   value : '',
			//  },
			companyName: {
				value: '',
				valid: false
			},
			companyGovernorate: {
				value: '',
				valid: false
			},
			companyAddress: {
				value: '',
				valid: false
			},
			companyCity: {
				value: '',
				valid: false
			},
			companyTelephone: '',
			companyFax: '',
			companyNameInEnglish: '',
			currency: {
				value: '',
				valid: false
			},
			type: '',
			equityCapital: {
				value: '',
				valid: false
			},
			SSCManagers: [ {} ],
			index: 1,
			SSCManagerName: {
				value: '',
				valid: false
			},
			SSCManagerType: {
				value: '',
				valid: false
			},
			SSCManagerGender: {
				value: '',
				valid: false
			},
			SSCManagerNationality: {
				value: '',
				valid: false
			},
			SSCManagerIdentificationType: {
				value: '',
				valid: false
			},
			SSCManagerIdentificationNumber: {
				value: '',
				valid: false
			},
			SSCManagerBirthdate: {
				value: '',
				valid: false
			},
			SSCManagerAddress: {
				value: '',
				valid: false
			},
			typeOfManagers: {
				value: '',
				valid: false
			},
			governorate: [],
			cities: []
		};
	}

	handleClick(event) {
		console.log(this.state.SSCManagers);
		var apiBaseUrl = '/routes/api/users/CreatingForm';
		var payload = {
			//"userId":mongoose.Types.ObjectId('5ca7b4748be2725704f230bc'),
			companyName: this.state.companyName.value,
			companyGovernorate: this.state.companyGovernorate.value,
			companyAddress: this.state.companyAddress.value,
			companyCity: this.state.companyCity.value,
			companyTelephone: this.state.companyTelephone.value,
			companyFax: this.state.companyFax.value,
			companyNameInEnglish: this.state.companyNameInEnglish.value,
			currency: this.state.currency.value,
			type: 'SSCForm',
			equityCapital: this.state.equityCapital.value,
			lawyerComments: [],
			reviewerComments: [],
			SSCManagers: this.state.SSCManagers,

			creationDate: '2018-4-7',
			status: 'Unassigned'
		};

		axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
		axios
			.post(apiBaseUrl, payload, { headers: { Authorization: localStorage.getItem('jwtToken') } })
			.then(function(response) {
				console.log(response);
				if (response.data.code === 200) {
					swal('SSCForm Created Succesfully');
				}
			})
			.catch((err) => swal(err.response.data.errmsg || err.response.data));
	}

	changeHandler = (event) => {
		this.setState({ [event.target.name]: { value: event.target.value, valid: !!event.target.value } });
	};
	changeHandlerName = (i, event) => {
		console.log(i);
		this.state.SSCManagers[i].name = event.target.value;
		this.forceUpdate();
	};
	changeHandlerType = (i, event) => {
		this.state.SSCManagers[i].type = event.target.value;
		this.forceUpdate();
	};
	changeHandlerGender = (i, event) => {
		this.state.SSCManagers[i].gender = event.target.value;
		this.forceUpdate();
	};
	changeHandlerNationality = (i, event) => {
		this.state.SSCManagers[i].nationality = event.target.value;
		this.forceUpdate();
	};
	changeHandlerIdentificationType = (i, event) => {
		this.state.SSCManagers[i].identificationType = event.target.value;
		this.forceUpdate();
	};
	changeHandlerIdentificationNumber = (i, event) => {
		this.state.SSCManagers[i].identificationNumber = event.target.value;
		this.forceUpdate();
	};
	changeHandlerBirthdate = (i, event) => {
		this.state.SSCManagers[i].birthdate = event.target.value;
		this.forceUpdate();
	};
	changeHandler2 = (event) => {
		this.setState({ [event.target.name]: event.target.value });
		axios.get('/routes/api/governorates/getByGovernorateName/' + event.target.value).then((res) => {
			this.setState({ cities: res.data.data });
			console.log(this.state.cities);
		});
	};
	changeHandlerAddress = (i, event) => {
		this.state.SSCManagers[i].address = event.target.value;
		this.forceUpdate();
	};
	show(i) {
		if (document.getElementById('ManagerAdd')) {
			var x = document.getElementById('ManagerAdd').innerHTML;
			x = x + '<h' + 0 + '>Manager ' + (1 + i) + '</h' + i + '> <br>  ';
			x =
				x +
				'Manager Name <br>' +
				'<input id = "Manager Name ' +
				i +
				'" type="text" name="Manager Name" onkeypress=this.changeHandlerName;  > <br>' +
				' Manager Type <br> ' +
				'<input id = "Manager Type ' +
				i +
				'" type="text" name="Manager Type" onkeypress=this.changeHandlerType;  > <br>' +
				' Manager Gender <br> ' +
				'<input id = "Manager Gender ' +
				i +
				'" type="text" name="Manager Gender" onkeypress=this.changeHandlerGender;  > <br>' +
				' Manager Nationality <br> ' +
				'<input id = "Manager Nationality ' +
				i +
				'" type="text" name="Manager Nationality" onkeypress=this.changeHandlerNationality;  > <br>' +
				' Manager IdentificationType <br> ' +
				'<input id = "Manager IdentificationType ' +
				i +
				'" type="text" name="Manager IdentificationType" onkeypress=this.changeHandlerIdentificationType;  > <br>' +
				' Manager IdentificationNumber <br> ' +
				'<input id = "Manager IdentificationNumber ' +
				i +
				'" type="text" name="Manager IdentificationNumber" onkeypress=this.changeHandlerIdentificationNumber;  > <br>' +
				' Manager Birthdate <br> ' +
				'<input id = "Manager Birthdate ' +
				i +
				'" type="text" name="Manager Birthdate" onkeypress=this.changeHandlerBirthdate;  > <br>' +
				' Manager Address <br> ' +
				'<input id = "Manager Address ' +
				i +
				'" type="text" name="Manager Address" onkeypress=this.changeHandlerAddress;  > <br>' +
				' Manager ManagerialType <br> ' +
				'<input id = "Manager ManagerialType ' +
				i +
				'" type="text" name="Manager ManagerialType" onkeypress=this.changeHandlerManagerialType;  > <br>';

			document.getElementById('ManagerAdd').innerHTML = x;
			document.getElementById('Manager Name ' + i).onchange = (e) => this.changeHandlerName(i, e);
			document.getElementById('Manager Type ' + i).onchange = (e) => this.changeHandlerType(i, e);
			document.getElementById('Manager Gender ' + i).onchange = (e) => this.changeHandlerGender(i, e);
			document.getElementById('Manager Nationality ' + i).onchange = (e) => this.changeHandlerNationality(i, e);
			document.getElementById('Manager IdentificationType ' + i).onchange = (e) =>
				this.changeHandlerIdentificationType(i, e);
			document.getElementById('Manager IdentificationNumber ' + i).onchange = (e) =>
				this.changeHandlerIdentificationNumber(i, e);
			document.getElementById('Manager Birthdate ' + i).onchange = (e) => this.changeHandlerBirthdate(i, e);
			document.getElementById('Manager Address ' + i).onchange = (e) => this.changeHandlerAddress(i, e);
			document.getElementById('Manager ManagerialType ' + i).onchange = (e) =>
				this.changeHandlerManagerialType(i, e);
			this.setState({ index: this.state.index + 1 });
			this.setState({
				SSCManagers: [ ...this.state.SSCManagers, {} ]
			});
		}
	}
	changeHandlerManagerialType = (i, event) => {
		this.state.SSCManagers[i].typeOfManagers = event.target.value;
		this.forceUpdate();
	};
	validateForm() {
		return this.state.companyName.value.length >= 3 && this.state.companyName.value.length <= 50;
	}
	componentDidMount() {
		axios.get('/routes/api/governorates/').then((res) => {
			this.setState({ governorate: res.data.data });
		});
	}

	render() {
		// console.log(this.props)
		//  trans.setLanguage(this.props.lang)
		return (
			<div style={{ paddingLeft: '64px', justifyItems: 'center' }}>
				<MuiThemeProvider>
					<div>
						<div
							style={{
								backgroundColor: '#123456',
								textAlign: 'center',
								fontSize: '50px',
								color: 'white'
							}}
						>
							{trans.title}
						</div>
						<br />
						<MDBRow>
							<MDBCol>
								<MDBInput
									label={trans.name}
									value={this.state.companyName.value}
									className={this.state.companyName.valid ? 'is-valid' : 'is-invalid'}
									name="companyName"
									onChange={this.changeHandler}
									type="text"
									id="materialFormRegisterNameEx"
									required
								>
									<div className="valid-feedback">Looks good!</div>
									<div className="invalid-feedback">Provide a valid name!</div>
								</MDBInput>
							</MDBCol>
							<br />

							<MDBCol>
								<MDBInput
									value={this.state.companyTelephone.value}
									name="companyTelephone"
									onChange={this.changeHandler}
									type="text"
									id="materialFormRegisterNameEx"
									label={trans.telephone}
									required
								/>
							</MDBCol>

							<br />
							<MDBCol>
								<MDBInput
									value={this.state.companyAddress.value}
									className={this.state.companyAddress.valid ? 'is-valid' : 'is-invalid'}
									name="companyAddress"
									onChange={this.changeHandler}
									type="text"
									id="materialFormRegisterNameEx"
									label={trans.address}
									required
								>
									<div className="valid-feedback">Looks good!</div>
									<div className="invalid-feedback">Provide a valid Address!</div>
								</MDBInput>
							</MDBCol>
						</MDBRow>
						<br />
						<MDBRow>
							<MDBCol>
								<div className="form-group">
									<label htmlFor="companyGovernorate">Company Governorate</label>
									<select
										className="form-control"
										id="exampleFormControlSelect1"
										name="companyGovernorate"
										onChange={this.changeHandler2}
										value={this.state.companyGovernorate}
									>
										{this.state.governorate.map((gov) => (
											<option value={gov.name}>{gov.name}</option>
										))};
									</select>
								</div>
							</MDBCol>

							<MDBCol>
								<div className="form-group">
									<label htmlFor="companyCity">Company City</label>
									<select
										className="form-control"
										id="exampleFormControlSelect1"
										name="companyCity"
										onChange={this.changeHandler}
										value={this.state.companyCity}
									>
										{this.state.cities.map((city) => <option value={city}>{city}</option>)};
									</select>
								</div>
							</MDBCol>
							<br />

							<MDBCol>
								<div className="form-group">
									<label htmlFor="currency">{trans.currency}</label>
									<select
										className="form-control"
										id="exampleFormControlSelect1"
										name="currency"
										onChange={this.changeHandler}
										value={this.state.currency.value}
									>
										<option>Euro</option>
										<option>Egp</option>
										<option>Pound</option>
										<option>Franc</option>
										<option>SA</option>
										<option>U.D</option>
										<option>U.S</option>
										<option>Yen</option>
									</select>
								</div>
							</MDBCol>
						</MDBRow>
						<br />

						<MDBRow>
							<br />
							<MDBCol>
								<MDBInput
									value={this.state.companyFax.value}
									name="companyFax"
									onChange={this.changeHandler}
									type="text"
									id="materialFormRegisterNameEx"
									label={trans.fax}
									required
								/>
							</MDBCol>
							<MDBCol>
								<MDBInput
									value={this.state.companyNameInEnglish.value}
									name="companyNameInEnglish"
									onChange={this.changeHandler}
									type="text"
									id="materialFormRegisterNameEx"
									label={trans.nameInEnglish}
									required
								/>
							</MDBCol>

							<br />

							<MDBCol>
								<MDBInput
									value={this.state.equityCapital.value}
									className={this.state.equityCapital.valid ? 'is-valid' : 'is-invalid'}
									name="equityCapital"
									onChange={this.changeHandler}
									type="text"
									id="materialFormRegisterNameEx"
									label={trans.capital}
									required
								>
									<div className="valid-feedback">Looks good!</div>
									<div className="invalid-feedback">Provide a valid equity!</div>
								</MDBInput>
							</MDBCol>
						</MDBRow>
						<MDBRow>
							<MDBCol>
								<MDBInput
									label={trans.managerName}
									value={this.state.SSCManagers[0].name}
									className={this.state.SSCManagerName.valid ? 'is-valid' : 'is-invalid'}
									name="SSCManagerName"
									onChange={(e) => this.changeHandlerName(0, e)}
									type="text"
									id="materialFormRegisterNameEx"
									required
								>
									<div className="valid-feedback">Looks good!</div>
									<div className="invalid-feedback">Provide a valid name!</div>
								</MDBInput>
							</MDBCol>
							<br />

							<MDBCol>
								<MDBInput
									label={trans.managerType}
									value={this.state.SSCManagers[0].type}
									className={this.state.SSCManagerType.valid ? 'is-valid' : 'is-invalid'}
									name="SSCManagerType"
									onChange={(e) => this.changeHandlerType(0, e)}
									type="text"
									id="materialFormRegisterNameEx"
									required
								>
									<div className="valid-feedback">Looks good!</div>
									<div className="invalid-feedback">Provide a valid type!</div>
								</MDBInput>
							</MDBCol>

							<br />
							<MDBCol>
								<MDBInput
									value={this.state.SSCManagers[0].gender}
									className={this.state.SSCManagerGender.valid ? 'is-valid' : 'is-invalid'}
									name={trans.managerGender}
									onChange={(e) => this.changeHandlerGender(0, e)}
									type="text"
									id="materialFormRegisterNameEx"
									label="Manager gender"
									required
								>
									<div className="valid-feedback">Looks good!</div>
									<div className="invalid-feedback">Provide a valid gender!</div>
								</MDBInput>
							</MDBCol>
						</MDBRow>
						<MDBRow>
							<MDBCol>
								<MDBInput
									label={trans.managerNationality}
									value={this.state.SSCManagers[0].nationality}
									className={this.state.SSCManagerNationality.valid ? 'is-valid' : 'is-invalid'}
									name="SSCManagerNationality"
									onChange={(e) => this.changeHandlerNationality(0, e)}
									type="text"
									id="materialFormRegisterNameEx"
									required
								>
									<div className="valid-feedback">Looks good!</div>
									<div className="invalid-feedback">Provide a valid nationality!</div>
								</MDBInput>
							</MDBCol>
							<br />

							<MDBCol>
								<MDBInput
									label={trans.managerIdentityType}
									value={this.state.SSCManagers[0].identificationType}
									className={
										this.state.SSCManagerIdentificationType.valid ? 'is-valid' : 'is-invalid'
									}
									name="SSCManagerIdentificationType"
									onChange={(e) => this.changeHandlerIdentificationType(0, e)}
									type="text"
									id="materialFormRegisterNameEx"
									required
								>
									<div className="valid-feedback">Looks good!</div>
									<div className="invalid-feedback">Provide a valid Identification type!</div>
								</MDBInput>
							</MDBCol>

							<br />
							<MDBCol>
								<MDBInput
									value={this.state.SSCManagers[0].identificationNumber}
									className={
										this.state.SSCManagerIdentificationNumber.valid ? 'is-valid' : 'is-invalid'
									}
									name="SSCManagerIdentificationNumber"
									onChange={(e) => this.changeHandlerIdentificationNumber(0, e)}
									type="text"
									id="materialFormRegisterNameEx"
									label={trans.managerIdentityNumber}
									required
								>
									<div className="valid-feedback">Looks good!</div>
									<div className="invalid-feedback">Provide a valid Identification number!</div>
								</MDBInput>
							</MDBCol>
						</MDBRow>
						<MDBRow>
							<MDBCol>
								<MDBInput
									label={trans.birthdate}
									value={this.state.SSCManagers[0].birthdate}
									className={this.state.SSCManagerBirthdate.valid ? 'is-valid' : 'is-invalid'}
									name="SSCManagerBirthdate"
									onChange={(e) => this.changeHandlerBirthdate(0, e)}
									type="text"
									id="materialFormRegisterNameEx"
									required
								>
									<div className="valid-feedback">Looks good!</div>
									<div className="invalid-feedback">Provide a valid date!</div>
								</MDBInput>
							</MDBCol>
							<br />

							<MDBCol>
								<MDBInput
									label={trans.managerAddress}
									value={this.state.SSCManagers[0].address}
									className={this.state.SSCManagerAddress.valid ? 'is-valid' : 'is-invalid'}
									name="SSCManagerAddress"
									onChange={(e) => this.changeHandlerAddress(0, e)}
									type="text"
									id="materialFormRegisterNameEx"
									required
								>
									<div className="valid-feedback">Looks good!</div>
									<div className="invalid-feedback">Provide a valid Address!</div>
								</MDBInput>
							</MDBCol>

							<br />
							<MDBCol>
								<MDBInput
									value={this.state.SSCManagers[0].typeOfManagers}
									className={this.state.typeOfManagers.valid ? 'is-valid' : 'is-invalid'}
									name="typeOfManagers"
									onChange={(e) => this.changeHandlerManagerialType(0, e)}
									type="text"
									id="materialFormRegisterNameEx"
									label={trans.managerialType}
									required
								>
									<div className="valid-feedback">Looks good!</div>
									<div className="invalid-feedback">Provide a valid type!</div>
								</MDBInput>
							</MDBCol>
						</MDBRow>
						<div id="ManagerAdd" />
						<button onClick={() => this.show(this.state.index)}>Add more Managers</button>
						<RaisedButton
							label="Submit"
							primary={true}
							style={style}
							disabled={!this.validateForm()}
							onClick={(event) => (this.handleClick(event), swal('SSCForm Created Succesfully'))}
						/>
					</div>
				</MuiThemeProvider>
			</div>
		);
	}
}
const style = {
	margin: 15
};

export default SSCForm;
