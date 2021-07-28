import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import {
	MDBRow,
	MDBCol,
	MDBInput,
	MDBBtn,
	MDBDropdown,
	MDBDropdownToggle,
	MDBDropdownItem,
	MDBDropdownMenu
} from 'mdbreact';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import trans from '../translations/spcTranslation';
//import {Dropdown} from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react';
import DropdownItem from 'react-bootstrap/DropdownItem';
import Footer from '../layout/footer';
import { conditionalExpression } from '@babel/types';

var mongoose = require('mongoose');

class CreateANewCompany extends Component {
	constructor(props) {
		super(props);
		this.state = {
			attributes: [],
			validations: [],
			certainFormType: [],
			formType: localStorage.getItem('formType'),
			tmp: '',
			formTypeArray: '',
			governorate: [],
			cities: [],
			city: '',
			nationalities: []
		};
	}
	componentDidMount = () => {
		const formType = localStorage.getItem('formType');
		axios
			.get('/routes/api/formTypes/getByFormType/' + localStorage.getItem('formType'), {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				this.setState({
					certainFormType: res.data.data
				});
			});
	};
	changeHandler = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	changeHandler2 = (event) => {
		this.setState({ [event.target.name]: event.target.value });
		axios.get('/routes/api/governorates/getByGovernorateName/' + event.target.value).then((res) => {
			this.setState({ cities: res.data.data });
		});
	};
	getAttributes = () => {
		const keys = Object.keys(this.state.certainFormType);
		var formType = this.state.certainFormType[keys];
		var KEYS = [];
		for (var key in formType) {
			KEYS.push(key);
		}
		return KEYS.map((key, index) => {
			if (key !== '_id' && key !== '__v') {
				var now=key;
				var temp="";
				temp=temp+key.charAt(0).toUpperCase();
				for(var j=1;j<now.length;j++){
					if(now.charCodeAt(j)>=65 && now.charCodeAt(j)<=90){
						temp=temp+" "
						temp=temp+now.charAt(j)
					}
					else{
						temp=temp+now.charAt(j)
					}
					
				}
				var constraints = formType[key];
				constraints = constraints.split(',');
				var now2=constraints[1]
				if (now2==='required')
				now2='Required'
				else
				now2='Not Required'
				//console.log(constraints)
				if (constraints[0] === 'array') {
					return (
						<div>
							<h2>{key}</h2>
							<h3>Please choose and insert {key} from the 2nd DropDown Menu</h3>
						</div>
					);
				} else if (constraints[5] === 'dropdownlist') {
					if (key === 'companyGovernorate') {
						axios.get('/routes/api/governorates/').then((res) => {
							this.setState({ governorate: res.data.data });
						});
						return (
							<div style={{ marginBottom: '60px' ,width:"300px"}}>
								<MDBCol>
									<div className="form-group">
										<label htmlFor={key}>{temp+" ("+now2+") "}</label>
										<select
											className="form-control"
											id="exampleFormControlSelect1"
											name={key}
											onChange={this.changeHandler2}
											value={this.state[key]}
											
										>
											<option>Please choose the governorate</option>
											{this.state.governorate.map((gov) => (
												 <option value={gov.name}>{gov.name}</option>
											))};
										</select>
									</div>
								</MDBCol>
								<MDBCol>
									<div className="form-group">
										<label htmlFor="companyCity">Company City (Required)</label>
										<select
											className="form-control"
											id="exampleFormControlSelect1"
											name="companyCity"
											onChange={this.changeHandler}
											value={this.state.companyCity}
											style={{width:"250px"}}

										>
											<option>Please choose the city </option>
											{this.state.cities.map((city) => <option value={city}>{city}</option>)};
										</select>
									</div>
								</MDBCol>
							</div>
						);
					}
					if (key === 'investorNationality') {
						axios.get('/routes/api/nationalities/').then((res) => {
							this.setState({ nationalities: res.data.data });
						});
						return (
							<div style={{ marginBottom: '60px' ,width:"300px"}}>
								<MDBCol>
									<div className="form-group">
										<label htmlFor={key}>{temp+" ("+now2+") "}</label>
										<select
											className="form-control"
											id="exampleFormControlSelect1"
											name={key}
											onChange={this.changeHandler}
											value={this.state[key]}

										>
											<option>Please choose the nationality </option>
											{this.state.nationalities.map((nat) => (
												<option value={nat.name}>{nat.name}</option>
											))};
										</select>
									</div>
								</MDBCol>
							</div>
						);
					}
					if (key === 'currency') {
						return (
							<div style={{ marginBottom: '60px',width:"300px" }}>
								<MDBCol>
									<div className="form-group">
										<label htmlFor={key}>{temp+" ("+now2+") "}</label>
										<select
											className="form-control"
											id="exampleFormControlSelect1"
											name={key}
											onChange={this.changeHandler}
											value={this.state[key]}
											

										>
											<option>Please choose the currency</option>
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
							</div>
						);
					}
				}
				else if(constraints[5] === 'datepicker'){
					return(
						<div style={{ marginBottom: '60px' }}>
						<MDBRow style={{ paddingLeft: '30px', justifyItems: 'center',width:"250px" }}>
						<MDBCol>
						<MDBInput
							label={temp+" ("+now2+") "}
							type="date"
							class="material-icons prefix"
							id="materialFormRegisterNameEx"
							name={key}
							onChange={this.changeHandler}
							value={this.state[key]}
							required
						/>
						</MDBCol>
						</MDBRow>
						</div>
					);
				}
				 else {
					return (
						<div style={{ marginBottom: '60px' }}>
							<MDBRow style={{ paddingLeft: '30px', justifyItems: 'center' }}>
								<MDBCol>
									<MDBInput
										label={temp+" ("+now2+") "}
										value={this.state[key]}
										name={key}
										onChange={this.changeHandler}
										type="text"
										id="materialFormRegisterNameEx"
										required
									>
									</MDBInput>
								</MDBCol>
							</MDBRow>
						</div>
					);
				}
			}
		});
	};
	getArrayAtt = async (input) => {
		var arrConstraints = await axios
			.get('/routes/api/formTypes/getByFormTypeArray/' + input, {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				return res.data.data;
				//console.log(formTypeArray)
			});
		arrConstraints = arrConstraints['0'];
		var arrInputs = [];
		for (var prop in arrConstraints) {
			arrInputs.push(prop);
		}
		return arrInputs.map((key, index) => {
			return (
				<div style={{ marginBottom: '60px' }}>
					<MDBRow style={{ paddingLeft: '30px', justifyItems: 'center' }}>
						<MDBCol>
							<MDBInput
								label={key}
								value={this.state[key]}
								name={key}
								onChange={this.changeHandler}
								type="text"
								id="materialFormRegisterNameEx"
								required
							/>
						</MDBCol>
					</MDBRow>
				</div>
			);
		});
	};

	handleClick = (error) => {
		error.preventDefault();
		const keys = this.state.certainFormType['0'];
		
		var KEYS = [];
		for (var key in keys) {
			KEYS.push(key);
		}
		var payload2 = {};
		KEYS.map((key, index) => {
			if (key !== '__proto__' && key !== '_id' && key !== '__v') {
				payload2[key] = this.state[key];
			}
		});
		var apiBaseUrl = '/routes/api/userDynamicForms/CreatingForm';
		axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('jwtToken');
		axios
			.post(apiBaseUrl, payload2, { headers: { Authorization: localStorage.getItem('jwtToken') } })
			.then(function(response) {
				swal({
					title: "Good job!",
					text: "The Form has been created successfully!",
					icon: "success",
					button: "Aww yess!",
				  });
			})
			.catch((error) => {
				//console.log(error.response.data.error.details['0'].message)
				
			//	alert(error.response.data.error.details['0'].message)
			if(error.response.data.error.details)
				alert(error.response.data.error.details['0'].message || error.response.data.error || error.response.data.errmsg||error.response.data);
				else
				alert(error.response.data.errmsg||error.response.data.error||error.response.data)
				//console.log(error);
			});
	};

	render() {
		//  trans.setLanguage(this.props.lang)
		return (
			<div style={{ paddingLeft: '60px', justifyItems: 'center' }}>
				<MuiThemeProvider>
					{this.getAttributes()}
					<Button label="Submit" className="btn-block btn-rounded z-depth-1a"
								variant="omar"
								style={{marginTop:"50px",marginLeft: "50px",marginRight:"2500px",width:"100px", height:"40px" ,backgroundColor:"#a3dbf1"}} onClick={this.handleClick}
								 >
								 Submit
					</Button>
				</MuiThemeProvider>
			</div>
		);
	}
}
const style = {
	margin: 15
};

//ReactDOM.render(<CreateANewCompany />, document.getElementById('root'));

export default CreateANewCompany;
