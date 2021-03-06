import React, { Component } from 'react';
import './Header.css';
import { Session } from 'meteor/session';
import { withRouter,NavLink } from 'react-router-dom'
import Button from 'react-bootstrap/lib/Button';
//import AddBranchModal from '../branch/AddBranchModal';

 class Header extends Component {
  constructor(){
    super();
  }
  logoutHandle(){
     Session.clear();
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
          {
          Session.get('user') || Session.get('shop') ?
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
