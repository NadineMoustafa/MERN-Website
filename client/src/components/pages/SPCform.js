import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
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

// import {MDBSelect} from 'mdbreact';


var mongoose = require('mongoose')

class SPCform extends Component{

    constructor(props){
        super(props);
        this.state = {
            // userId: {
            //   value : '',
            //  },
            companyName:'',
            companyGovernorate:'',
            companyAddress:'',
            companyCity:'' ,
            companyTelephone: '',
            companyFax: '',
            companyNameInEnglish: '',
            currency: '',
            type:'',
            equityCapital:'',
            governorate:[],
            cities:[]

        };

    }
    componentDidMount(){
      axios.get('/routes/api/governorates/')        
        .then(res => {
              this.setState({governorate: res.data.data})
              
          })
    }

    
      handleClick(event){


      

 
        var apiBaseUrl = "/routes/api/users/CreatingForm";
        var payload={
         //"userId":mongoose.Types.ObjectId('5ca7b4748be2725704f230bc'),
          "companyName": this.state.companyName,
          "companyGovernorate": this.state.companyGovernorate,
          "companyAddress": this.state.companyAddress,
          "companyCity": this.state.companyCity,
          "companyTelephone": this.state.companyTelephone,
          "companyFax": this.state.companyFax,
          "companyNameInEnglish": this.state.companyNameInEnglish,
          "currency": this.state.currency,
          "type" : 'SPCForm',
          "equityCapital" : this.state.equityCapital,
          "lawyerComments" : [],
          "reviewerComments" : [],
          "creationDate": "2018-4-7",
          "status" : "Unassigned"
        }
        
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
        axios.post(apiBaseUrl, payload,{headers: { "Authorization": localStorage.getItem('jwtToken') }})
       .then(function (response) {
         console.log(response);
         
          swal('SPCForm Created Successfully') ;

       })
       .catch((error)=> {
         swal(error.response.data.errmsg||error.response.data);
         console.log(error.response)
       });
      }
      
      changeHandler = event => {
        
          this.setState({ [event.target.name] :event.target.value});
      
      };
      changeHandler2 = event => {
      
        this.setState({ [event.target.name] :event.target.value});
        axios.get('/routes/api/governorates/getByGovernorateName/' + event.target.value)        
        .then(res => {
              this.setState({cities: res.data.data})
          })
    
    };
      validateForm() {
        return this.state.companyName.length >=3 &&
        this.state.companyName.length <=50 
        && this.state.companyAddress.length >=5 && this.state.companyAddress.length <=50
        && this.state.companyNameInEnglish.length <=50
        }

    render() {
    //  trans.setLanguage(this.props.lang)
      return (
        <div style={{ paddingLeft:'60px',justifyItems:"center"}}>
          <MuiThemeProvider>
            <div>
            {/* <AppBar
               title={trans.title}
             /> */}
						{/* <AppBar
               title="Create your SPCForm"
               /> */}

						<br />
						<MDBRow>
							<MDBCol>
								<MDBInput
									label={trans.name}
									value={this.state.companyName}
									className={
										this.state.companyName.length >= 3 && this.state.companyName.length <= 50 ? (
											'is-valid'
										) : (
											'is-invalid'
										)
									}
									name="companyName"
									onChange={this.changeHandler}
									type="text"
									id="materialFormRegisterNameEx"
									required
								>
									<div className="valid-feedback">Looks good!</div>
									<div className="invalid-feedback">name must be in arabic and min 3 characters!</div>
								</MDBInput>
							</MDBCol>
							<br />

							<MDBCol>
								<MDBInput
									value={this.state.companyTelephone}
									className={
										this.state.companyTelephone.length <= 15 &&
										this.state.companyTelephone.length >= 8 ? (
											'is-valid'
										) : (
											'is-invalid'
										)
									}
									name="companyTelephone"
									onChange={this.changeHandler}
									type="text"
									id="materialFormRegisterNameEx"
									label="Company Telephone"
								>
									<div className="valid-feedback">Looks good!</div>
									<div className="invalid-feedback">
										Note: It should be more than or equal 8 characters and less than or equal 15
										characters
									</div>
								</MDBInput>
							</MDBCol>

							<br />
							<MDBCol>
								<MDBInput
									value={this.state.companyAddress}
									className={
										this.state.companyAddress.length <= 50 &&
										this.state.companyAddress.length >= 5 ? (
											'is-valid'
										) : (
											'is-invalid'
										)
									}
									name="companyAddress"
									onChange={this.changeHandler}
									type="text"
									id="materialFormRegisterNameEx"
									label="Company Address"
									required
								>
									<div className="valid-feedback">Looks good!</div>
									<div className="invalid-feedback">
										Note: It should be more than or equal 5 characters and less than or equal 50
										characters
									</div>
								</MDBInput>
							</MDBCol>
						</MDBRow>
						<br />
						<MDBRow>
							<MDBCol>
								<div className="form-group">
									<label htmlFor="companyGovernorate">{trans.governorate}</label>
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
									<label htmlFor="companyCity">{trans.city}</label>
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
									className={
										this.state.companyFax.length <= 20 && this.state.companyFax.length >= 5 ? (
											'is-valid'
										) : (
											'is-invalid'
										)
									}
									onChange={this.changeHandler}
									type="text"
									id="materialFormRegisterNameEx"
									label="Company Fax"
									required
								>
									<div className="valid-feedback">Looks good!</div>
									<div className="invalid-feedback">
										Note: It should be more than or equal 5 characters and less than or equal 20
										characters
									</div>
								</MDBInput>
							</MDBCol>
							<MDBCol>
								<MDBInput
									value={this.state.companyNameInEnglish}
									className={this.state.companyNameInEnglish.length <= 50 ? 'is-valid' : 'is-invalid'}
									name="companyNameInEnglish"
									onChange={this.changeHandler}
									type="text"
									id="materialFormRegisterNameEx"
									label="Company Name In English"
									required
								>
									<div className="valid-feedback">Looks good!</div>
									<div className="invalid-feedback">
										Note: It should be less than or equal 50 characters
									</div>
								</MDBInput>
							</MDBCol>

							<br />

							<MDBCol>
								<MDBInput
									value={this.state.equityCapital}
									className={this.state.equityCapital < 100000 ? 'is-valid' : 'is-valid'}
									name="equityCapital"
									onChange={this.changeHandler}
									type="text"
									id="materialFormRegisterNameEx"
									label="Equity Capital"
									required
								>
									<div className="valid-feedback">
										Note: if you are not Egyptian, the equity capital should be more than or equal
										10000
									</div>
								</MDBInput>
							</MDBCol>
						</MDBRow>

						<RaisedButton
							label={trans.button}
							primary={true}
							style={style}
							disabled={!this.validateForm()}
							onClick={(event) => this.handleClick(event)}
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

ReactDOM.render(<SPCform />, document.getElementById('root'));

export default SPCform;
