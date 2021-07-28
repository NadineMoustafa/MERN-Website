import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import '../../App.css';
import trans from '../translations/addCommentsLawyerTranslation'
import GetAllUserForms from '../form/GetAllUserForms'
import { black } from 'material-ui/styles/colors';
import { blue200 } from 'material-ui/styles/colors';
import swal from 'sweetalert';
const mongoose = require('mongoose');


class AddCommentsLawyer extends Component{
    constructor(props)
    {
        super(props);
        this.state=
        {
            lawyerComments:
            {
                value : [],
            } ,
            
            input : 
            {
              value: '' ,
            }
        }
    }
     
    getInitialState () {
        return ({ input: '' }
        );
      }

      handleChange(e) {
       return (this.setState({ input: e.target.value })
       );
      }

      handleClick1 () {
        console.log(this.state.input);
      }
    

    //onClick={this.handleClick.bind(this, case.id)}


    //if the id belongs to a lawyer
    handleClick = (formId,event) =>
    {
      console.log(formId)



      axios.defaults.headers.common['Authorization'] =  localStorage.getItem('jwtToken');
        var apiBaseUrl =('/routes/api/userDynamicForms/lawyerComments/'+mongoose.Types.ObjectId(formId))
        var payload={
            "lawyerComments": this.state.lawyerComments.value
        }
        axios.put(apiBaseUrl, payload,{headers: { "Authorization": localStorage.getItem('jwtToken') }})
       .then(function (response) {
        swal('Comments added Succesfully')
        setTimeout("document.location.href = '/getCaseLawyer';",3500);
       })
       .catch(function (error) {
         console.log(error);
       });
    }

    changeHandler = event => {
        this.setState({lawyerComments :{ value: [event.target.value], valid: !!event.target.value } });
      };

    
    validateForm ()
    {
        return (
        this.state.lawyerComments.value.length >= 1
        )
    }

    render() {
        
        return (
            <div>

            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" style={{color:blue200}}>
               {trans.comment} 
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <input type="text" placeholder={trans.commentPlace} style={{width: "775px" , height:"100px"}} onChange={ this.changeHandler} />
                <Button
                className="btn-block btn-rounded z-depth-1a"
                variant="omar"
                value="Add Comment"
                style={{width: "110px",backgroundColor:"#a3dbff",color:black}}
                onClick={() => this.handleClick(this.props.formId)}
                disabled={!this.validateForm()}
                >{trans.commentB}</Button>
                </Modal.Body>
                <Modal.Footer>
                <Button variant='red' onClick={this.props.onHide}>{trans.closeB}</Button>
                </Modal.Footer>
            </Modal>
           </div>
          )
    }
}

export default AddCommentsLawyer;