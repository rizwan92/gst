import React, { Component } from 'react';
import  Profile  from '../components/profile/Profile';
import  ShopDetail  from '../components/profile/ShopDetail';
import  ShopAccountDetail  from '../components/profile/ShopAccountDetail';
export default class ProfilePage  extends Component {
  constructor() {
    super();
  }
  render(){
    return(
       <div>
       <Profile user={this.props.user}/>
       <ShopDetail  states={this.props.states} city={this.props.city} />
       </div>
    );
  }
}
