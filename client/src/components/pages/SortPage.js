
 import  React, { Component } from 'react';

class SortPage extends Component {
   
    render()
    {
        return (
            // <div 
            // style= {this.getStyle()}>
            //  >
            <tr>
                <td>{this.props.form.companyName} </td>
                <td>{this.props.form.companyNameInEnglish} </td>
                <td>{this.props.form.companyGovernorate} </td>
                <td>{this.props.form.companyCity} </td>
                <td>{this.props.form.companyAddress} </td>
                <td>{this.props.form.companyTelephone} </td>
                <td>{this.props.form.companyFax} </td>
                <td>{this.props.form.currency} </td>
                <td>{this.props.form.equityCapital}</td>
                <td>{this.props.form.type}</td>
                <td>{this.props.form.creationDate}</td>

            </tr>    
            //</div>
        )   
        
    }
}
export default SortPage