import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import swal from'sweetalert';
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBDropdownMenu
} from "mdbreact";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import trans from "../translations/spcTranslation";
import { Dropdown } from "semantic-ui-react";
import DropdownItem from "react-bootstrap/DropdownItem";
import Footer from "../layout/footer";
import { Button } from "react-bootstrap";
import { conditionalExpression } from "@babel/types";

var mongoose = require("mongoose");

class NewDependency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      atts: false,
      forms: [],
      formType: "",
      att: "",
      dependAtt: "",
      is: "",
      min: "",
      max: "",
      valid: "",
      length: "",
      payload: {}
    };
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount = () => {
    axios
      .get("/routes/api/formTypes/", {
        headers: { Authorization: localStorage.getItem("jwtToken") }
      })
      .then(res => {
        //console.log(res.data.data);
        this.setState({ forms: res.data.data });
      })
      .catch(err => {
        swal(err);
      });
  };

  handleClick1 = error => {
    error.preventDefault();
    if (
      this.state.formType !== "" &&
      this.state.formType !== "Please Provide a Form Type"
    ) {
      var payload = this.state.payload;
      payload.formType = this.state.formType;
      this.setState({ atts: true, payload: payload });
    } else swal("Please provide a Form Type");
  };

  handleClick2 = error => {
    error.preventDefault();
    if (
      this.state.att === "" ||
      this.state.att === "Please Provide an Attribute"
    ) {
      swal("Please Provide an Attribute");
      return;
    }
    if (
      this.state.dependAtt === "" ||
      this.state.dependAtt === "Please Provide an Attribute to depend on"
    ) {
      swal("Please provide a depending Attribute");
      return;
    }
    var formType = this.state.formType;
    // console.log(formType)
    var forms = this.state.forms;
    var form;
    for (let i = 0; i < forms.length; i++) {
      if (forms[i].formType === formType) form = forms[i];
    }

    var att = this.state.att
    var consts = form[att]
    consts = consts.split(",")
    var attType = consts[0]

    var dependAtt = this.state.dependAtt
    var consts = form[dependAtt]
    consts = consts.split(",")
    var dependAttType = consts[0]

    if(this.state.is===""){
        swal("Please provide a value for depending Attribute")
        return
    }
    if(this.state.is!=="" && dependAttType==='number'){
        if(!parseInt(this.state.is)) {
            swal("Please provida a number in the value of depending attribute")
            return
        }
    }
    if (this.state.min !== "")
    if (!parseInt(this.state.min)) {
      swal("Please provide a number in the minimum field");
      return;
    }
    if (this.state.max !== "")
    if (!parseInt(this.state.max)) {
      swal("Please provide a number in the maximum field");
      return;
    }

    if(this.state.value!=="" && attType==='number'){
        if(!parseInt(this.state.value)) {
            swal("Please provida a number in the exact value field")
            return
        }
    }
    if (this.state.length !== "")
    if (!parseInt(this.state.length)) {
      swal("Please provide a number in the length field");
      return;
    }

    var constraints = "";

    constraints = constraints + this.state.dependAtt + ",";
    constraints = constraints + this.state.is + ",";
    constraints = constraints + this.state.min + ",";
    constraints = constraints + this.state.max + ",";
    constraints = constraints + this.state.value + ",";
    constraints = constraints + this.state.length + ",";

    
    var payload = this.state.payload;
    payload[this.state.att] = constraints;
    this.setState({ payload: payload });
    // swal({
    //   title: "Good job!",
    //   text: "Attribute Added Successfully",
    //   icon: "success",
    //   button: "Aww yess!",
    //   });
     swal("Attribute Added Successfully");
  };

  handleClick3 = () => {
    this.setState({
        att: "",
        dependAtt: "",
        is: "",
        min: "",
        max: "",
        valid: "",
        length: "",
        value:""
    });
  };

  handleClick4 = () => {
    var payload = this.state.payload;
    axios
      .post("/routes/api/dependencies/NewDependencies", payload, {
        headers: { Authorization: localStorage.getItem("jwtToken") }
      })
      .then(res => {
        swal({
					title: "Good job!",
					text: "Form Type Array created successfully",
					icon: "success",
					button: "Aww yess!",
				  });
        //swal("Form Type Array created successfully");
        setTimeout("document.location.href = '/createNewDependency';",3500)
       // document.location.href = "/createNewDependency";
      })
      .catch(err => {
        console.log(err.response.data);
        swal(err.response.data.error);
      });
  };

  getAtts = () => {
    var formType = this.state.formType;
    // console.log(formType)
    var forms = this.state.forms;
    var form;
    for (let i = 0; i < forms.length; i++) {
      if (forms[i].formType === formType) form = forms[i];
    }
    var props = [];
    for (var prop in form) {
      console.log(prop);
      var constraints = form[prop];
      constraints = constraints.split(",");
      if (
        prop !== "formTypeArray" &&
        prop !== "_id" &&
        (constraints[0] === "string" || constraints[0] === "number")
      )
        props.push(prop);
    }
    return props.map(att => {
      return <option>{att}</option>;
    });
  };

  getFormType = () => {
    var forms = this.state.forms;
    return forms.map(Form => {
      if (Form.formType) return <option>{Form.formType}</option>;
    });
  };

  getDependatts = () => {
    if (
      this.state.att === "" ||
      this.state.att === "Please Provide an Attribute"
    )
      return;
    var att = this.state.att;
    var formType = this.state.formType;
    // console.log(formType)
    var forms = this.state.forms;
    var form;
    for (let i = 0; i < forms.length; i++) {
      if (forms[i].formType === formType) form = forms[i];
    }
    var props = [];
    for (var prop in form) {
      console.log(prop);
      var constraints = form[prop];
      constraints = constraints.split(",");
      if (prop === att) break;
      if (
        prop !== "formTypeArray" &&
        prop !== "_id" &&
        (constraints[0] === "string" || constraints[0] === "number")
      )
        props.push(prop);
    }
    return props.map(dependatt => {
      return <option>{dependatt}</option>;
    });
  };

  getDeps = () => {
    var payload = this.state.payload;
    var props = [];
    for (var prop in payload) {
        if(prop!=="formType")
      props.push(prop);
    }
    return props.map(att => {
      return <h6>{att}</h6>;
    });
  };

  render = () => {
    var start = (
      <div style={{ paddingLeft: "60px", justifyItems: "center" }}>
        <br />
        <br />
        <br />
        <br />
        <MuiThemeProvider>
          <MDBCol>
            <div className="form-group">
              <label htmlFor="Type of Input"><h3>Form Type</h3></label>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                name="formType"
                onChange={this.changeHandler}
                value={this.state.formType}
                style={{ width: "300px" }}
              >
                <option>Please Provide a Form Type</option>
                {this.getFormType()}
              </select>
            </div>
          </MDBCol>
          <Button
            className="text-center mb-3"
            label="Add Attributes"
            primary={true}
            onClick={this.handleClick1}
            style={{marginLeft:"20px", width: '120px', height: '55px',backgroundColor:"#a3dbf1" }}
            variant="omar"
          >
          Add Attributes
          </Button>
        </MuiThemeProvider>
      </div>
    );
    var min = (
      <div>
        <MDBRow style={{ paddingLeft: "30px", justifyItems: "center" }}>
          <MDBCol>
            <MDBInput
              label="Minimum Length or Value"
              value={this.state.min}
              name="min"
              onChange={this.changeHandler}
              type="text"
              id="materialFormRegisterNameEx"
              required
            />
          </MDBCol>
        </MDBRow>
      </div>
    );

    var max = (
      <div>
        <MDBRow style={{ paddingLeft: "30px", justifyItems: "center" }}>
          <MDBCol>
            <MDBInput
              label="Maximum Length or Value"
              value={this.state.max}
              name="max"
              onChange={this.changeHandler}
              type="text"
              id="materialFormRegisterNameEx"
              required
            />
          </MDBCol>
        </MDBRow>
      </div>
    );

    var attributes = (
      <div style={{ paddingLeft: "60px", justifyItems: "center" }}>
        <br />
        <br />
        <br />
        <br />
        <h1>{this.state.formType}</h1>
        <h3>Avaliable Dependencies till now</h3>
        {this.getDeps()}
        <MuiThemeProvider>

          <MDBCol>
            <div className="form-group">
              <label htmlFor="Type of Input"><h4>Attribute</h4></label>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                name="att"
                onChange={this.changeHandler}
                value={this.state.att}
                style={{ width: "300px" }}
              >
                <option>Please Provide an Attribute</option>
                {this.getAtts()}
              </select>
            </div>
          </MDBCol>

          <MDBCol>
            <div className="form-group">
              <label htmlFor="Type of Input"><h4>Depending Attribute</h4></label>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                name="dependAtt"
                onChange={this.changeHandler}
                value={this.state.dependAtt}
                style={{ width: "300px" }}
              >
                <option>Please Provide an Attribute to depend on</option>
                {this.getDependatts()}
              </select>
            </div>
          </MDBCol>

          <MDBRow style={{ paddingLeft: "30px", justifyItems: "center" }}>
            <MDBCol>
              <MDBInput
                label="Value of Depending Attribute"
                value={this.state.is}
                name="is"
                onChange={this.changeHandler}
                type="text"
                id="materialFormRegisterNameEx"
                required
              />
            </MDBCol>
          </MDBRow>

          {min}
          {max}

          <MDBRow style={{ paddingLeft: "30px", justifyItems: "center" }}>
            <MDBCol>
              <MDBInput
                label="Exact Value"
                value={this.state.value}
                name="value"
                onChange={this.changeHandler}
                type="text"
                id="materialFormRegisterNameEx"
                required
              />
            </MDBCol>
          </MDBRow>

          <MDBRow style={{ paddingLeft: "30px", justifyItems: "center" }}>
            <MDBCol>
              <MDBInput
                label="Length"
                value={this.state.length}
                name="length"
                onChange={this.changeHandler}
                type="text"
                id="materialFormRegisterNameEx"
                required
              />
            </MDBCol>
          </MDBRow>

          <Button
            label="Save Attribute"
            primary={true}
            onClick={this.handleClick2}
            className="text-center mb-3"
            style={{ width: '120px', height: '55px',backgroundColor:"#a3dbf1" }}
            variant="omar"
          >
          Save Attribute
          </Button>
          <Button
            label="Next Attribute"
            primary={true}
            onClick={this.handleClick3}
            className="text-center mb-3"
            style={{ width: '120px', height: '55px',backgroundColor:"#a3dbf1" }}
            variant="omar"
          >
          Next Attribute
          </Button>
          <Button
            label="Submit Dependencies"
            primary={true}
            onClick={this.handleClick4}
            className="text-center mb-3"
            style={{ width: '140px', height: '55px',backgroundColor:"#a3dbf1" }}
            variant="omar"
          >
          Submit Dependencies
          </Button>
        </MuiThemeProvider>
      </div>
    );
    return this.state.atts ? attributes : start;
  };
}

export default NewDependency;
