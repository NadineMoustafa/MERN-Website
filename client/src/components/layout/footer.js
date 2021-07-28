import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';
import '../../App.scss';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';
import React, { Component } from 'react';

class Footer extends Component {
	render() {
		return (
			<div
				class="wrapper"
				style={{
					position: 'absolute',
					bottom: 0,
					width: '100%',
					height: '8rem',
					backgroundColor: '#0000',
					paddingLeft: '4.55%',
					width: '100%',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<MDBFooter className="font-small pt-4">
					<MDBContainer className="text-center text-md-left">
						<MDBRow className="text-center text-md-left  pb-3 ml-4">
							<hr className="w-100 clearfix d-md-none" style={{ color: 'dark' }} />

							<h6 className="text-uppercase mb-4 font-weight-bold mr-2 ml-4" style={{ color: '#3e484d' }}>
								Contact Us
							</h6>
							<p style={{ color: '#3e484d' }}>
								<i className="fa fa-home mr-1 ml-1" /> 3 Salah Salem Road – Fairgrounds Nasr City- Cairo
								11562 – Egypt
							</p>
							<p style={{ color: '#3e484d' }}>
								<i className="fa fa-envelope mr-1 ml-1" style={{ color: '#3e484d' }} />{' '}
								INFO@GAFINET.ORG&nbsp;
							</p>
							<p style={{ color: '#3e484d' }}>
								<i className="fa fa-phone mr-1 ml-1" style={{ color: '#3e484d' }} /> +202 24055452&nbsp;
							</p>
							<p style={{ color: '#3e484d' }}>
								<i className="fas fa-fax mr-1 ml-1" style={{ color: '#3e484d' }} />+202 24055425&nbsp;
							</p>
						</MDBRow>
						<hr className="w-100 clearfix d-md-none" style={{ color: 'dark' }} />

						<MDBRow className="d-flex align-items-center">
							<MDBCol md="8" lg="8">
								<p className="text-center text-md-left grey-text" style={{ color: '#3e484d' }}>
									&copy; {new Date().getFullYear()} Copyright: Int-Elligence;
								</p>
							</MDBCol>
							<MDBCol md="4" lg="4" className="ml-lg-0">
								<div className="text-center text-md-right">
									<ul className="list-unstyled list-inline">
										<li className="list-inline-item">
											<a
												className="btn-floating btn-sm rgba-white-slight mx-1"
												href="https://www.facebook.com/GAFIEgypt/"
											>
												<i className="fab fa-facebook-f" />
											</a>
										</li>
										<li className="list-inline-item">
											<a className="btn-floating btn-sm rgba-white-slight mx-1">
												<i className="fab fa-twitter" />
											</a>
										</li>
										<li className="list-inline-item">
											<a className="btn-floating btn-sm rgba-white-slight mx-1">
												<i className="fab fa-google-plus" />
											</a>
										</li>
										<li className="list-inline-item">
											<a className="btn-floating btn-sm rgba-white-slight mx-1">
												<i className="fab fa-linkedin-in" />
											</a>
										</li>
									</ul>
								</div>
							</MDBCol>
						</MDBRow>
					</MDBContainer>
				</MDBFooter>
			</div>
		);
	}
}

export default Footer;
