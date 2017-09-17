import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Invoice } from '../../api/invoice';


export default class ReportPage  extends Component {
  constructor() {
    super();
    this.state={
      invoice:[],
    }
  }
  componentWillMount(){
    Tracker.autorun(() => {
      Meteor.subscribe('invoice');
      const invoice = Invoice.find({},{fields:{products:1}}).fetch();
      this.setState({
        invoice:invoice,
      },()=>{console.log(this.state.invoice)});
    })

  }
  render(){
    return(
       <div>
       ReportPage
       </div>
    );
  }
}
