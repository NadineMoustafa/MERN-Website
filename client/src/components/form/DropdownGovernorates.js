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

class DropdownGovernorates extends Component {
	state = {
		governorates: []
	};
	tabRow() {
		return this.state.governorates.map(function(governorate, i) {
			return (
				<Dropdown.Item key={i}>
					<h6>{governorate.name}</h6>
				</Dropdown.Item>
			);
		});
	}
	componentDidMount() {
		axios.get('/routes/api/governorates/').then((res) => {
			this.setState({ governorates: res.data.data });
		});
	}

	render() {
		return (
			<div>
				<Dropdown>
					<Dropdown.Toggle variant="dark" id="dropdown-basic" align="middle">
						Choose Your Governorate
					</Dropdown.Toggle>
					<Dropdown.Menu>{this.tabRow()}</Dropdown.Menu>
				</Dropdown>
			</div>
		);
	}
}

export default DropdownGovernorates;
