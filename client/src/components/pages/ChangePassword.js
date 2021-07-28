import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import trans from '../translations/changePasswordTranslation'
import Button from '@material-ui/core/Button';
import { RemoveRedEye } from '@material-ui/icons';
import swal from 'sweetalert';
var mongoose = require('mongoose');

const styles = (theme) => ({
	eye: {
		cursor: 'pointer'
	}
});

class ChangePassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			oldPassword:{ value: '', valid: false },
			newPassword: { value: '', valid: false },
			confirmPassword: { value: '', valid: false }
		};
	}

	handleClick(event) {

		axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
		var apiBaseUrl = '/routes/api/users/changePassword';
		var payload = {
			oldPassword: this.state.oldPassword.value,
			newPassword: this.state.newPassword.value,
			confirmPassword: this.state.confirmPassword.value
		};

		axios
			.post(apiBaseUrl, payload, { headers: { Authorization: localStorage.getItem('jwtToken') } })
			.then(res => {
				swal(res.data.msg)
			  })
			  .catch((err) => swal(err.response.data.errmsg || err.response.data));
	}

	changeHandler = (event) => {
		this.setState({ [event.target.name]: { value: event.target.value, valid: !!event.target.value } });
	};
	validatePassword() {
		return (
			this.state.newPassword.value.length >= 8 &&
			this.state.newPassword.value.length <= 20 &&
			this.state.newPassword.value === this.state.confirmPassword.value
		);
	}

	render() {
		trans.setLanguage(this.props.lang);
		return (
			<div style={{ paddingLeft: '60px', justifyItems: 'center' }}>
				<div
					style={{
						backgroundColor: '#123456',
						textAlign: 'center',
						fontSize: '50px',
						color: 'white',
						width: '100%'
					}}
				>
					{trans.title}
				</div>
				<MuiThemeProvider>
					<div style={{ paddingLeft: '30px' }}>
						<br />
						<MDBRow>
							<MDBCol>
								<MDBInput
									label={trans.labelOld}
									value={this.state.oldPassword.value}
									name="oldPassword"
									onChange={this.changeHandler}
									type="password"
									id="materialFormRegisterNameEx"
									style={{width:"300px"}}
									required
								>
								</MDBInput>
							</MDBCol>
						</MDBRow>
						<br />
						<MDBRow>
							<MDBCol>
								<MDBInput
									label={trans.labelNew}
									value={this.state.newPassword.value}
									className={this.state.newPassword.valid ? 'is-valid' : 'is-invalid'}
									name="newPassword"
									onChange={this.changeHandler}
									type="password"
									id="materialFormRegisterNameEx"
									style={{width:"300px"}}
									required
								>
									<div className="valid-feedback">
										{trans.valid}
									</div>
								</MDBInput>
							</MDBCol>
						</MDBRow>
						<br />
						<MDBRow>
							<MDBCol>
								<MDBInput
									label={trans.labelConfirm}
									value={this.state.confirmPassword.value}
									name="confirmPassword"
									onChange={this.changeHandler}
									type="password"
									id="materialFormRegisterNameEx"
									style={{width:"300px"}}
									required
								/>
							</MDBCol>
						</MDBRow>
						<div >
							<Button
								label={trans.labelSubmit}
								className="btn-block btn-rounded z-depth-1a"
								variant="omar"
								style={{marginTop:"50px",marginLeft: "50px",marginRight:"2500px",width:"100px", height:"40px" ,backgroundColor:"#a3dbf1"}}
								disabled={!this.validatePassword()}
								onClick={(event) => 
								this.handleClick(event)}
							>
							{trans.labelSubmit}
							</Button>
						</div>
					</div>
				</MuiThemeProvider>
			</div>
		);
	}
}
const style = {
	margin: 15
};

// ReactDOM.render(<ChangePassword />, document.getElementById('root'));

export default ChangePassword;
