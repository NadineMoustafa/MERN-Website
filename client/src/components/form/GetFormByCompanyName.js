import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Dropdown } from "react-bootstrap";
import RaisedButton from "material-ui/RaisedButton";
import style from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Table } from "semantic-ui-react";
import { Card } from "react-bootstrap";
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from "mdbreact";
import jsPDF from "jspdf";
import { Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import styled, { css } from "styled-components";
import trans from "../translations/searchCompanyTranslation";
import Select  from "react-select";
import {components} from "react-select"
import options from "react-select"
import search from '../../back.jpg';

//import { Dropdown } from 'semantic-ui-react';
import axios from "axios";

var mongoose = require("mongoose");

class MyCompany extends Component {
  state = {
    companyName: "",
    companies: [],
    viewedComp: [] ,
  };

  componentDidMount = () => {
    axios
      .get("/routes/api/dynamicForms/", {
        headers: { Authorization: localStorage.getItem("jwtToken") }
      })
      .then(res => {
        this.setState({
          companies: res.data.data
        });
        {
          this.state.companies.map((nat,index) =>{
            var o = {label:nat.companyName,value:index}
            this.state.viewedComp.push(o)
          }
          );
        }
        // console.log(this.state.companies)
        console.log(this.state.viewedComp);
      });
  };

  tabRow() {
    return this.state.companies.map(function(company, i) {
      return (
        <Dropdown.Item key={i}>
          <h6>{company}</h6>
        </Dropdown.Item>
      );
    });
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: { value: event.target.value } });
  };

  handleClick=(opt)=> {
    this.setState({value:opt.label})
  }

  getAttributes = () => {
    var Form;
    console.log(this.state.companies)
      for(let i=0;i<this.state.companies.length;i++){
        if(this.state.companies[i].companyName===this.state.value)
        Form = this.state.companies[i]
      }
      console.log(Form)
      console.log("hi")
      var KEYS = [];
      // console.log(Form)
      for (var key in Form) {
        KEYS.push(key);
      }
      if(Form)
      return (
        // <div style={{marginRight:"100px"}}>
        <Card >
          <Card.Body>
            {KEYS.map((key, index) => {
              if (
                key !== "_proto" &&
                key !== "_id" &&
                key !== "formType" &&
                key !== "investorId" &&
                key !== "lawyerId" &&
                key !== "reviewerId" &&
                key !== "__v" &&
                key !== "reviewerComments" &&
                key !== "lawyerComments" &&
                key !== "status" &&
                key !== "fees" &&
                key !== "investorNationality" 
              ) {
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
                var constraints = Form[key];
                if (Array.isArray(constraints)) {
                  if (!constraints["0"]) return;
                  var keys = [];
                  for (var att in constraints["0"]) {
                    keys.push(att);
                  }
                }
                if (key==="creationDate"){
                  var date=constraints.substring(0,10);
                  return (
                    <div>
                      <div key={key}>
                        <h3>
                          <i class="fas fa-circle" style={{fontSize:'0.5em'}}/> {temp} : 
                            <span style={{ textAlign: 'center' }} />{' '}
                            <span style={{ color: '#9ad1e7' }}> {date}{" "}</span>{' '}
                        </h3>
                      </div>
                      
                    </div>
                  );

                }
                else{
                return (
                  <div>
                    <div key={key}>
                      <h3>
                        <i class="fas fa-circle" style={{fontSize:'0.5em'}}/> {temp} : 
                          <span style={{ textAlign: 'center' }} />{' '}
                          <span style={{ color: '#9ad1e7' }}> {constraints}{" "}</span>{' '}
                      </h3>
                    </div>
                    
                  </div>
                );
              }
              }
            })}
          </Card.Body>
        </Card>
        //</div>
      );
  };
  

  render() {
    trans.setLanguage(this.props.lang);
    const { Option } = components;
     const IconOption = (props) => (
    <Option {...props}>
      <i class="fas fa-building"></i> 
      {props.data.label}
    </Option>
);
// var n = (
// <div style={{paddingTop :"110px" ,fontSize:"1.7em"}}>
//          <i class="fas fa-search" ></i>
//          </div>
// )
  return (
    
    <div >
    
      <div >
      <section style={{paddingRight:"100px", display:"flex", justifyContent: 'center',width:"100%" ,height:"700px", backgroundImage:"url("+search+")",backgroundRepeat:"no-repeat",backgroundSize:"100% 100%",alignItems:"center"}}>

      <div >
      
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

        <div className="app" >

          <div className="container" style={{width:"400px" ,marginLeft:"120px" }}>
           <Select options={this.state.viewedComp} onChange={this.handleClick} 
            components={{Option: IconOption }}  selected={options} > 
           </Select>
           <br />
           
           <div style={{paddingRiht:"100px",width:"800px" }}>{this.getAttributes()} </div>
           
          </div>
        </div>
        
        
      </div>
      </section>
      </div>
      </div>
    );
  }
}

// ReactDOM.render(<MyCompany />, document.getElementById('root'));
export default MyCompany;