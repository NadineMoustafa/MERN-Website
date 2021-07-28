import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import Table from "react-bootstrap/Table";
import { Button, Container, ButtonGroup ,ButtonToolbar} from "react-bootstrap";
import "mdbreact/dist/css/mdb.css";
import AddCommentsLawyer from '../pages/AddCommentsLawyer'
import Cardd from "../form/Card";
import GetAllUserForms from "../form/GetAllUserForms";
import { Dropdown, Card } from "react-bootstrap";
import { MDBProgress } from 'mdbreact'
const mongoose = require("mongoose");
var $ = require("jquery")(window);

// tabRow(){
//   return this.state.companies.map(function(company,i){
//       return <GetAllUserForms company={company} key={i} />;
//   });
// }

class Companies extends Component {
  state = {
    companies: [],
    modalShow: false 
  };
  redirectEdit(formId,formType){
    console.log(formType)
    localStorage.setItem('formId',formId)
    localStorage.setItem('formType',formType)
   document.location.href='/EditLawyerCompany'
  }
  componentDidMount() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("jwtToken");
    axios
      .get(
        "/routes/api/userDynamicForms/getLawyerInProgressCases",
        { headers: { Authorization: localStorage.getItem("jwtToken") } }
      )
      .then(res => {
        if (Array.isArray(res.data.data)) {
          this.setState({ companies: res.data.data });
        }
        console.log(this.state.companies)
      })
      .catch(err => {
        alert("" + err);
      });
  }

  sort = () => {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios
      .get(
        "/routes/api/userDynamicForms/AllFormSortedByFormId/",
        { headers: { Authorization: localStorage.getItem("jwtToken") } }
      )
      .then(res => {
        this.setState({ companies: res.data.data });
        alert("Cases have been sorted");
      })
      .catch(err => {
        console.log(err);
      });
  };
  sortByCreationDate = () => {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios
      .get(
        "/routes/api/userDynamicForms/AllformsSortedByformDate/",
        { headers: { Authorization: localStorage.getItem("jwtToken") } }
      )
      .then(res => {
        this.setState({ companies: res.data.data });
        alert("Cases have been sorted");
      })
      .catch(err => {
        console.log(err);
      });
  };


  accept = formId => {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios
      .put(
        "/routes/api/userDynamicForms/accept/" +
          mongoose.Types.ObjectId(formId),
        { headers: { Authorization: localStorage.getItem("jwtToken") } }
      )
      .then(res => {
        alert("Form updated Succesfully");
        document.location.href = "/getCaseLawyerSPC";
      });
  };


  calculateFees = formId => {
    console.log("hi");
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios.put(
      "/routes/api/userDynamicForms/calculatingFees/" +
        mongoose.Types.ObjectId(formId),
      { headers: { Authorization: localStorage.getItem("jwtToken") } }
    );
  };

  getAttributes = () => {
    let modalClose = () => this.setState({ modalShow: false });
    return this.state.companies.map((Form, index) => {
      var KEYS = [];
      // console.log(Form)
      for (var key in Form) {
        KEYS.push(key);
      }
      return (
        <Card>
          <Card.Body>
            <div>
              {KEYS.map((key, index) => {
                if (
                  key !== "_proto" &&
                  key !== "_id" &&
                  key !== "formType" &&
                  key !== "investorId" &&
                  key !== "lawyerId" &&
                  key !== "reviewerId" &&
                  key !== "__v"
                ) {
                  var constraints = Form[key];
                  if (Array.isArray(constraints)) {
                   if(!constraints["0"]) return
                    var keys = []
                     for (var att in constraints["0"]) {
                      keys.push(att);
                       } 

                       if(key==="lawyerComments"){
                     return (<div> <h3><i class="fas fa-genderless" />LawyerComments</h3>
                     { keys.map((att, index) => {

                      return (
                            <h5 style={{paddingLeft:"5%"}}>
                              <i class="fas fa-circle" /> 
                              {constraints["0"][att]}
                            </h5>
                      );
                    })
                  }
                  </div>)
                  
                   }
                   else if(key==="reviewerComments"){
                    return (<div> <h3><i class="fas fa-genderless" />ReviewerComments</h3>
                    { keys.map((att, index) => {

                     return (
                           <h5 style={{paddingLeft:"5%"}}>
                             <i class="fas fa-genderless" /> 
                             {constraints["0"][att]}
                           </h5>
                     );
                   })
                 }
                 </div>)
                   }
                   else{
                    return (<div> <h3><i class="fas fa-genderless" />{key}</h3>
                    { keys.map((att, index) => {

                     return (

                           <h5 style={{paddingLeft:"5%"}}>
                             <i class="fas fa-genderless"  /> {att} :
                             {constraints["0"][att]}
                           </h5>
                     );
                   })
                 }
                 </div>)
                   }
                  } 

                  return (
                    <div>
                      <div key={key}>
                        <h3>
                          <i class="fas fa-circle" style={{fontSize:'0.5em'}}/> {key} : {constraints}{" "}
                        </h3>
                      </div>
                    </div>
                  );
                  }
              }
            )}
              {/* <MDBProgress  material value={35} color="dark" height="35px">
               <h3> In progress Lawyer </h3>
                </MDBProgress> */}
                
              <div  style={{textAlign:'right'}}>
                <ButtonGroup size="sm" className="mt-3">
                  <Button
                    variant="outline-blue"
                    style={{ width: "250px", height: "115px" }}
                  >
                    <h3>
                      <i
                        class="fas fa-handshake"
                        style={{ fontSize: "1em" }}
                        onClick={() => this.accept(Form._id)}
                      />{" "}
                      <br /> ACCEPT CASE
                    </h3>
                  </Button>
                  <Button
                    variant="outline-blue"
                    block
                    style={{ width: "250px", height: "115px" }}
                    onClick={() => this.calculateFees(Form._id)}
                  >
                    <h3>
                      <i
                        class="fas fa-money-bill-alt"
                        style={{ fontSize: "1em" }}
                      />{" "}
                      <br /> Calculate The Fees
                    </h3>
                  </Button>
                  {/* <Button
                    variant="outline-blue"
                    block
                    style={{ width: "250px", height: "115px" }}
                    onClick={()=>this.redirectEdit(Form._id,Form.formType)}
                  >
                    <h3>
                      <i
                        class="fas fa-edit"
                        style={{ fontSize: "1em" }}
                      />{" "}
                      <br /> Edit
                    </h3>
                  </Button> */}
                  <ButtonToolbar>
                    <Button
                    variant="outline-blue"
                    block
                    onClick={() => this.setState({ modalShow: true })}
                    style={{width:"250px",height:"115px"}}
                    >
                    <h3>
                    <i class="fas fa-comment" style={{fontSize:'1em'}}></i>
                    <br />
                    Add Comments
                    </h3>
                    </Button>
                    <AddCommentsLawyer
                    show={this.state.modalShow}
                    onHide={modalClose}
                    formId={Form._id}
                    />
                    </ButtonToolbar><br />
                </ButtonGroup>
                <div>
                {Form.status==='Reviewer rejected'?<div><MDBProgress  material value={60} color="dark" height="63px"><h3 style={{color:"#64b9e0", fontSize:'30px'}}>Reviewer Rejected <br/> 60%</h3></MDBProgress><br/><Button type="button"  variant="dark" onClick={()=>this.redirectEdit(Form._id,Form.formType)} class="btn btn-info"><h3 style={{color:"#64b9e0", fontSize:'15px'}}>Edit Form<br/><i class="fas fa-edit"></i></h3></Button></div>:null}
                {Form.status==='In progress Lawyer'?<MDBProgress  material value={50} color="dark" height="63px"><h3 style={{color:"#64b9e0", fontSize:'30px'}}>Lawyer Accepted <br/>50% </h3></MDBProgress>:null}
                </div>
                
              </div>
            </div>
          </Card.Body>
        </Card>
      );
    })};

  render() {
    
    return (
      <div>
        <div>
          <div
            style={{
              backgroundColor:"#a3dbf1",
              marginTop: "90px",
              textAlign: "center",
              fontSize: "50px",
              color: "dark",
              paddingBottom:"50px", 
              paddingTop:"70px",
              paddingLeft: "60px",
              flexDirection: "row",
              justifyContent: "flex-end"
            }}
          >
            Specific Lawyer Cases
            <br />
            <Dropdown>
              <Dropdown.Toggle
                className="btn blue-gradient btn-block btn-rounded z-depth-1a"
                variant="omar"
                id="dropdown-basic"
                style={{ width: "150px" }}
              >
                Sort the Cases
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => this.sort()}
                  style={{ textAlign: "left" }}
                >
                  By ID
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => this.sortByCreationDate()}
                  style={{ textAlign: "center" }}
                >
                  By Creation Date
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        {this.getAttributes()}
      </div>
    );
  }
}
export default Companies