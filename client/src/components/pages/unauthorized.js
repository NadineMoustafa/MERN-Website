import React, { Component } from 'react';
import back from './unauthorized.jpg';

class unauthorized extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{ justifyContent: 'center', alignItems: 'center' }}>
				<section
					style={{
						paddingLeft: '200px',
						marginTop: '100px',
						marginLeft: '300px',
						// display: 'flex',
						justifyContent: 'center',
						width: '900px',
						height: '500px',
						backgroundImage: 'url(' + back + ')',
						backgroundRepeat: 'no-repeat',
						backgroundSize: '100% 100%',
						alignItems: 'center'
					}}
				/>
			</div>
		);
	}
}

export default unauthorized;
