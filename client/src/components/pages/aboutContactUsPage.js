import 'bootstrap/dist/css/bootstrap.css'
import React, { Component } from 'react';
import {Card} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import ReactDOM from 'react-dom';
import Footer from '../layout/footer'
import {Row,Col,Container,Image} from 'react-bootstrap'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
//import Header from '../layout/header'
import background from '../../backkk.jpeg'
import trans from '../translations/aboutContactTranslation'

class About extends Component{

    constructor()
    {
        super()
    }

     render()
     {
       
      trans.setLanguage(this.props.lang)
         return (
             <section style={{ paddingLeft:'60px',display:"flex", justifyContent: 'center',width:"100%" ,height:"800px", backgroundImage:"url("+background+")",backgroundRepeat:"no-repeat",backgroundSize:"100% 100%",alignItems:"center"}}>   
      
        <Card bg="light" text="grey" style={{ width: '30rem',height:'20rem' }}>
        <Card.Header>{trans.about}</Card.Header>
        <Card.Body>
        <Card.Title>{trans.info}</Card.Title>
        <Card.Text>
       {trans.infoText}
      </Card.Text>
        <Form>
        </Form>
        </Card.Body>
        </Card>
      
        </section>

          )
     }
    
}

export default About