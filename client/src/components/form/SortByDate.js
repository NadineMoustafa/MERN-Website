import React from 'react';
import axios from 'axios';
import SortPage from '../pages/SortPage';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import 'mdbreact/dist/css/mdb.css';
import setAuthToken from '../../setAuthToken';

class SortByDate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			forms: []
		};
	}

	sort() {
		console.log(localStorage.getItem('jwtToken'));
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');

		axios
			.get('/routes/api/users/SpecificformsSortedByformDate', {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				this.setState({ forms: res.data.data });
			})
			.catch((err) => alert(err.response.data.errmsg || err.response.data));
	}

	tabRow() {
		return this.state.forms.map(function(form, i) {
			return <SortPage form={form} key={i} />;
		});
	}

	render() {
		return (
			<div>
				<br />
				<Button variant="dark" onClick={() => this.sort()}>
					Sort the cases by Date{' '}
				</Button>
				<Table bordered hover variant="dark" size="sm">
					<thead>
						<tr>
							<th>Name</th>
							<th>Name In English </th>
							<th>Governorate</th>
							<th>City</th>
							<th>Address</th>
							<th>Telephone</th>
							<th>Fax </th>
							<th>Currency</th>
							<th>Capital </th>
							<th>Type </th>
							<th>Creation Date </th>
						</tr>
					</thead>
					<tbody>{this.tabRow()}</tbody>
				</Table>
			</div>
		);
	}
}
export default SortByDate;
