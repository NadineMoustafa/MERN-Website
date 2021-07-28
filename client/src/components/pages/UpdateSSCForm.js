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
import swal from 'sweetalert';
var mongoose = require('mongoose');

class UpdateSSCForm extends React.Component {
	constructor(props) {
		super(props);
		this.show = this.show.bind(this);
		this.changeHandlerName = this.changeHandlerName.bind(this);
		this.state = {
			companyName: '',
			companyGovernorate: '',
			companyAddress: '',
			companyCity: '',
			companyTelephone: '',
			companyFax: '',
			companyNameInEnglish: '',
			currency: '',
			type: '',
			equityCapital: '',
			SSCManagers: [ {} ],
			SSCManagerName: '',
			SSCManagerType: '',
			SSCManagerGender: '',
			SSCManagerNationality: '',
			SSCManagerIdentificationType: '',
			SSCManagerIdentificationNumber: '',
			SSCManagerBirthdate: '',
			SSCManagerAddress: '',
			typeOfManagers: '',
			lawyerComments: '',
			reviewerComments: ''
		};
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
		axios
			.get('/routes/api/forms/getSpecificform/' + mongoose.Types.ObjectId(this.props.formId._id), {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((response) => {
				this.setState({
					companyName: response.data.data.companyName,
					companyGovernorate: response.data.data.companyGovernorate,
					companyAddress: response.data.data.companyAddress,
					companyCity: response.data.data.companyCity,
					companyTelephone: response.data.data.companyTelephone,
					companyFax: response.data.data.companyFax,
					companyNameInEnglish: response.data.data.companyNameInEnglish,
					currency: response.data.data.currency,
					type: response.data.data.type,
					equityCapital: response.data.data.equityCapital,
					lawyerComments: response.data.data.lawyerComments,
					reviewerComments: response.data.data.reviewerComments
				});
			})
			.catch((err) => swal(err.response.data.errmsg || err.response.data));
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
		axios
			.get('/routes/api/forms/getSpecificform/' + mongoose.Types.ObjectId(this.props.formId._id), {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((response) => {
				let test = [];
				let i;
				for (i = 0; i < response.data.data.SSCManagers.length; i++) {
					test.push({
						name: response.data.data.SSCManagers[i].name,
						type: response.data.data.SSCManagers[i].type,
						gender: response.data.data.SSCManagers[i].gender,
						nationality: response.data.data.SSCManagers[i].nationality,
						identificationType: response.data.data.SSCManagers[i].identificationType,
						identificationNumber: response.data.data.SSCManagers[i].identificationNumber,
						birthdate: response.data.data.SSCManagers[i].birthdate,

						typeOfManagers: response.data.data.SSCManagers[i].typeOfManagers,
						address: response.data.data.SSCManagers[i].address
					});
				}
				this.setState({
					SSCManagers: test
				});
			})
			.catch((err) => swal(err.response.data.errmsg || err.response.data));
	}

	changeHandler2 = (event) => {
		this.setState({ [event.target.name]: event.target.value });
		axios.get('/routes/api/governorates/getByGovernorateName/' + event.target.value).then((res) => {
			this.setState({ cities: res.data.data });
			console.log(this.state.cities);
		});
	};
	handleClick(event) {
		var apiBaseUrl = '/routes/api/users/' + mongoose.Types.ObjectId(this.props.formId._id);
		var payload = {
			companyName: this.state.companyName,
			companyGovernorate: this.state.companyGovernorate,
			companyAddress: this.state.companyAddress,
			companyCity: this.state.companyCity,
			companyTelephone: this.state.companyTelephone,
			companyFax: this.state.companyFax,
			companyNameInEnglish: this.state.companyNameInEnglish,
			currency: this.state.currency,
			equityCapital: this.state.equityCapital,
			lawyerComments: this.state.lawyerComments,
			reviewerComments: this.state.reviewerComments,
			//  // "SSCManagers":[{"name":this.state.SSCManagerName.value,"type":this.state.SSCManagerType.value,"gender":this.state.SSCManagerGender.value,"nationality":this.state.SSCManagerNationality.value,"identificationType":this.state.SSCManagerIdentificationType.value,"identificationNumber":this.state.SSCManagerIdentificationNumber.value,"birthdate":this.state.SSCManagerBirthdate.value,"address":this.state.SSCManagerAddress.value,"typeOfManagers":this.state.typeOfManagers.value}],
			SSCManagers: this.state.SSCManagers,
			creationDate: this.state.creationDate,
			status: this.state.status
		};
		axios
			.put(apiBaseUrl, payload)
			.then(function(response) {
				console.log(response);
				if (response.data.code === 200) {
					swal('SSCForm Updated Succesfully');
				}
			})
			.catch((err) => swal(err.response.data.errmsg || err.response.data));
	}

	changeHandler = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	changeHandlerName = (i, event) => {
		this.state.SSCManagers[i - 1].SSCManagerName = event.target.value;
		this.forceUpdate();
	};
	changeHandlerType = (i, event) => {
		this.state.SSCManagers[i - 1].SSCManagerType = event.target.value;
		this.forceUpdate();
	};
	changeHandlerGender = (i, event) => {
		this.state.SSCManagers[i - 1].SSCManagerGender = event.target.value;
		this.forceUpdate();
	};
	changeHandlerNationality = (i, event) => {
		this.state.SSCManagers[i - 1].SSCManagerNationality = event.target.value;
		this.forceUpdate();
	};
	changeHandlerIdentificationType = (i, event) => {
		this.state.SSCManagers[i - 1].SSCManagerIdentificationType = event.target.value;
		this.forceUpdate();
	};
	changeHandlerIdentificationNumber = (i, event) => {
		this.state.SSCManagers[i - 1].SSCManagerIdentificationNumber = event.target.value;
		this.forceUpdate();
	};
	changeHandlerBirthdate = (i, event) => {
		this.state.SSCManagers[i - 1].SSCManagerBirthdate = event.target.value;
		this.forceUpdate();
	};
	changeHandlerAddress = (i, event) => {
		this.state.SSCManagers[i - 1].SSCManagerAddress = event.target.value;
		this.forceUpdate();
	};
	changeHandlerManagerialType = (i, event) => {
		this.state.SSCManagers[i - 1].typeOfManagers = event.target.value;
		this.forceUpdate();
	};
	validateForm() {
		// return this.state.companyName.value.length >=3 && this.state.companyName.value.length <=50
	}

	show() {
		var x = '';
		var i;
		for (i = 1; i < this.state.SSCManagers.length; i++) {
			x = x + '<h' + i + '>Manager ' + (1 + i) + '</h' + i + '> <br>  ';
			x =
				x +
				'Manager Name <br>' +
				'<input id = "Manager Name ' +
				i +
				'" type="text" name="Manager Name" onkeypress=this.changeHandlerName; value=' +
				this.state.SSCManagers[i].SSCManagerName +
				' > <br>' +
				' Manager Type <br> ' +
				'<input id = "Manager Type ' +
				i +
				'" type="text" name="Manager Type" onkeypress=this.changeHandlerType; value=' +
				this.state.SSCManagers[i].SSCManagerType +
				' > <br>' +
				' Manager Gender <br> ' +
				'<input id = "Manager Gender ' +
				i +
				'" type="text" name="Manager Gender" onkeypress=this.changeHandlerGender; value=' +
				this.state.SSCManagers[i].SSCManagerGender +
				' > <br>' +
				' Manager Nationality <br> ' +
				'<input id = "Manager Nationality ' +
				i +
				'" type="text" name="Manager Nationality" onkeypress=this.changeHandlerNationality; value=' +
				this.state.SSCManagers[i].SSCManagerNationality +
				' > <br>' +
				' Manager IdentificationType <br> ' +
				'<input id = "Manager IdentificationType ' +
				i +
				'" type="text" name="Manager IdentificationType" onkeypress=this.changeHandlerIdentificationType; value=' +
				this.state.SSCManagers[i].SSCManagerIdentificationType +
				' > <br>' +
				' Manager IdentificationNumber <br> ' +
				'<input id = "Manager IdentificationNumber ' +
				i +
				'" type="text" name="Manager IdentificationNumber" onkeypress=this.changeHandlerIdentificationNumber; value=' +
				this.state.SSCManagers[i].SSCManagerIdentificationNumber +
				' > <br>' +
				' Manager Birthdate <br> ' +
				'<input id = "Manager Birthdate ' +
				i +
				'" type="text" name="Manager Birthdate" onkeypress=this.changeHandlerBirthdate; value=' +
				this.state.SSCManagers[i].SSCManagerBirthdate +
				' > <br>' +
				' Manager Address <br> ' +
				'<input id = "Manager Address ' +
				i +
				'" type="text" name="Manager Address" onkeypress=this.changeHandlerAddress; value=' +
				this.state.SSCManagers[i].SSCManagerAddress +
				' > <br>' +
				' Manager ManagerialType <br> ' +
				'<input id = "Manager ManagerialType ' +
				i +
				'" type="text" name="Manager ManagerialType" onkeypress=this.changeHandlerManagerialType; value=' +
				this.state.SSCManagers[i].typeOfManagers +
				' > <br>';

			document.getElementById('test').innerHTML = x;
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
		}
	}
	render() {
		return (
			<div style={{ paddingLeft: '60px', justifyItems: 'center' }}>
				<MuiThemeProvider>
					<div>
						<AppBar title="Update your SSCForm" />
						<br />
						<MDBRow>
							<MDBCol>
								<MDBInput
									label="Company Name"
									value={this.state.companyName}
									name="companyName"
									onChange={this.changeHandler}
									type="text"
									id="materialFormRegisterNameEx"
									required
								/>
							</MDBCol>
							<br />

							<MDBCol>
								<MDBInput
									value={this.state.companyTelephone}
									name="companyTelephone"
									onChange={this.changeHandler}
									type="text"
									id="materialFormRegisterNameEx"
									label="Company Telephone"
									required
								/>
							</MDBCol>

							<br />
							<MDBCol>
								<MDBInput
									value={this.state.companyAddress}
									//className={this.state.companyAddress.valid ? "is-valid" : "is-invalid"}
									name="companyAddress"
									onChange={this.changeHandler}
									type="text"
									id="materialFormRegisterNameEx"
									label="Company Address"
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
									<label htmlFor="currency">Currency</label>
									<select
										className="form-control"
										id="exampleFormControlSelect1"
										name="currency"
										onChange={this.changeHandler}
										value={this.state.currency}
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
									value={this.state.companyFax}
									name="companyFax"
									onChange={this.changeHandler}
									type="text"
									id="materialFormRegisterNameEx"
									label="Company Fax"
									required
								/>
							</MDBCol>
							<MDBCol>
								<MDBInput
									value={this.state.companyNameInEnglish}
									name="companyNameInEnglish"
									onChange={this.changeHandler}
									type="text"
									id="materialFormRegisterNameEx"
									label="Company Name In English"
									required
								/>
							</MDBCol>

							<br />

							<MDBCol>
								<MDBInput
									value={this.state.equityCapital}
									// className={this.state.equityCapital.valid ? "is-valid" : "is-invalid"}
									name="equityCapital"
									onChange={this.changeHandler}
									type="text"
									id="materialFormRegisterNameEx"
									label="Equity Capital"
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
									label="Manager Name"
									value={this.state.SSCManagers[0].SSCManagerName}
									// className={this.state.SSCManagerName.valid ? "is-valid" : "is-invalid"}
									name="SSCManagerName"
									onChange={this.changeHandlerName}
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
									label="Manager Type"
									value={this.state.SSCManagers[0].SSCManagerType}
									// className={this.state.SSCManagerType.valid ? "is-valid" : "is-invalid"}
									name="SSCManagerType"
									onChange={this.changeHandlerType}
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
									value={this.state.SSCManagers[0].SSCManagerGender}
									// className={this.state.SSCManagerGender.valid ? "is-valid" : "is-invalid"}
									name="SSCManagerGender"
									onChange={this.changeHandlerGender}
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
									label="Manager nationality"
									value={this.state.SSCManagers[0].SSCManagerNationality}
									// className={this.state.SSCManagerNationality.valid ? "is-valid" : "is-invalid"}
									name="SSCManagerNationality"
									onChange={this.changeHandlerNationality}
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
									label="Manager Identification type"
									value={this.state.SSCManagers[0].SSCManagerIdentificationType}
									//className={this.state.SSCManagerIdentificationType.valid ? "is-valid" : "is-invalid"}
									name="SSCManagerIdentificationType"
									onChange={this.changeHandlerIdentificationType}
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
									value={this.state.SSCManagers[0].SSCManagerIdentificationNumber}
									// className={this.state.SSCManagerIdentificationNumber.valid ? "is-valid" : "is-invalid"}
									name="SSCManagerIdentificationNumber"
									onChange={this.changeHandlerIdentificationNumber}
									type="text"
									id="materialFormRegisterNameEx"
									label="Manager Identification number"
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
									label="Manager Birth date"
									value={this.state.SSCManagers[0].SSCManagerBirthdate}
									//className={this.state.SSCManagerBirthdate.valid ? "is-valid" : "is-invalid"}
									name="SSCManagerBirthdate"
									onChange={this.changeHandlerBirthdate}
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
									label="Manager Address"
									value={this.state.SSCManagers[0].SSCManagerAddress}
									//className={this.state.SSCManagerAddress.valid ? "is-valid" : "is-invalid"}
									name="SSCManagerAddress"
									onChange={this.changeHandlerAddress}
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
									// className={this.state.typeOfManagers.valid ? "is-valid" : "is-invalid"}
									name="typeOfManagers"
									onChange={this.changeHandlerManagerialType}
									type="text"
									id="materialFormRegisterNameEx"
									label="Managerial Type"
									required
								>
									<div className="valid-feedback">Looks good!</div>
									<div className="invalid-feedback">Provide a valid type!</div>
								</MDBInput>
							</MDBCol>
						</MDBRow>
						<div id="test" />
						<button onClick={this.show}>Edit the rest of the Managers</button>
						<RaisedButton
							label="Submit"
							primary={true}
							style={style}
							onClick={(event) => (this.handleClick(event), swal('SSCForm Updated Succesfully'))}
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

export default UpdateSSCForm;
