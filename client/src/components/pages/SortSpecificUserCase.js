import React from 'react';
import axios from 'axios';
import GetSpecificUserCase from '../form/GetSpecificUserCase';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import 'mdbreact/dist/css/mdb.css';
import swal from 'sweetalert';

export default class SortSpecificUserCase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			forms: []
		};
	}
	sort = () => {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
		axios
			.get('/routes/api/users/SpecificFormSortedByFormId', {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				this.setState({ forms: res.data.data });
				swal('Cases have been sorted');
			})
			.catch((err) => swal(err.response.data.errmsg || err.response.data));
	};

	tabRow() {
		return this.state.forms.map(function(form, i) {
			return <GetSpecificUserCase form={form} key={i} />;
		});
	}

	render() {
		return (
			<div>
				<br />
				<Button variant="dark" onClick={() => this.sort()}>
					Sort the cases by ID{' '}
				</Button>

				<Table bordered hover variant="dark" size="sm">
					<thead>
						<tr>
							<th>ID</th>
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
