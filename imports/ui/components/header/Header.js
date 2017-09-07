import React, { Component } from 'react';
import './Header.css';
import { withRouter,NavLink } from 'react-router-dom'
import Button from 'react-bootstrap/lib/Button';
//import AddBranchModal from '../branch/AddBranchModal';

const data = [
  {
    link: '/home',
    name: 'Home'
  }, {
    link: '/home/productmaster',
    name: 'Products'
  }, {
    link: '/home/qrcode',
    name: 'QRCodes'
  }, {
    link: '/home/invoice',
    name: 'Invoice'
  }
];
const Links = (props) => (
  <div>
    {data.map((dat, i) => <NavLink activeClassName="selected" key={i} style={{color:'white',padding:10,}} to={dat.link}>{dat.name}</NavLink>)}
  </div>
);
 class Header extends Component {
  constructor(){
    super();
  }
  logoutHandle(){
     Meteor.logout();
     this.props.history.push('/');
    }
    loginHandle(){
        this.props.history.push('/login');
    }
  reload(){
  window.location.reload();
}
  render() {
    return (
      <div className="header">
          <div className="headeritem one" onClick={this.reload.bind(this)}>{this.props.name}</div>
          <div className="headeritem three">
          <Links match={this.props.match}/>
          {
          Meteor.userId() ?
          <div  style={{color:'white',padding:10,}} onClick={this.logoutHandle.bind(this)}>Logout</div>
          :
          <div  style={{color:'white',padding:10,}} onClick={this.loginHandle.bind(this)}>LogIn</div>
          }
          </div>
      </div>
    );
  }
}
export default withRouter(Header);
