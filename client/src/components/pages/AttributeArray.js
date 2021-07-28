import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import swal from 'sweetalert';
import TextField from 'material-ui/TextField';
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
import { Button } from 'react-bootstrap';
import { conditionalExpression } from '@babel/types';

var mongoose = require('mongoose');

class AttributeArray extends Component {
	constructor(props) {
		super(props);
		this.state = {
			attributes: [],
			validations: [],
			certainFormType: [],
			nationalities: [],
			nationality:''
		};
	}
	componentDidMount = () => {
		axios
			.get('/routes/api/formTypes/getByFormTypeArray/' + localStorage.getItem('formTypeArray'), {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				this.setState({
					certainFormType: res.data.data
					
				});
				console.log(this.state.certainFormType)
			});
	};
	changeHandler = (event) => {
		this.setState({ [event.target.name]: event.target.value });
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
				if (constraints[5] === 'dropdownlist') {
					if (key === 'gender') {
						return (
							<div style={{ marginBottom: '60px' }}>
								<MDBCol>
									<div className="form-group">
										<label htmlFor={key}>{temp+" ("+now2+") "}</label>
										<select
											className="form-control"
											id="exampleFormControlSelect1"
											name={key}
											onChange={this.changeHandler}
											value={this.state[key]}
											style={{width:"350px"}}
										>
											<option>Please choose your gender</option>
											<option>Female</option>
											<option>Male</option>
										</select>
									</div>
								</MDBCol>
							</div>
						);
					}

					if (key === 'nationality') {
						axios.get('/routes/api/nationalities/').then((res) => {
							this.setState({ nationalities: res.data.data });
						});
						return (
							<div style={{ marginBottom: '60px' }}>
								<MDBCol>
									<div className="form-group">
										<label htmlFor={key}>{temp+" ("+now2+") "}</label>
										<select
											className="form-control"
											id="exampleFormControlSelect1"
											name={key}
											onChange={this.changeHandler}
											value={this.state[key]}
											style={{width:"350px"}}
										>
												<option>Please choose your nationality</option>
												{this.state.nationalities.map((nat) => (
												<option value={nat.name}>{nat.name}</option>
											))};
										</select>
									</div>
								</MDBCol>
							</div>
						);
					}
					if (key === 'type') {
						return (
							<div style={{ marginBottom: '60px' }}>
								<MDBCol>
									<div className="form-group">
										<label htmlFor={key}>{temp+" ("+now2+") "}</label>
										<select
											className="form-control"
											id="exampleFormControlSelect1"
											name={key}
											onChange={this.changeHandler}
											value={this.state[key]}
											style={{width:"350px"}}
										>
											<option>Please choose your type</option>
											<option>Person</option>
										</select>
									</div>
								</MDBCol>
							</div>
						);
					}
					if (key === 'identificationType') {
						return (
							<div style={{ marginBottom: '60px' }}>
								<MDBCol>
									<div className="form-group">
										<label htmlFor={key}>{temp+" ("+now2+") "}</label>
										<select
											className="form-control"
											id="exampleFormControlSelect1"
											name={key}
											onChange={this.changeHandler}
											value={this.state[key]}
											style={{width:"350px"}}
										>
											<option>Please choose your Identification Type</option>
											<option>National ID</option>
											<option>Passport</option>
										</select>
									</div>
								</MDBCol>
							</div>
						);
					}
					if (key === 'typeOfManagers') {
						return (
							<div style={{ marginBottom: '60px' }}>
								<MDBCol>
									<div className="form-group">
										<label htmlFor={key}>{temp+" ("+now2+") "}</label>
										<select
											className="form-control"
											id="exampleFormControlSelect1"
											name={key}
											onChange={this.changeHandler}
											value={this.state[key]}
											style={{width:"350px"}}
										>
											<option>Please choose the type of the manager</option>
											<option>President</option>
											<option>Vice President</option>
											<option>CEO</option>
											<option>General Manager</option>
											<option>Branch Manager</option>
											<option>Department Manager</option>
											<option>Supervisor</option>
											<option>CFO</option>
											<option>COO</option>
											<option>CTO</option>
											<option>Section Lead</option>
											<option>Forman</option>
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
									/>
								</MDBCol>
							</MDBRow>
						</div>
					);
				}
			}
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
			if (key !== '__proto__' && key !== '_id' && key !== '__v'&& key!=='formTypeArray' ) {
				//payload2.push({ [key] : this.state[key] })
				// key : this.state.key,
				payload2[key] = this.state[key];
			}
		});
		payload2["formTypeArray"]= localStorage.getItem("formTypeArray")
		///CHANGE THIS PART WITH THE NEW ROUTE
		console.log(payload2)
		var apiBaseUrl = '/routes/api/userDynamicForms/addAttributeToArray';

		axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
		axios
			.put(apiBaseUrl, payload2, { headers: { Authorization: localStorage.getItem('jwtToken') } })
			.then(function(response) {
				swal({
					title: "Good job!",
					text: "The Array has been created successfully!",
					icon: "success",
					button: "Aww yess!",
				  });
			})
			.catch((error) => {
				swal(error.response.data.error.details['0'].message||error.response.data.msg || error.response.data.error || error.response.data);
				console.log(error);
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

export default AttributeArray;
