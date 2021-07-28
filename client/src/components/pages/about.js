// import React from "react";
import { MDBCard, MDBCardTitle, MDBCardGroup, MDBCardImage, MDBCardText, MDBCardBody } from 'mdbreact';
import back from '../../backkk.jpeg';
import pillar from '../../pillars.jpeg';
import first from '../../1stt.jpeg';
import second from '../../2ndd.jpeg';
import third from '../../3rdd.jpeg';
import { transcode } from 'buffer';
import trans from '../translations/aboutContactTranslation';
import React, { Component } from 'react';

class CardExample extends Component {
	render() {
		trans.setLanguage(this.props.lang);
		return (
			<MDBCardGroup>
				<MDBCard>
					<MDBCardImage src={third} alt="MDBCard image cap" top hover overlay="white-slight" />
					<MDBCardBody>
						<MDBCardTitle tag="h3">{trans.title}</MDBCardTitle>
						<MDBCardText>{trans.WhoWeAre}</MDBCardText>
					</MDBCardBody>
				</MDBCard>

				<MDBCard>
					<MDBCardImage src={second} alt="MDBCard image cap" top hover overlay="white-slight" />
					<MDBCardBody>
						<MDBCardTitle tag="h3">{trans.ourmission}</MDBCardTitle>
						<MDBCardText>{trans.themission}"</MDBCardText>
					</MDBCardBody>
				</MDBCard>

				<MDBCard>
					<MDBCardImage src={first} alt="MDBCard image cap" top hover overlay="white-slight" />
					<MDBCardBody>
						<MDBCardTitle tag="h3">{trans.fiveMainPailrs}</MDBCardTitle>
						<MDBCardText>{trans.theFiveMainPailrs}</MDBCardText>
					</MDBCardBody>
				</MDBCard>
			</MDBCardGroup>
		);
	}
}

export default CardExample;
