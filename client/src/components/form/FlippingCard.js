import React, { Component } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import trans from '../translations/companiesTranslation'
import '../../App.scss'

class FlippingCard extends Component{
render() {

  trans.setLanguage(this.props.lang)
	return(
  <Flippy
    flipOnHover={false}
    flipOnClick={true} 
    flipDirection="horizontal" // horizontal or vertical
    ref={(r) => this.flippy = r}
    style={{ width: "100%" , height: '430px' }} /// these are optional style, it is not necessary
  >
    <FrontSide
      style={{
       borderStyle: 'solid',
       borderWidth:'5px',
       backgroundSize: "486px 400px"
      }}
    >
    <div style={{textAlign:'center' ,fontSize:'50px' , textShadow:'-2px 0 white, 0 2px white, 2px 0 white, 0 -2px white'}}>
    <h1 style = {{textShadow:'-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white', fontSize:'100px'}}>{this.props.company.companyName} </h1><br/>
             <i class="fas fa-angle-double-left" title='click to view details' style={{paddingRight:'650px'}}></i>
             <i class="fas fa-angle-double-right" title='click to view details' style={{paddingLeft:'650px'}}></i><br/>
      </div>
    </FrontSide>
    <BackSide
       style={{ backgroundColor: '#f7f7f7', borderStyle: 'solid',borderWidth:'5px', paddingLeft:'60px'}}>
{/*        

        <h2 style={{fontSize:'30px'}}><i class="fas fa-circle" style={{fontSize:"15px"}}></i> Name In English :<span style ={{textAlign:'center'}}></span> <span style = {{ color:'#9ad1e7'}}>{this.props.company.companyNameInEnglish}</span> </h2> 
           <h4><i class="fas fa-circle" style={{fontSize:"15px"}}></i> Governorate :<span style ={{textAlign:'center'}}></span> <span style = {{ color:'#9ad1e7'}}>{this.props.company.companyGovernorate}</span> </h4>
           <h4><i class="fas fa-circle"style={{fontSize:"15px"}}></i> City :<span style ={{textAlign:'center'}}></span> <span style = {{ color:'#9ad1e7'}}>{this.props.company.companyCity}</span> </h4>
           <h4><i class="fas fa-circle"style={{fontSize:"15px"}}></i> Address :<span style ={{textAlign:'center'}}></span> <span style = {{ color:'#9ad1e7'}}>{this.props.company.companyAddress}</span> </h4>
           <h4><i class="fas fa-circle"style={{fontSize:"15px"}}></i> Telephone :<span style ={{textAlign:'center'}}></span> <span style = {{ color:'#9ad1e7'}}>{this.props.company.companyTelephone}</span> </h4>
           <h4><i class="fas fa-circle"style={{fontSize:"15px"}}></i> Fax :<span style ={{textAlign:'center'}}></span> <span style = {{ color:'#9ad1e7'}}>{this.props.company.companyFax}</span> </h4>
           <h4><i class="fas fa-circle"style={{fontSize:"15px"}}></i> Currency :<span style ={{textAlign:'center'}}></span> <span style = {{ color:'#9ad1e7'}}>{this.props.company.currency}</span> </h4>
           <h4><i class="fas fa-circle"style={{fontSize:"15px"}}></i> Equity Capital :<span style ={{textAlign:'center'}}></span> <span style = {{ color:'#9ad1e7'}}>{this.props.company.equityCapital}</span> </h4>
           <h4><i class="fas fa-circle"style={{fontSize:"15px"}}></i> Type :<span style ={{textAlign:'center'}}></span> <span style = {{ color:'#9ad1e7'}}>{this.props.company.type}</span> </h4>
           <h4><i class="fas fa-circle"style={{fontSize:"15px"}}></i> Creation Date :<span style ={{textAlign:'center'}}></span> <span style = {{ color:'#9ad1e7'}}>{this.props.company.creationDate}</span> </h4> */}
    </BackSide>
  </Flippy>
)
}
}

export default FlippingCard
