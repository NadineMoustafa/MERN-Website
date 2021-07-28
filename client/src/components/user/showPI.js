import  React, { Component } from 'react';

class ShowPI extends Component {

    render(){
        return (
            <tr>
                <td>{this.props.info.name} </td>
                <td>{this.props.info.gender} </td>
                <td>{this.props.info.nationality} </td>
                <td>{this.props.info.identificationType} </td>
                <td>{this.props.info.identificationNumber} </td>
                <td>{this.props.info.birthdate} </td>
                <td>{this.props.info.address} </td>
                <td>{this.props.info.email} </td>
                <td>{this.props.info.telephone} </td>
                <td>{this.props.info.fax} </td>
                <td>{this.props.info.financialBalance} </td>
                </tr>
        )
    }

}

export default ShowPI;