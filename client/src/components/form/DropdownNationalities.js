import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import { Redirect } from 'react-router-dom';
import Footer from '../layout/footer';
import axios from 'axios';

class DropdownTrial extends Component {
	state = {
		nationalities: []
	};
	tabRow() {
		return this.state.nationalities.map(function(nationality, i) {
			return (
				<Dropdown.Item key={i}>
					<h6>{nationality.name}</h6>
				</Dropdown.Item>
			);
		});
	}
	componentDidMount() {
		axios.get('/routes/api/nationalities/').then((res) => {
			this.setState({ nationalities: res.data.data });
		});
	}

	render() {
		return (
			<div>
				<Dropdown>
					<Dropdown.Toggle variant="dark" id="dropdown-basic" align="middle">
						Choose Your Nationality
					</Dropdown.Toggle>
					<Dropdown.Menu>{this.tabRow()}</Dropdown.Menu>
				</Dropdown>
			</div>
		);
	}
}

export default DropdownTrial;
