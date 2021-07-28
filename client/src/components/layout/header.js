// import React, { Component } from "react";
// import { MDBNavbar, MDBContainer, MDBNavLink, MDBNavItem, MDBHamburgerToggler, MDBNavbarBrand, MDBNavbarNav,
// MDBCollapse } from "mdbreact";
// import {BrowserRouter as Router, Route} from 'react-router-dom'

// class Header extends Component {
  
// state = {
//   collapse1: ''
// }

// toggleSingleCollapse = collapseId => () => {
//   this.setState({
//     [collapseId]: !this.state[collapseId]
//   });
// };

// render(){
//   return(
//     <Router>
// <MDBNavbar color="indigo darken-2" style={{ marginTop: '20px' }} dark>
//         <MDBContainer>
//           <MDBNavbarBrand className="white-text">
//             MDBNavbar
//           </MDBNavbarBrand>
//           <MDBHamburgerToggler onClick={this.toggleSingleCollapse('collapse3')} id="hamburger3" />
//           <MDBCollapse isOpen={this.state.collapse3} navbar>
//             <MDBNavbarNav left>
//               <MDBNavItem active>
//                 <MDBNavLink >Home</MDBNavLink>
//               </MDBNavItem>
//               <MDBNavItem>
//                 <MDBNavLink >Link</MDBNavLink>
//               </MDBNavItem>
//               <MDBNavItem>
//                 <MDBNavLink >Profile</MDBNavLink>
//               </MDBNavItem>
//             </MDBNavbarNav>
//           </MDBCollapse>
//         </MDBContainer>
//       </MDBNavbar>
//       </Router>
//     );
//   }
// }

// export default Header;