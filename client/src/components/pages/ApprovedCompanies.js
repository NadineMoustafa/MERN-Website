import  React, { Component } from 'react';
import axios from 'axios';
import '../../App.css';
import Table from 'react-bootstrap/Table'
import Navbar from 'react-bootstrap/Navbar'
import {Badge} from 'react-bootstrap'
import trans from '../translations/approvedTranslation'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import styled, { css } from 'styled-components'
import style from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {MDBIcon } from "mdbreact";
import {Button,Card} from"react-bootstrap"
import egypt from '../../egypt.jpeg'
import gafi from '../../gafi.jpeg'
import swal from 'sweetalert';

class ApprovedCompanies extends Component {
  state = {
    approvedCompanies: [],
    companyname: "",
  };
  componentDidMount() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwtToken");
    axios
      .get("/routes/api/userDynamicForms/getInvestorApprovedCompanies", {
        headers: { Authorization: localStorage.getItem("jwtToken") }
      })
      .then(res => {
        if (Array.isArray(res.data.data)) {
          this.setState({ approvedCompanies: res.data.data, sscManagers: [] });
        }
      });
    console.log(this.state.approvedCompanies);
  }
  changeHandler = event => {
    this.setState({ [event.target.name]: { value: event.target.value } });
  };
 

  getAttributes = () => {
    return this.state.approvedCompanies.map((Form, index) => {
      
      var b = (
        <Button
          
          label="Save As PDF"
          variant="omar"
          href="/companyPdf"
          
          size="sm"
          width="60px"
          height="8px"
          style={{
            marginTop: "100px",
            width: "150px",
            height: "50px",
            backgroundColor: "#a3dbf1"
          }}
          onClick= {()=>{localStorage.setItem(
            "PDFcomp",
            Form.companyName
          )}}
        >
          <i class="fas fa-download" style={{ fontSize: "1.6em", left: "2%", color: "light blue" }}></i>
          <h5 style={{ fontSize: "15px" }}>Download</h5>{" "}
        </Button>
      );
      var KEYS = [];
      // console.log(Form)
      for (var key in Form) {
        KEYS.push(key);
      }
      return (
        <Card>
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
              }})
              }
         </Card.Body>
          {this.state.approvedCompanies.length > 0 ? b : null}
        </Card>
      );
    });
  };

  render() {
    trans.setLanguage(this.props.lang);
  
    return (
      <div
        style={{
          paddingLeft: "60px",
          flexDirection: "row",
          justifyContent: "flex-end"
        }}
      >
        (
        <div>
          <div style={{ paddingLeft: "44%" }} />
          <div
            id="divToPrint"
            className="mt4"
            {...css({
              backgroundColor: "#f5f5f5",
              width: "210mm",
              minHeight: "297mm",
              marginLeft: "auto",
              marginRight: "auto"
            })}
          >
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            {this.getAttributes()}

            
          </div>
        </div>
      </div>
    );
  }
}
export default ApprovedCompanies;