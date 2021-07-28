import 'bootstrap/dist/css/bootstrap.css'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownItem, MDBDropdownMenu } from "mdbreact";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import trans from '../translations/spcTranslation'
//import {Dropdown} from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react';
import DropdownItem from 'react-bootstrap/DropdownItem';
import Footer from "../layout/footer"
import { Button } from "react-bootstrap"
import { conditionalExpression } from '@babel/types';
import { CommunicationSwapCalls } from 'material-ui/svg-icons';
import swal from 'sweetalert';

var mongoose = require('mongoose')

class EditInvCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attributes: [],
            validations: [],
            certainFormType: [],
            tmp: '',
            formTypeArray: '',
            governorate:[],
            cities:[],
            city:'',
            nationalities:[]
        }
    }
    componentDidMount = () => {
        // console.log(localStorage.getItem("formType"))
        // console.log(localStorage.getItem("lang"))
        // console.log(localStorage.getItem("formId"))
        

        axios.get('/routes/api/formTypes/getByFormType/' + localStorage.getItem('formType'), { headers: { "Authorization": localStorage.getItem('jwtToken') } })
            .then(res => {
                console.log(res.data.data)
                this.setState({
                    certainFormType: res.data.data
                   
                })
                console.log(this.state.certainFormType)
            })
        }
        
    changeHandler = event => {
                    this.setState({ [event.target.name]: event.target.value});
                };

    changeHandler2 = event => {
            
                this.setState({ [event.target.name] :event.target.value});
                axios.get('/routes/api/governorates/getByGovernorateName/' + event.target.value)        
                .then(res => {
                    
                    this.setState({cities: res.data.data})
                })
            }

        getAttributes = () => {
            const keys = Object.keys(this.state.certainFormType)
            var formType = this.state.certainFormType[keys]
            //console.log(formType)
            //console.log(this.state.certainFormType)
            var KEYS = []
            
            for (var key in formType) {
                KEYS.push(key)
            }
            //console.log(KEYS)
            return KEYS.map((key, index) => {
                if (key !== "id" && key !== "_v") {

                    var constraints = formType[key]
                    constraints = constraints.split(",")
                    //console.log(constraints)
                    if (constraints[0] === "array") {

                        return <div><h2>{key}</h2>
                            <h3>Please Insert Array of {key} in the Array page</h3></div>
                    }

                    else if (constraints[5]==='dropdownlist'){
                        if(key==="companyGovernorate")
                            {
                                axios.get('/routes/api/governorates/')        
                                .then(res => {
                                this.setState({governorate: res.data.data})
              
                                })
                                return <div style={{ marginBottom:"60px"}}>
                                <MDBCol>
                                <div className="form-group">
                                    <label htmlFor={key}>{key}</label>
                                    <select className="form-control"  
                                    id="exampleFormControlSelect1" name={key}
                                        onChange={this.changeHandler2} 
                                        value={this.state[key]} >
                                        <option>Please choose a governorate</option>
                                       {this.state.governorate.map((gov)=>(
                                <option value={gov.name}>{gov.name}</option>
                                ))};
                                        
                                    </select>
                                    </div>
                                </MDBCol>
                                <MDBCol>
                                <div className="form-group">
                                    <label htmlFor='companyCity'>companyCity</label>
                                    <select className="form-control"  
                                    id="exampleFormControlSelect1" name='companyCity'
                                        onChange={this.changeHandler} 
                                        value={this.state.companyCity}>
                                        <option>Please choose a city </option>
                                        {this.state.cities.map((city)=>(
                                <option value={city}>{city}</option>
                                ))};    
                                    </select>
                                    </div>
                                </MDBCol>
                                </div>
                            }
                            if(key==="investorNationality")
                            {
                                axios.get('/routes/api/nationalities/')        
                                .then(res => {
                                this.setState({nationalities: res.data.data})
              
                                })
                                return <div style={{ marginBottom:"60px"}}>
                                <MDBCol>
                                <div className="form-group">
                                    <label htmlFor={key}>{key}</label>
                                    <select className="form-control"  
                                    id="exampleFormControlSelect1" name={key}
                                        onChange={this.changeHandler} 
                                        value={this.state[key]} >
                                        <option>Please choose a nationality </option>
                                        {this.state.nationalities.map((nat)=>(
                                <option value={nat.name}>{nat.name}</option>
                                ))};
                                        
                                    </select>
                                    </div>
                                </MDBCol>
                                </div>
                            }
                            if(key==='currency')
                            {
                                
                                return <div style={{ marginBottom:"60px"}}>
                                <MDBCol>
                                <div className="form-group">
                                    <label htmlFor={key}>{key}</label>
                                    <select className="form-control"  
                                    id="exampleFormControlSelect1" name={key}
                                        onChange={this.changeHandler} 
                                        value={this.state[key]} >
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
                            }
                       
                    }
                    
                    else {
                        return <div style={{ marginBottom: "60px" }
                        } >
                            <MDBRow style={{ paddingLeft: '30px', justifyItems: "center" }}>
                                <MDBCol>
                                    <MDBInput
                                        label={key}
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
                        </div >
     
                         
                    }
                    
                    

                }

            })
        }
        getArrayAtt = async (input) => {

            var arrConstraints = await axios.get('/routes/api/formTypes/getByFormTypeArray/' + input, { headers: { "Authorization": localStorage.getItem('jwtToken') } })
                .then(res => {
                    return res.data.data
                    //console.log(formTypeArray)
                })
            arrConstraints = arrConstraints["0"]
            console.log(arrConstraints)
            var arrInputs = []
            for (var prop in arrConstraints) {
                arrInputs.push(prop)
            }
            console.log(arrInputs)
            return arrInputs.map((key, index) => {
                return (<div style={{ marginBottom: "60px" }}>
                    <MDBRow style={{ paddingLeft: '30px', justifyItems: "center" }}>
                        <MDBCol>
                            <MDBInput
                                label={key}
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
                </div>)
            })
            // var formTypeArray = this.state.formTypeArray[keysArray]
            // var KEYSARRAY = []
            // for (var key in formTypeArray) {
            //     KEYSARRAY.push(key)
            // }
            // KEYSARRAY.map((key, index) => {
            //     return <div style={{ marginBottom: "60px" }}>
            //         <MDBRow style={{ paddingLeft: '30px', justifyItems: "center" }}>
            //             <MDBCol>
            //                 <MDBInput
            //                     label={key}
            //                     value={this.state[key]}
            //                     name={key}
            //                     onChange={this.changeHandler}
            //                     type="text"
            //                     id="materialFormRegisterNameEx"
            //                     required
            //                 >
            //                 </MDBInput>
            //             </MDBCol>
            //         </MDBRow>
            //     </div>

            // })

        }

        handleClick = (error) => {
            error.preventDefault();
            console.log("hey")
            // console.log(this.state.certainFormType)
            const keys = this.state.certainFormType["0"]
            //const keys = Object.keys(this.state.certainFormType)
            //  console.log(keys)
            // var formType = this.state.certainFormType[keys]
            // console.log(formType)
            var KEYS = []
            for (var key in keys) {
                KEYS.push(key)
            }
            //var payload = []
            var payload2 = {}
            //payload2.push({formType: localStorage.getItem('formType')})
            KEYS.map((key, index) => {
                if (key !== "_proto" && key !== "_id" && key !== "_v") {
                    //payload2.push({ [key] : this.state[key] })
                    // key : this.state.key,
                    payload2[key] = this.state[key]


                }
            })

            //console.log(KEYS)

            var apiBaseUrl = "/routes/api/userDynamicForms/investorEditForm/"+localStorage.getItem('formId')

            //  console.log(payload2)
            //  console.log("hii")

            axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('jwtToken');
            axios.put(apiBaseUrl, payload2, { headers: { "Authorization": localStorage.getItem('jwtToken') } })
                .then(function (response) {

                    swal({
                        title: "Good job!",
                        text: "The Form has been updated successfully!",
                        icon: "success",
                        button: "Aww yess!",
                      });

                })
                .catch((error) => {
                    // alert(error.response.data.errmsg||error.response.data);
                    console.log(error)
                });

        }

        render() {
            //  trans.setLanguage(this.props.lang)
            return (

                <div style={{ paddingLeft: '60px', justifyItems: "center" }}>
                    <MuiThemeProvider>
                        {this.getAttributes()}
                        <Button 
                        className="btn-block btn-rounded z-depth-1a"
                        variant="omar"
                        style={{marginTop:"50px",marginLeft: "50px",marginRight:"2500px",width:"100px", height:"40px" ,backgroundColor:"#a3dbf1"}}
                        onClick={(this.handleClick)}
                        >
                        Submit
                        </Button>
                    </MuiThemeProvider>

                </div>
            )}
}
   const style = {
        margin: 15,
    };




    //ReactDOM.render(<CreateANewCompany />, document.getElementById('root'));


    export default EditInvCompany;