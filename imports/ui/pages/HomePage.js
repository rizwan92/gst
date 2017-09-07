import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import Home from '../components/home/Home';
export default class HomePage  extends Component {
  render(){
    return(
       <div style={{paddingTop:20}}>
       <Home masterproducts={this.props.products} user={this.props.user} shop={this.props.shop}/>
       </div>
    );
  }
}
