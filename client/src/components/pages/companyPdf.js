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
import html2canvas from "html2canvas";
import styled, { css } from "styled-components";
import { Button } from "react-bootstrap";
import egypt from "../../egypt.jpeg";
import gafi from "../../gafi.jpeg";

//import { Dropdown } from 'semantic-ui-react';
import axios from "axios";
import { blue200 } from "material-ui/styles/colors";

var mongoose = require("mongoose");

class PDF extends Component {
  state = {
    companyName: "",
    companies: [],
    viewedComp: []
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
          this.setState({ companies: res.data.data, sscManagers: [] });
        }
      });
    console.log(localStorage.getItem("PDFcomp"));
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: { value: event.target.value } });
  };

  printDocument() {
    const input = document.getElementById("divToPrint");

    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/jpeg");
      const img = new Image();
      var path = require("path");
      img.src = path.resolve(egypt);
      const img2 = new Image();
      var path2 = require("path");
      img2.src = path2.resolve(gafi);
      var pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [800, 1100]
      });

      pdf.addImage(imgData, "JPEG", 1, 1);
      pdf.addImage(img, "JPEG", 1, 1);
      pdf.addImage(img2, "JPEG", 13.2, 1);

      pdf.setFont("helvetica");
      pdf.setFontType("bold");
      pdf.setFontSize(30);
      pdf.text(6.2, 3, "Your Company");

      pdf.setFont("helvetica");
      pdf.setFontType("normal");
      pdf.setFontSize(15);
      pdf.text(1, 10, "© 2019 Copyright: GAFI");

      // pdf.output('dataurlnewwindow')
      pdf.save("download.pdf");
    });
  }

  getAttributes = () => {
    var Form;
    console.log(this.state.companies);
    for (let i = 0; i < this.state.companies.length; i++) {
      if (
        this.state.companies[i].companyName === localStorage.getItem("PDFcomp")
      )
        Form = this.state.companies[i];
    }
    console.log(localStorage.getItem("PDFcomp"));
    // console.log(this.state.viewedComp);

    var KEYS = [];
    // console.log(Form)
    for (var key in Form) {
      KEYS.push(key);
    }
    if (Form)
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
              }
            })}
          </Card.Body>
        </Card>
      );
  };

  render() {
    return (
      
      <div>
        
        <h1 style={{paddingLeft:"540px",marginTop:"100px",color:blue200}}>SAVE YOUR DOCUMENT</h1>
        <Button
          
          label="Save As PDF"
          variant="omar"
          size="sm"
          width="60px"
          height="8px"
          style={{
            marginTop: "100px",
            width: "120px",
            height: "70px",
            backgroundColor: "#a3dbf1",
            marginLeft:"680px"
            
          }}
          onClick={this.printDocument}
        >
          <i
            class="far fa-file-pdf"
            style={{ fontSize: "1.6em", left: "2%", color: "light blue" }}
          />
          <h5 style={{ fontSize: "15px" }}> Save As PDF</h5>{" "}
        </Button>
        
        
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
            <br />
            {this.getAttributes()}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<PDF />, document.getElementById("root"));
export default PDF;
