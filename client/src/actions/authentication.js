import React, { Component } from 'react';
import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import swal from 'sweetalert';

export const registerUser = (user) => (dispatch) => {
	axios
		.post('/routes/api/users/register', user)
		//.then(res => history.push('/login'))
		//.catch(err => console.log(err))
		.then(function(response) {
			// localStorage.setItem('isVerified', 'false');
			axios
				.post('/routes/api/userVerify/verifyEmail', user)
				.then(function(response) {
					swal({
						title: 'Good job!',
						text:
							'The Account has been created successfully! A verification email has been sent to you. Please check your email to verify the account!',
						icon: 'success',
						button: 'Aww yess!'
					});
				})
				.catch((err) => {
					swal(err.response.data.error || err.response.data);
				});

			// alert('You have registered successfully. Congratulations :)! check your email for verification link');
		})
		.catch((err) => {
			// alert(err.response.data.error || err.response.data);
			swal(err.response.data.error || err.response.data);
			//console.log(err.response);
		});
};

export const registerLR = (user) => (dispatch) => {
	if (user.userType === 'Lawyer') {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
		axios
			.post('/routes/api/admins/registerL', user, {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				swal({
					title: 'Good job!',
					text: 'The Account has been created successfully!',
					icon: 'success',
					button: 'Aww yess!'
				});
			})
			.catch((err) => swal(err.response.data.errmsg || err.response.data));
	}

	if (user.userType === 'Reviewer') {
		axios
			.post('/routes/api/admins/registerR', user, {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				swal({
					title: 'Good job!',
					text: 'The Account has been created successfully!',
					icon: 'success',
					button: 'Aww yess!'
				});
			})
			.catch((err) => {
				swal(err.response.data.errmsg || err.response.data);
				console.log(err.response);
			});
	}
};

export const loginUser = (user) => (dispatch) => {
	//	if (localStorage.getItem('isVerified') === 'true') {
	axios
		.post('/routes/api/users/login', user)
		.then((res) => {
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);
			const { type } = res.data;
			localStorage.setItem('type', type);
			localStorage.setItem('isLoggedIn', true);
			setAuthToken(token);
			const decoded = jwt_decode(token);
			dispatch(setCurrentUser(decoded));
			console.log(res.data);

			console.log(localStorage.getItem('isLoggedIn'));
			if (localStorage.getItem('isLoggedIn') === 'true') {
				// this.props.history.replace('/profile')
				// this.props.history.go(1)
				if (
					localStorage.getItem('type') === 'Investor' ||
					localStorage.getItem('type') === 'Lawyer' ||
					localStorage.getItem('type') === 'Reviewer'
				)
					document.location.href = '/profile';
				else document.location.href = '/adminprofile';
			}
		})
		.catch((err) => {
			console.log(err);
			localStorage.setItem('isLoggedIn', false);
			swal('Wrong Email or Password or account not verified!');

			// alert('wrong password');
			return err;
		});
	//}
};

export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};
