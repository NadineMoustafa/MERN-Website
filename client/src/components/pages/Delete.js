import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import '../../App.css';
import swal from 'sweetalert';
import axios from 'axios';
import Mongoose from 'mongoose';
import trans from '../translations/DeleteTrans';

class Delete extends Component
{
    constructor(props)
    {
        super(props);
    }

    DeleteForm = (formId) => {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios
			.delete('/routes/api/userDynamicForms/investorDeleteForm/' + Mongoose.Types.ObjectId(formId), {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				//document.getElementById('Flip').flipOnClick = false;
				swal('This case has been deleted successfully!!');
				setTimeout("document.location.href = '/investorInProgressform';",3500);
			})
			.catch((err) => {
				console.log(err);
			});
    };
    
    render() {
        
        return (
            <div >

            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
               
            >

            <Modal.Header closeButton >
                <Modal.Title id="contained-modal-title-vcenter" style={{color:'#64b9e0'}}>
               {trans.Delete}
                </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                <Button
											variant="dark"
											type="button"
											onClick={() => (
												this.DeleteForm(this.props.formId)
											)}
											class="btn btn-info"
											
										>
											<h3 style={{ color: '#64b9e0', fontSize: '15px' }}>
												{trans.deleteB}<br />
												{/* <i class="fas fa-trash" /> */}
											</h3>
										</Button>
                <Button variant='dark' onClick={this.props.onHide} ><h3 style={{ color: '#64b9e0', fontSize: '15px' }} >{trans.Cancel}</h3></Button>
                </Modal.Footer>
            </Modal>
           </div>
          )
    }
}

export default Delete;