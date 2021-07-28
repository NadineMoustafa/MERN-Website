import React, { Component } from 'react';
import Page from 'react-page-loading';
import { Provider } from 'react-redux'; //new stuff
import store from './store'; //new stuff
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import './App.scss';
import LandingBody from './components/pages/landingBody';
import Profile from './components/pages/profilePage';
import Footer from './components/layout/footer';
import Companies from './components/pages/Companies';
import Side from './components/layout/Side';
import NewNavBar from './components/layout/NewNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar1 from './components/NavBar';
import AdminProfile from './components/pages/AdminProfile';
import AdminPage from './components/pages/adminPage';
import Register1 from './components/Register';
import Login from './components/pages/Login';
import Home from './components/Home';
import DropdownTrial from './components/form/DropdownNationalities';
import DropdownCities from './components/form/DropdownCities';
import DropdownGovernorates from './components/form/DropdownGovernorates';
import UnassignedForm from './components/pages/unassignedForm';
import AssignToReviewer from './components/pages/assignToReviewer';
import GetCaseReviewer from './components/pages/GetCaseReviewer';
import EditProfile from './components/pages/EditProfile';
import ChangePassword from './components/pages/ChangePassword';
import GetFormByCompanyName from './components/form/GetFormByCompanyName';
import GetCaseLawyer from './components/pages/getCaseLawyer';
import ForgotPassword from './containers/ForgotPassword';
import ResetPassword from './containers/ResetPassword';
import About from './components/pages/about';
import ApprovedCompanies from './components/pages/ApprovedCompanies';
import CreateANewCompany from './components/pages/CreateANewCompany';
import AttributeArray from './components/pages/AttributeArray';
import InProgressInvestorCases from './components/pages/inProgressInvestorCases';
import EditInvCompany from './components/pages/EditInvCompany';
import EditLawyerCompany from './components/pages/editLawyerForms';
import Notfound from './components/pages/notfound';
import error from './components/pages/error';
import unauthorized from './components/pages/unauthorized';
import verify from './containers/verify';
import NewFormType from './components/pages/NewFormType';
import NewFormTypeArray from './components/pages/NewFormTypeArray';
import NewDependency from './components/pages/NewDepenency';
import unassignedForm from './components/pages/unassignedForm';
import companyPDF from './components/pages/companyPdf';

class App extends Component {
	constructor() {
		super();
		localStorage.setItem('lang', localStorage.getItem('lang') || 'en');
		//this.connecToServer = this.connecToServer.bind(this);
	}
	// connecToServer() {
	// 	fetch('/');
	// }

	// componentDidMount() {
	// 	this.connecToServer();
	// }

	state = {
		lang: localStorage.getItem('lang'),
		formId: {}
	};
	changelang = (lang) => {
		localStorage.setItem('lang', lang);
		this.setState({ lang: lang });
		console.log(lang);
	};

	componentDidMount() {
		document.title = 'GAFI';
	}

	setFormId = (formId) => {
		this.setState({ formId: formId });
		if (formId.status === 'Unassigned') document.location.href = '/editUnassigned';
		else if (formId.type === 'SSCForm') document.location.href = '/editsscform';
		else document.location.href = '/editspcform';
	};

	render() {
		var currentLocation = window.location.pathname;
		var footerNotVisible = false;
		if (currentLocation === '/' || localStorage.getItem('isLoggedIn') === 'false') {
			footerNotVisible = true;
		}

		return (
			<div>
				<Page loader={'bubble-spin'} color={'#A9A9A9'} size={12}>
					<body
						style={{
							position: 'relative',
							minHeight: '100vh'
						}}
					>
						<Provider store={store}>
							<div style={{ paddingBottom: '7rem' }}>
								<Router>
									<div>
										<Switch>
											<Route
												exact
												path="/"
												render={(props) => <LandingBody {...props} lang={this.state.lang} />}
											/>
											<Route
												exact
												path="/profile"
												render={(props) =>
													localStorage.getItem('isLoggedIn') === 'true' ? (
														<Profile {...props} lang={this.state.lang} />
													) : (
														<Route component={unauthorized} />
													)}
											/>

											<Route
												exact
												path="/changePassword"
												render={(props) =>
													localStorage.getItem('isLoggedIn') === 'true' ? (
														<ChangePassword {...props} lang={this.state.lang} />
													) : (
														<Route component={unauthorized} />
													)}
											/>
											<Route
												exact
												path="/about"
												render={(props) => <About {...props} lang={this.state.lang} />}
											/>
											<Route
												exact
												path="/approvedCompanies"
												render={(props) =>
													localStorage.getItem('isLoggedIn') === 'true' &&
													localStorage.getItem('type') === 'Investor' ? (
														<ApprovedCompanies {...props} lang={this.state.lang} />
													) : (
														<Route component={unauthorized} />
													)}
											/>
											<Route
												exact
												path="/journal"
												render={(props) => <Companies {...props} lang={this.state.lang} />}
											/>
											<Route
												exact
												path="/register"
												render={(props) => <Register1 {...props} lang={this.state.lang} />}
											/>
											<Route
												exact
												path="/login"
												render={(props) => <Login {...props} lang={this.state.lang} />}
											/>

											<Route
												exact
												path="/registerAdmin"
												render={(props) =>
													localStorage.getItem('isLoggedIn') === 'true' &&
													localStorage.getItem('type') === 'Admin' ? (
														<AdminPage {...props} lang={this.state.lang} />
													) : (
														<Route component={unauthorized} />
													)}
											/>
											<Route exact path="/dropDown" component={DropdownTrial} />
											<Route exact path="/dropDownCity" component={DropdownCities} />
											<Route exact path="/dropDownGovernorate" component={DropdownGovernorates} />
											<Route
												exact
												path="/unassignedForm"
												render={(props) =>
													localStorage.getItem('isLoggedIn') === 'true' &&
													localStorage.getItem('type') === 'Lawyer' ? (
														<unassignedForm {...props} lang={this.state.lang} />
													) : (
														<Route component={unauthorized} />
													)}
											/>
											<Route
												exact
												path="/lawyerAcceptedForms"
												render={(props) =>
													localStorage.getItem('isLoggedIn') === 'true' &&
													localStorage.getItem('type') === 'Reviewer' ? (
														<AssignToReviewer {...props} lang={this.state.lang} />
													) : (
														<Route component={unauthorized} />
													)}
											/>
											<Route
												exact
												path="/GetReviewer"
												render={(props) =>
													localStorage.getItem('isLoggedIn') === 'true' &&
													localStorage.getItem('type') === 'Reviewer' ? (
														<GetCaseReviewer {...props} lang={this.state.lang} />
													) : (
														<Route component={unauthorized} />
													)}
											/>
											<Route
												exact
												path="/editprofile"
												render={(props) =>
													localStorage.getItem('isLoggedIn') === 'true' ? (
														<EditProfile {...props} lang={this.state.lang} />
													) : (
														<Route component={unauthorized} />
													)}
											/>

											<Route
												exact
												path="/companyName"
												render={(props) =>
													localStorage.getItem('isLoggedIn') === 'true' &&
													localStorage.getItem('type') === 'Admin' ? (
														<GetFormByCompanyName {...props} lang={this.state.lang} />
													) : (
														<Route component={unauthorized} />
													)}
											/>
											<Route
												exact
												path="/getCaseLawyer"
												render={(props) =>
													localStorage.getItem('isLoggedIn') === 'true' &&
													localStorage.getItem('type') === 'Lawyer' ? (
														<GetCaseLawyer {...props} lang={this.state.lang} />
													) : (
														<Route component={unauthorized} />
													)}
											/>
											<Route
												exact
												path="/companyPdf"
												render={(props) =>
													localStorage.getItem('isLoggedIn') === 'true' &&
													localStorage.getItem('type') === 'Investor' ? (
														<companyPDF {...props} lang={this.state.lang} />
													) : (
														<Route component={unauthorized} />
													)}
											/>
											<Route
												exact
												path="/forgotPassword"
												render={(props) => <ForgotPassword {...props} lang={this.state.lang} />}
											/>
											<Route exact path="/reset/:token" component={ResetPassword} />
											<Route exact path="/verify/:token" component={verify} />
											<Route
												exact
												path="/CreateANewCompany"
												render={(props) =>
													localStorage.getItem('isLoggedIn') === 'true' &&
													(localStorage.getItem('type') === 'Investor' ||
														localStorage.getItem('type') === 'Lawyer') ? (
														<CreateANewCompany {...props} lang={this.state.lang} />
													) : (
														<Route component={unauthorized} />
													)}
											/>
											<Route
												exact
												path="/attributeInArray"
												render={(props) =>
													localStorage.getItem('isLoggedIn') === 'true' &&
													(localStorage.getItem('type') === 'Investor' ||
														localStorage.getItem('type') === 'Lawyer') ? (
														<AttributeArray {...props} lang={this.state.lang} />
													) : (
														<Route component={unauthorized} />
													)}
											/>

											<Route
												exact
												path="/investorInProgressform"
												render={(props) =>
													localStorage.getItem('isLoggedIn') === 'true' &&
													localStorage.getItem('type') === 'Investor' ? (
														<InProgressInvestorCases
															{...props}
															lang={this.state.lang}
															setFormId={this.setFormId}
														/>
													) : (
														<Route component={unauthorized} />
													)}
											/>
											<Route
												exact
												path="/adminprofile"
												render={(props) =>
													localStorage.getItem('isLoggedIn') === 'true' &&
													localStorage.getItem('type') === 'Admin' ? (
														<AdminProfile {...props} lang={this.state.lang} />
													) : (
														<Route component={unauthorized} />
													)}
											/>
											<Route
												exact
												path="/editinvcompany"
												render={(props) =>
													localStorage.getItem('isLoggedIn') === 'true' &&
													localStorage.getItem('type') === 'Investor' ? (
														<EditInvCompany {...props} lang={this.state.lang} />
													) : (
														<Route component={unauthorized} />
													)}
											/>
											<Route
												exact
												path="/editlawyercompany"
												render={(props) =>
													localStorage.getItem('isLoggedIn') === 'true' &&
													localStorage.getItem('type') === 'Lawyer' ? (
														<EditLawyerCompany {...props} lang={this.state.lang} />
													) : (
														<Route component={unauthorized} />
													)}
											/>
											<Route
												exact
												path="/createNewFormType"
												render={(props) =>
													localStorage.getItem('isLoggedIn') === 'true' &&
													localStorage.getItem('type') === 'Admin' ? (
														<NewFormType {...props} lang={this.state.lang} />
													) : (
														<Route component={unauthorized} />
													)}
											/>
											<Route
												exact
												path="/createNewFormTypeArray"
												render={(props) =>
													localStorage.getItem('isLoggedIn') === 'true' &&
													localStorage.getItem('type') === 'Admin' ? (
														<NewFormTypeArray {...props} lang={this.state.lang} />
													) : (
														<Route component={unauthorized} />
													)}
											/>
											<Route
												exact
												path="/createNewDependency"
												render={(props) =>
													localStorage.getItem('isLoggedIn') === 'true' &&
													localStorage.getItem('type') === 'Admin' ? (
														<NewDependency {...props} lang={this.state.lang} />
													) : (
														<Route component={unauthorized} />
													)}
											/>

											<Route component={error} />
										</Switch>
									</div>

									{currentLocation === '/' ? (
										<Side changelang={this.changelang} lang={this.state.lang} />
									) : (
										<NewNavBar changelang={this.changelang} lang={this.state.lang} />
									)}
									{footerNotVisible ? null : <Footer />}
								</Router>
							</div>
						</Provider>
					</body>
				</Page>
			</div>
		);
	}
}

export default App;
