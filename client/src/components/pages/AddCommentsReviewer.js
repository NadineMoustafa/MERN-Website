import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import '../../App.css';
import { black } from 'material-ui/styles/colors';
import { blue200 } from 'material-ui/styles/colors';
import swal from 'sweetalert';
import trans from '../translations/addCommentsReviewerTranslation'
const mongoose = require('mongoose');



class AddCommentsReviewer extends Component{

    

    constructor(props)
    {
        super(props);
        
        this.state=
        {
            reviewerComments:
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
        var apiBaseUrl =('/routes/api/userDynamicForms/reviewerComments/'+mongoose.Types.ObjectId(formId))
        var payload={
            "reviewerComments": this.state.reviewerComments.value
        }
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
        axios.put(apiBaseUrl, payload, {headers: { "Authorization": localStorage.getItem('jwtToken') }})
       .then(function (response) {
        swal('Comments added Succesfully')
        setTimeout("document.location.href = '/GetReviewer';",3500);
       })
       .catch(function (error) {
         console.log(error);
       });
    }

    changeHandler = event => {
        this.setState({reviewerComments :{ value: [event.target.value], valid: !!event.target.value } });
      };

      handleEvent = () => {
        swal("I was clicked");
      };


      validateForm ()
    {
        return (
        this.state.reviewerComments.value.length >= 1 
        //this.state.data.reviewerComments.vaue.length>=3 && this.state.data.reviewerComments.value.length <=100
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
                <Modal.Title id="contained-modal-title-vcenter"style={{color:blue200}}>
                {trans.comment} 
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {/* <h4>Centered Modal</h4> */}
                <input type="text" placeholder={trans.commentPlace} style={{width: "775px" , height:"100px"}} onChange={ this.changeHandler} />
                <Button
                className="btn-block btn-rounded z-depth-1a"
                variant="omar"
                value="Comment"
                style={{width: "110px",backgroundColor:"#a3dbff",color:black}}   
                disabled={!this.validateForm()}
                onClick={() => this.handleClick(this.props.formId)}
                >{trans.commentB}</Button>
                </Modal.Body>
                <Modal.Footer>
                <Button variant='red' onClick={this.props.onHide}>{trans.closeB}</Button>
                </Modal.Footer>
            </Modal>

     



        {/* <input type="text" placeholder ='Enter your Comment' onChange={ this.changeHandler} />
        <Button
          type="button"
          value="Add Comment"
          variant = "dark"
          block
          onClick={() => (this.handleClick() , alert('Comments added Succesfully'))}
        >Add Comment</Button> */}
			</div>
		);
	}
}

export default AddCommentsReviewer;