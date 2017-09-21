import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import Home from '../components/home/Home';
import { Tracker } from 'meteor/tracker';
import {Meteor} from 'meteor/meteor';
import {ShopApi} from '../../api/shop';
import {UserApi} from '../../api/user';
import { ProductMasterApi } from '../../api/productMaster';
import { Session } from 'meteor/session';


export default class HomePage  extends Component {
  constructor() {
    super();
    this.state = {
    products:[],
  }
}

  componentWillMount(){
    Tracker.autorun(() => {
      Meteor.subscribe('productMaster');
      Meteor.subscribe('myuser');
      Meteor.subscribe('purchase');
      const Products= ProductMasterApi.find().fetch();
      this.setState({
        products:Products,
      });
    })

  }

  render(){
    return(
       <div style={{paddingTop:20}}>
       <Home masterproducts={this.state.products}  shop={Session.get('shop')}/>
       </div>
    );
  }
}
