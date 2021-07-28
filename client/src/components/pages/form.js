import 'bootstrap/dist/css/bootstrap.css'
import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {Dropdown} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import { Redirect } from 'react-router-dom'
import Footer from '../layout/footer'
import trans from '../translations/formTranslation'


class form extends Component {

  constructor(){
    super()
  }

  render() {
    trans.setLanguage(this.props.lang)
    return (
      <div style={{ paddingLeft:'60px',justifyItems:"center"}}>
      
      <div style={{backgroundColor:"#123456" , textAlign:"center", fontSize:"50px" , color:"white" , width:"100%" }} >{trans.title}</div>
     
     <Dropdown style={{ paddingLeft:'38%',paddingTop:'24%',justifyItems:"center"}}>

        <Dropdown.Toggle variant="dark" id="dropdown-basic" align="middle" >
          {trans.choose}
          </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="/SSC">
          {trans.sscform}
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="/SPC">
          {trans.spcform}
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-3">
          {trans.otherform}
          </Dropdown.Item>
          <Dropdown.Divider />
        </Dropdown.Menu> 
     </Dropdown>;
     
    </div>
    );
  }

}

export default form