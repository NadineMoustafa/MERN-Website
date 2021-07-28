import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Table } from 'semantic-ui-react';

class UnassignedComponent extends Component {
	// delete(UnassignedForm){

	//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');

	//     axios.delete('/routes/api/forms/deleteUnassignedForm/'+mongoose.Types.ObjectId(UnassignedForm._id),{headers: { "Authorization": localStorage.getItem('jwtToken') }}).then (res=> {

	//        alert('Form Deleted')
	//     }).catch(err=>{console.log(err)});

	// }

	render = () => {
		return (
			<Table.Row>
				<Table.HeaderCell>{this.props.ShowUnassignedForm.companyName} </Table.HeaderCell>
				<Table.HeaderCell>{this.props.ShowUnassignedForm.companyNameInEnglish} </Table.HeaderCell>
				<Table.HeaderCell>{this.props.ShowUnassignedForm.type} </Table.HeaderCell>
				<Table.HeaderCell>{this.props.ShowUnassignedForm.companyGovernorate} </Table.HeaderCell>
				<Table.HeaderCell>{this.props.ShowUnassignedForm.companyCity} </Table.HeaderCell>
				<Table.HeaderCell>{this.props.ShowUnassignedForm.companyAddress} </Table.HeaderCell>
				<Table.HeaderCell>{this.props.ShowUnassignedForm.companyTelephone} </Table.HeaderCell>
				<Table.HeaderCell>{this.props.ShowUnassignedForm.companyFax} </Table.HeaderCell>
				<Table.HeaderCell>{this.props.ShowUnassignedForm.currency} </Table.HeaderCell>
				<Table.HeaderCell>{this.props.ShowUnassignedForm.equityCapital} </Table.HeaderCell>
				<Table.HeaderCell>{this.props.ShowUnassignedForm.creationDate} </Table.HeaderCell>
				<Table.HeaderCell>
					<Button variant="white" block onClick={() => this.props.setFormId(this.props.ShowUnassignedForm)}>
						<h3>EDIT</h3>
					</Button>
				</Table.HeaderCell>
				<Table.HeaderCell>
					<Button variant="white" block onClick={() => this.props.delete(this.props.ShowUnassignedForm)}>
						<h3>Delete</h3>
					</Button>
				</Table.HeaderCell>
			</Table.Row>
		);
	};
}
export default UnassignedComponent;
