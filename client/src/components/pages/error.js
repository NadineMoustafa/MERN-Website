import React, { Component } from 'react';
import '../../error.css';

class ErrorPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div
				style={{
					backgroundImage: 'url(http://salehriaz.com/404Page/img/bg_purple.png)',
					width: '100%',
					height: '100%',
					margin: '0',
					padding: '0',
					'background-size': '100% 100%'
				}}
			>
				<div className="stars">
					<div className="central-body">
						<img className="image-404" src="http://salehriaz.com/404Page/img/404.svg" width="300px" />
						<a href="http://localhost:3000" className="btn-go-home" target="_blank">
							{/* <a href="http://intelligence-summerge.herokuapp.com" className="btn-go-home" target="_blank"> */}
							GO BACK HOME
						</a>
					</div>
					<div className="objects">
						<img className="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" width="40px" />
						<div className="earth-moon">
							<img
								className="object_earth"
								src="http://salehriaz.com/404Page/img/earth.svg"
								width="100px"
							/>
							<img className="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px" />
						</div>
						<div className="box_astronaut">
							<img
								className="object_astronaut"
								src="http://salehriaz.com/404Page/img/astronaut.svg"
								width="140px"
							/>
						</div>
					</div>
					<div className="glowing_stars">
						<div className="star" />
						<div className="star" />
						<div className="star" />
						<div className="star" />
						<div className="star" />
					</div>
				</div>
			</div>
		);
	}
}

export default ErrorPage;
