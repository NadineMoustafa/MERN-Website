import React, { Component } from 'react';
import axios from 'axios';
import '../../App.css';
import 'mdbreact/dist/css/mdb.css';
import { Button } from 'react-bootstrap';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import trans from '../translations/unassignedRevTranslation';
import swal from 'sweetalert';
const Mongoose = require('mongoose');
class assignToReviewer extends Component {
	state = {
		certainFormType: []
	};
	componentDidMount() {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios
			.get('/routes/api/userDynamicForms/getReviewerPossiblePicks', {
				headers: { Authorization: localStorage.getItem('jwtToken') }
			})
			.then((res) => {
				if (Array.isArray(res.data.data)&&res.data.data.length>0) {
					this.setState({ certainFormType: res.data.data });
				}
				else{
					swal('There are no cases to pick right now!')
				}
			});
	}
	AssignReviewer = (formId) => {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios.put('/routes/api/userDynamicForms/takingForm/' + Mongoose.Types.ObjectId(formId), {
			headers: { Authorization: localStorage.getItem('jwtToken') }
		})
		.then((res) => {
			//document.getElementById('Flip').flipOnClick = false;
			swal('This Case is assigned to YOU!!');
			setTimeout("document.location.href = '/lawyerAcceptedForms';",3500);
			// document.location.href = '/lawyerAcceptedForms';
		})
		.catch((err) => console.log(err));
		// document.location.href='/AssignToReviewer'
	};
	getAttributes = () => {
		return this.state.certainFormType.map((Form, index) => {
			var KEYS = [];
			for (var key in Form) {
				KEYS.push(key);
			}
			return (
				<Flippy
					flipOnHover={false}
					flipOnClick={true}
					flipDirection="horizontal"
					ref={(r) => (this.flippy = r)}
					style={{ width: '100%', height: '425px' }}
				>
					<FrontSide
						style={{
							borderStyle: 'solid',
							borderWidth: '5px',
							backgroundSize: '464px 400px'
						}}
					>
						<div
							style={{
								textAlign: 'center',
								fontSize: '50px',
								textShadow: '-2px 0 white, 0 2px white, 2px 0 white, 0 -2px white'
							}}
						>
							<h1
								style={{
									textShadow: '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white',
									fontSize: '100px'
								}}
							>
								{Form.companyName}
							</h1>
							<i
								class="fas fa-angle-double-left"
								title="click to view details"
								style={{ paddingRight: '650px' }}
							/>
							<i
								class="fas fa-angle-double-right"
								title="click to view details"
								style={{ paddingLeft: '650px' }}
							/>
							<br />
							<Button
								type="button"
								variant="ali"
								onClick={() => this.AssignReviewer(Form._id)}
								class="btn btn-info"
							>
								<h6 style={{ color: '#64b9e0' }}>{trans.pick}</h6>
							</Button>
						</div>
					</FrontSide>
					<BackSide
						style={{
							backgroundColor: '#f7f7f7',
							borderStyle: 'solid',
							borderWidth: '5px',
							paddingLeft: '60px'
						}}
					>
						<div>
							{KEYS.map((key, index) => {
								if (key !== '_id' && key !== 'formType' && key !== 'investorId' && key !== 'lawyerId') {
									var now=key;
									var temp="";
									temp=temp+key.charAt(0).toUpperCase();
									for(var j=1;j<now.length;j++){
									  if(now.charCodeAt(j)>=65 && now.charCodeAt(j)<=90){
										temp=temp+" "
										temp=temp+now.charAt(j)
									  }
									  else{
										temp=temp+now.charAt(j)
									  }
									  
									}
									var constraints = Form[key];
									console.log(key, ':', constraints);
									for (var i in constraints) {
										if (Array.isArray(constraints)) return constraints.map((att, index) => {});
										if (key==="creationDate"){
											var date=constraints.substring(0,10);
											console.log(date)
											return (
											  <div>
												<div key={key}>
												  <h5>
													<i class="fas fa-circle" style={{fontSize:'13px'}}/> {temp} : 
													  <span style={{ textAlign: 'center' }} />{' '}
													  <span style={{ color: '#9ad1e7' }}> {date}{" "}</span>{' '}
												  </h5>
												</div>
												
											  </div>
											);
				  
										  }
										  else{
										return (
											<h5>
												<i class="fas fa-circle" style={{ fontSize: '13px' }} /> {temp} :{' '}
												<span style={{ textAlign: 'center' }} />{' '}
												<span style={{ color: '#9ad1e7' }}>{constraints}</span>{' '}
											</h5>
										);
									}
								}
								}
							})}
						</div>
					</BackSide>
				</Flippy>
			);
		});
	};
	render() {
		trans.setLanguage(this.props.lang);
		return (
			<div>
				<div
					style={{
						backgroundColor: '#a3dbf1',
						paddingBottom: '20px',
						paddingTop: '20px',
						textAlign: 'center',
						fontSize: '60px',
						color: 'dark',
						flexDirection: 'row',
						justifyContent: 'flex-end'
					}}
				>
					<h2 style={{ marginTop: '30px', paddingTop: '50px', fontSize: '50px' }}>{trans.title}</h2>
				</div>
				<div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'right', justifyContent: 'right' }}>
					{this.getAttributes()}
				</div>
			</div>
		);
	}
}
export default assignToReviewer;
