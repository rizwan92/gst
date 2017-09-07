import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import CircularProgressbar from 'react-circular-progressbar';
import { Invoice } from '../../api/invoice';
import InvoiceJs from '../components/invoice/Invoice';
import { Meteor } from 'meteor/meteor'
class InvoicePage  extends Component {
  constructor() {
    super();

  }
  render(){
    return(
       <div>
       {  Meteor.userId() ?  '' :   window.location.href = '/login'}
       {
         this.props.loading ?  <CircularProgressbar percentage={100} initialAnimation/>  :
         <InvoiceJs invoice={this.props.invoice} />
       }
       </div>
       );
  }
}
export default createContainer(() => {
  const todosHandle = Meteor.subscribe('invoice');
  const loading = !todosHandle.ready();
  return {
      loading,
      user:  Meteor.users.findOne({ _id: Meteor.userId() }),
      invoice: Invoice.find({}, {sort: {createdAt: -1}}).fetch(),
 };
}, withRouter(InvoicePage));
