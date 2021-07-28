import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import Footer from './footer';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Badge, ListGroup } from 'react-bootstrap';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import { Button } from 'mdbreact';
import { red100 } from 'material-ui/styles/colors';
import { blue100 } from 'material-ui/styles/colors';
import { blue200 } from 'material-ui/styles/colors';
import berry from '../layout/berry.png';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

var $ = require('jquery')(window);

class NewNavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formTypes: [],
			formType: '',
			formTypeArrays: [],
			formTypeArray: ''
		};
	}
	componentDidMount() {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
		axios
			.get('/routes/api/formTypes/getAllFormTypes/', {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				this.setState({ formTypes: res.data.data });
			})
			.catch((err) => {});
		axios
			.get('/routes/api/formTypes/getAllFormTypeArrays/', {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				this.setState({ formTypeArrays: res.data.data });
			})
			.catch((err) => {});
	}
	logOut() {
		localStorage.setItem('isLoggedIn', 'false');
		localStorage.setItem('jwtToken', '');
		localStorage.setItem('type', '');
		document.location.href = '/';
	}

	changeHandler = (event) => {
		this.setState({ [event.target.name]: event.target.value });
		localStorage.setItem('formType', event.target.value);
		document.location.href = '/createANewCompany';
	};

	changeHandler2 = (event) => {
		this.setState({ [event.target.name]: event.target.value });
		localStorage.setItem('formTypeArray', event.target.value);
		document.location.href = '/attributeInArray';
	};

	render() {
		var currentLocation = window.location.pathname;
		var Investor = (
			<div>
				<nav
					class="navbar navbar-expand-sm bg-dark navbar-dark"
					style={{
						position: 'fixed',
						padding: '0.5px',
						listStyle: 'none',
						margin: ' 0 auto',
						left: '0',
						top: '0',
						zIndex: '1',
						width: '100%'
					}}
				>
					<img src={berry} width="80" style={{ color: blue100 }} alt="" />
					<ul class="navbar-nav nav-fill w-100">
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fa fa-home"
								href="/"
								title="Home"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fa fa-user"
								href="/profile"
								title="Profile"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fas fa-newspaper"
								href="/journal"
								title="Electronic Journal"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fa fa-info-circle"
								href="/about"
								title="About us"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item dropdown">
							<Dropdown>
								<Dropdown.Toggle title="Language" variant="omar" id="dropdown-basic">
									<i className="fas fa-language" style={{ color: blue100, fontSize: '1.5em' }} />
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item
										onClick={() => this.props.changelang('en')}
										style={{ textAlign: 'left', color: blue200 }}
									>
										{' '}
										English
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item
										onClick={() => this.props.changelang('ar')}
										style={{ textAlign: 'left', color: blue200 }}
									>
										{' '}
										Arabic
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</li>
						<li class="nav-item" color="white">
							<a
								className="fa fa-building"
								title="To create a new form,choose a form type"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						]{' '}
						<li class="nav-item dropdown" style={{ width: '100px', paddingTop: '10px' }}>
							<select
								className="form-control"
								id="exampleFormControlSelect1"
								name="ali"
								onChange={this.changeHandler}
								value={this.state.formType}
								style={{ color: blue200, border: 'solid' }}
							>
								<option>Choose a form type</option>
								{this.state.formTypes.map((city) => <option value={city}>{city}</option>)};
							</select>
						</li>
						<li class="nav-item dropdown" style={{ width: '75px', paddingTop: '10px' }}>
							<select
								className="form-control"
								id="exampleFormControlSelect1"
								name="ali"
								onChange={this.changeHandler2}
								value={this.state.formTypeArray}
								style={{ color: blue200, border: 'solid' }}
							>
								<option> </option>
								{this.state.formTypeArrays.map((city) => <option value={city}>{city}</option>)};
							</select>
						</li>
						<li class="nav-item dropdown">
							<Dropdown>
								<Dropdown.Toggle title="Your Forms" variant="omar" id="dropdown-basic">
									<i className="fa fa-fw fa-list-alt" style={{ color: blue100, fontSize: '1.5em' }} />
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item
										href="/approvedCompanies"
										style={{ textAlign: 'left', color: blue200 }}
									>
										{' '}
										Show Approved Companies
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item
										href="/investorInProgressform"
										style={{ textAlign: 'left', color: blue200 }}
									>
										{' '}
										Track your forms
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</li>
						<li class="nav-item dropdown">
							<Dropdown>
								<Dropdown.Toggle title="Settings" variant="omar" id="dropdown-basic">
									<i className="fas fa-cog" style={{ color: blue100, fontSize: '1.5em' }} />
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item href="/editprofile" style={{ textAlign: 'left', color: blue200 }}>
										{' '}
										Edit your profile
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item href="/changepassword" style={{ textAlign: 'left', color: blue200 }}>
										{' '}
										Change your password
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item onClick={this.logOut} style={{ textAlign: 'left', color: blue200 }}>
										{' '}
										Logout
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</li>
					</ul>
				</nav>
			</div>
		);
		var Lawyer = (
			<div>
				<nav
					class="navbar navbar-expand-sm bg-dark navbar-dark"
					style={{
						position: 'fixed',
						padding: '0.5px',
						listStyle: 'none',
						margin: ' 0 auto',
						left: '0',
						top: '0',
						zIndex: '1',
						width: '100%'
					}}
				>
					<img src={berry} width="80" style={{ color: blue100 }} alt="" />
					<ul class="navbar-nav nav-fill w-100">
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fa fa-home"
								href="/"
								title="Home"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fa fa-user"
								href="/profile"
								title="Profile"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fas fa-newspaper"
								href="/journal"
								title="Electronic Journal"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fa fa-info-circle"
								href="/about"
								title="About us"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item dropdown">
							<Dropdown>
								<Dropdown.Toggle title="Language" variant="omar" id="dropdown-basic">
									<i className="fas fa-language" style={{ color: blue100, fontSize: '1.5em' }} />
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item
										onClick={() => this.props.changelang('en')}
										style={{ textAlign: 'left', color: blue200 }}
									>
										{' '}
										English
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item
										onClick={() => this.props.changelang('ar')}
										style={{ textAlign: 'left', color: blue200 }}
									>
										{' '}
										Arabic
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</li>
						<li class="nav-item" color="white">
							<a
								className="fa fa-building"
								title="To create a new form,choose a form type"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item dropdown" style={{ width: '100px', paddingTop: '10px' }}>
							<select
								className="form-control"
								id="exampleFormControlSelect1"
								name="ali"
								onChange={this.changeHandler}
								value={this.state.formType}
								style={{ color: blue200, border: 'solid' }}
							>
								<option>Choose a form type</option>
								{this.state.formTypes.map((city) => <option value={city}>{city}</option>)};
							</select>
						</li>
						<li class="nav-item dropdown" style={{ width: '75px', paddingTop: '10px' }}>
							<select
								className="form-control"
								id="exampleFormControlSelect1"
								name="ali"
								onChange={this.changeHandler2}
								value={this.state.formTypeArray}
								style={{ color: blue200, border: 'solid' }}
							>
								<option> </option>
								{this.state.formTypeArrays.map((city) => <option value={city}>{city}</option>)};
							</select>
						</li>
						<li class="nav-item dropdown">
							<Dropdown>
								<Dropdown.Toggle title="Your Forms" variant="omar" id="dropdown-basic">
									<i className="fa fa-fw fa-list-alt" style={{ color: blue100, fontSize: '1.5em' }} />
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item href="/GetCaseLawyer" style={{ textAlign: 'left', color: blue200 }}>
										{' '}
										View your cases
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item href="/unassignedForm" style={{ textAlign: 'left', color: blue200 }}>
										{' '}
										Pick a Task
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</li>
						<li class="nav-item dropdown">
							<Dropdown>
								<Dropdown.Toggle title="Settings" variant="omar" id="dropdown-basic">
									<i className="fas fa-cog" style={{ color: blue100, fontSize: '1.5em' }} />
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item href="/editprofile" style={{ textAlign: 'left', color: blue200 }}>
										{' '}
										Edit your profile
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item href="/changepassword" style={{ textAlign: 'left', color: blue200 }}>
										{' '}
										Change your password
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item onClick={this.logOut} style={{ textAlign: 'left', color: blue200 }}>
										{' '}
										Logout
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</li>
					</ul>
				</nav>
				<br />
				<br />
				<br />
			</div>
		);

		var Reviewer = (
			<div>
				<nav
					class="navbar navbar-expand-sm bg-dark navbar-dark"
					style={{
						position: 'fixed',
						padding: '0.5px',
						listStyle: 'none',
						margin: ' 0 auto',
						left: '0',
						top: '0',
						zIndex: '1',
						width: '100%'
					}}
				>
					<img src={berry} width="80" alt="" />
					<ul class="navbar-nav nav-fill w-100">
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fa fa-home"
								href="/"
								title="Home"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fa fa-user"
								href="/profile"
								title="Profile"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fas fa-newspaper"
								href="/journal"
								title="Electronic Journal"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fa fa-info-circle"
								href="/about"
								title="About us"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item dropdown">
							<Dropdown>
								<Dropdown.Toggle title="Language" variant="omar" id="dropdown-basic">
									<i className="fas fa-language" style={{ color: blue100, fontSize: '1.5em' }} />
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item
										onClick={() => this.props.changelang('en')}
										style={{ textAlign: 'left', color: blue200 }}
									>
										{' '}
										English
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item
										onClick={() => this.props.changelang('ar')}
										style={{ textAlign: 'left', color: blue200 }}
									>
										{' '}
										Arabic
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</li>
						<li class="nav-item dropdown">
							<Dropdown>
								<Dropdown.Toggle title="Your Forms" variant="omar" id="dropdown-basic">
									<i className="fa fa-fw fa-list-alt" style={{ color: blue100, fontSize: '1.5em' }} />
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item
										href="/lawyerAcceptedForms"
										style={{ textAlign: 'left', color: blue200 }}
									>
										{' '}
										Pick a Task
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item href="/GetReviewer" style={{ textAlign: 'left', color: blue200 }}>
										{' '}
										View your cases
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</li>
						<li class="nav-item dropdown">
							<Dropdown>
								<Dropdown.Toggle title="Settings" variant="omar" id="dropdown-basic">
									<i className="fas fa-cog" style={{ color: blue100, fontSize: '1.5em' }} />
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item href="/editprofile" style={{ textAlign: 'left', color: blue200 }}>
										{' '}
										Edit your profile
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item href="/changepassword" style={{ textAlign: 'left', color: blue200 }}>
										{' '}
										Change your password
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item onClick={this.logOut} style={{ textAlign: 'left', color: blue200 }}>
										{' '}
										Logout
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</li>
					</ul>
				</nav>
				<br />
				<br />
				<br />
			</div>
		);

		var admin = (
			<div>
				<nav
					class="navbar navbar-expand-sm bg-dark navbar-dark"
					style={{
						position: 'fixed',
						padding: '0.5px',
						listStyle: 'none',
						margin: ' 0 auto',
						left: '0',
						top: '0',
						zIndex: '1',
						width: '100%'
					}}
				>
					<img src={berry} width="70" alt="" />
					<ul class="navbar-nav nav-fill w-100">
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fa fa-home"
								href="/"
								title="Home"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fa fa-user"
								href="/adminprofile"
								title="Profile"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fas fa-newspaper"
								href="/journal"
								title="Electronic Journal"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fa fa-info-circle"
								href="/about"
								title="About us"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fas fa-search"
								href="/companyName"
								title="Find a company"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fas fa-user-plus"
								href="/registerAdmin"
								title="Register a new lawyer or reviewer"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fa fa-fw fa-list-alt"
								href="/createNewFormType"
								title="Create a new form type"
								style={{ color: blue100, paddingTop: '17px', fontSize: '1.5em' }}
							/>
						</li>
						
						<li class="nav-item" color="white">
						<i className="fas fa-list-ol" 
						style={{ color: blue100,  paddingTop: '20px',fontSize: '1.5em' }}>
							<a
								class="nav-link"
								href="/createNewFormTypeArray"
								title="Create a new form type array"
								//style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
							</i>
						</li>
						<li class="nav-item" color="white">
						<i className="fas fa-layer-group" 
						style={{ color: blue100,  paddingTop: '20px',fontSize: '1.5em' }}>
							<a
								class="nav-link"
								href="/createNewDependency"
								title="Create a new dependency"
								// style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
							</i>
						</li>
						<li class="nav-item dropdown">
							<Dropdown>
								<Dropdown.Toggle title="Language" variant="omar" id="dropdown-basic">
									<i className="fas fa-language" style={{ color: blue100, fontSize: '1.5em' }} />
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item
										onClick={() => this.props.changelang('en')}
										style={{ textAlign: 'left', color: blue200 }}
									>
										{' '}
										English
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item
										onClick={() => this.props.changelang('ar')}
										style={{ textAlign: 'left', color: blue200 }}
									>
										{' '}
										Arabic
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</li>
						<li class="nav-item dropdown">
							<Dropdown>
								<Dropdown.Toggle title="Settings" variant="omar" id="dropdown-basic">
									<i className="fas fa-cog" style={{ color: blue100, fontSize: '1.5em' }} />
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item href="/editprofile" style={{ textAlign: 'left', color: blue200 }}>
										{' '}
										Edit your profile
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item href="/changepassword" style={{ textAlign: 'left', color: blue200 }}>
										{' '}
										Change your password
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item onClick={this.logOut} style={{ textAlign: 'left', color: blue200 }}>
										{' '}
										Logout
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</li>
					</ul>
				</nav>
				<br />
				<br />
				<br />
			</div>
		);
		var ElectronicJournal = (
			<div>
				<nav
					class="navbar navbar-expand-sm bg-dark navbar-dark"
					style={{
						position: 'fixed',
						padding: '0.5px',
						listStyle: 'none',
						margin: ' 0 auto',
						left: '0',
						top: '0',
						zIndex: '1',
						width: '100%'
					}}
				>
					<img src={berry} width="80" alt="" />
					<ul class="navbar-nav nav-fill w-100">
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fa fa-home"
								href="/"
								title="Home"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fas fa-newspaper"
								href="/journal"
								title="Electronic Journal"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fa fa-info-circle"
								href="/about"
								title="About us"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item dropdown">
							<Dropdown>
								<Dropdown.Toggle title="Language" variant="omar" id="dropdown-basic">
									<i className="fas fa-language" style={{ color: blue100, fontSize: '1.5em' }} />
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item
										onClick={() => this.props.changelang('en')}
										style={{ textAlign: 'left', color: blue200 }}
									>
										{' '}
										English
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item
										onClick={() => this.props.changelang('ar')}
										style={{ textAlign: 'left', color: blue200 }}
									>
										{' '}
										Arabic
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fas fa-sign-in-alt"
								href="/login"
								title="Sign In"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
						<li class="nav-item" color="white">
							<a
								class="nav-link"
								className="fas fa-user-plus"
								href="/register"
								title="Sign Up"
								style={{ color: blue100, paddingTop: '15px', fontSize: '1.5em' }}
							/>
						</li>
					</ul>
				</nav>
				<br />
				<br />
				<br />
			</div>
		);

		return (
			<div style={{ paddingLeft: '60px', justifyItems: 'center' }}>
				{localStorage.getItem('type') === 'Investor' ? Investor : null}
				{localStorage.getItem('type') === 'Lawyer' ? Lawyer : null}
				{localStorage.getItem('type') === 'Admin' ? admin : null}
				{localStorage.getItem('type') === 'Reviewer' ? Reviewer : null}
				{currentLocation === '/journal' && localStorage.getItem('isLoggedIn') === 'false' ? (
					ElectronicJournal
				) : null}
				{currentLocation === '/journal' &&
				localStorage.getItem('isLoggedIn') === 'true' &&
				localStorage.getItem('type') === 'Investor' ? (
					Investor
				) : null}
				{currentLocation === '/journal' &&
				localStorage.getItem('isLoggedIn') === 'true' &&
				localStorage.getItem('type') === 'Lawyer' ? (
					Lawyer
				) : null}
				{currentLocation === '/journal' &&
				localStorage.getItem('isLoggedIn') === 'true' &&
				localStorage.getItem('type') === 'Admin' ? (
					admin
				) : null}
				{currentLocation === '/journal' &&
				localStorage.getItem('isLoggedIn') === 'true' &&
				localStorage.getItem('type') === 'Reviewer' ? (
					Reviewer
				) : null}
				{currentLocation === '/about' && localStorage.getItem('isLoggedIn') === 'false' ? (
					ElectronicJournal
				) : null}
				{currentLocation === '/about' &&
				localStorage.getItem('isLoggedIn') === 'true' &&
				localStorage.getItem('type') === 'Investor' ? (
					Investor
				) : null}
				{currentLocation === '/about' &&
				localStorage.getItem('isLoggedIn') === 'true' &&
				localStorage.getItem('type') === 'Lawyer' ? (
					Lawyer
				) : null}
				{currentLocation === '/about' &&
				localStorage.getItem('isLoggedIn') === 'true' &&
				localStorage.getItem('type') === 'Admin' ? (
					admin
				) : null}
				{currentLocation === '/about' &&
				localStorage.getItem('isLoggedIn') === 'true' &&
				localStorage.getItem('type') === 'Reviewer' ? (
					Reviewer
				) : null}
				{currentLocation === '/register' ? ElectronicJournal : null}
				{currentLocation === '/forgotPassword' ? ElectronicJournal : null}
				{currentLocation === '/login' ? ElectronicJournal : null}
				{currentLocation === '/reset/:token' ? ElectronicJournal : null}
			</div>
		);
	}
}

export default NewNavBar;
