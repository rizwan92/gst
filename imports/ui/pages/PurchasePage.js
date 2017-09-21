import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { createContainer } from 'meteor/react-meteor-data';
import CircularProgressbar from 'react-circular-progressbar';
import { PurchaseApi } from '../../api/purchase';
import Purchase from '../components/purchase/Purchase';
import { Meteor } from 'meteor/meteor'
class PurchasePage  extends Component {
  constructor() {
    super();

  }
  render(){
    return(
       <div className="invoicecontainer">
       {
         this.props.loading ?  <CircularProgressbar percentage={100} initialAnimation/>  :
         <Purchase purchase={this.props.purchase} />
       }
       </div>
       );
  }
}
export default createContainer(() => {
  const todosHandle = Meteor.subscribe('purchase');
  const loading = !todosHandle.ready();
  return {
      loading,
      purchase: PurchaseApi.find({}, {sort: {createdAt: -1}}).fetch(),
 };
}, withRouter(PurchasePage));
