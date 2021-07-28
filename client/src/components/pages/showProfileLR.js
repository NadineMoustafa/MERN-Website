import React, { Component } from 'react';
import axios from 'axios';
import '../../App.css';
import Table from 'react-bootstrap/Table';
import ShowPLR from '../user/showPLR';
import { Button } from 'react-bootstrap';

class ShowProfileLR extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userInfo: []
		};
	}

	showProfile = () => {
		axios.get('/routes/api/users/5ca6302c13e5d0343c6e2a10').then((res) => {
			this.setState({ userInfo: [ res.data.data ] });
		});
	};

	tabRow() {
		return this.state.userInfo.map(function(info, i) {
			return <ShowPLR info={info} key={i} />;
		});
	}

	render() {
		return (
			<div>
				<br />
				<Button variant="dark" onClick={() => this.showProfile()}>
					About Me{' '}
				</Button>

				<Table bordered hover variant="dark" size="sm">
					<thead>
						<tr>
							<th>Name</th>
							<th>Gender</th>
							<th>Nationality </th>
							<th>Identification Type</th>
							<th>Identificaton Number</th>
							<th>Birthdate</th>
							<th>Address</th>
							<th>Email </th>
							<th>Telephone</th>
							<th>Fax </th>
						</tr>
					</thead>
					<tbody>{this.tabRow()}</tbody>
				</Table>
			</div>
		);
	}
}

export default ShowProfileLR;
