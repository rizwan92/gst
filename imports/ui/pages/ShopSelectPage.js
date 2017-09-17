import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import CircularProgressbar from 'react-circular-progressbar';
import { Session } from 'meteor/session';
import {Route, Link, NavLink, withRouter, Redirect} from 'react-router-dom';
import {ShopApi} from '../../api/shop';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
 class ShopSelectPage extends Component {
  constructor() {
    super();
      this.state={
            shop:{},
      }
  }
  setValue(field, event) {
    this.setState({shop:event.target.value});
    Session.setPersistent('shop',event.target.value);
    let shop=Session.get('shop');
    console.log(shop);
  }
  render() {
    return (
      <div className="myshopselection">
      {this.props.loading  ?

       <CircularProgressbar percentage={100} initialAnimation/>
          :
          <div>
        <FormGroup controlId="formControlsSelect">
          <h2>Select Your Shop</h2>
          <FormControl componentClass="select" value={this.state.shop} onChange={this.setValue.bind(this, 'shop')} required>
            <option value="">select</option>
            {this.props.shops.map((shop, i) => {
              return (
                <option key={i} value={shop._id}>{shop.shopname}</option>
              );
            })}
          </FormControl>
        </FormGroup>
        </div>
      }
      </div>
    );
  }
}
export default createContainer(() => {
  const todosHandle = Meteor.subscribe('shop');
  const loading = !todosHandle.ready();
  return {
    loading,
    shops: ShopApi.find({usserid: Meteor.userId()}).fetch()
  };
}, withRouter(ShopSelectPage));
