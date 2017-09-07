import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import CircularProgressbar from 'react-circular-progressbar';
export default class AdminPage  extends Component {
  constructor() {
    super();

  }
  render(){
    return(
       <div>
        {  Meteor.userId() ?  '' :   window.location.href = '/login'}
      this is   Admin page
       </div>
    );
  }
}
