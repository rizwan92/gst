import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import {Route, Link, NavLink, withRouter, Redirect} from 'react-router-dom';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import ReactLoading from 'react-loading';
import Header from '../components/header/Header';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import PurchasePage from '../pages/PurchasePage';
import ShopSelectPage from '../pages/ShopSelectPage';
import ProductMasterPage from '../pages/ProductMasterPage';
import CategorySubCategoryPage from '../pages/CategorySubCategoryPage';
import QRCodePage from '../pages/QRCodePage';
import ReportPage from '../pages/ReportPage';
import InvoicePage from '../pages/InvoicePage';
import InvoiceDetail from '../components/invoice/InvoiceDetail';
import PurchaseDetail from '../components/purchase/PurchaseDetail';
import {ProductMasterApi} from '../../api/productMaster';
import {Invoice} from '../../api/invoice';
import {ShopApi} from '../../api/shop';
import {Meteor} from 'meteor/meteor'
const data = [
  {
    link: '/home',
    name: 'Home'
  }, {
    link: '/home/productmaster',
    name: 'Products'
  }, {
    link: '/home/invoice',
    name: 'Invoice'
  }, {
    link: '/home/purchase',
    name: 'Purchase'
  }, {
    link: '/home/report',
    name: 'Reports'
  }, {
    link: '/home/qrcode',
    name: 'QRCodes'
  }
];
const Links = (props) => (
  <div>
    {data.map((dat, i) => <NavLink activeClassName={dat.name === 'Home'? '' :  'selected' } key={i} className="sidebar" to={dat.link}>{dat.name}</NavLink>)}
  </div>
);

export default class MainLayout extends Component {
  constructor(props) {
    super(props);
  }

  authentication(props) {
    return (
      Session.get('shop') ?
       <HomePage />
       :
        <Redirect to={{  pathname: '/login',  state: {  from: props.location  }  }}/>
      )

  }

  render() {
    return (
      <div  style={{  height: '100%'}}>
             <div>
            <Header name="Accounting"/>
            <div className="container-fluid">
              <Row style={{  marginTop: 60  }}>
                <Col sm={2}  className="mysidebar">
                  <Links match={this.props.match}/>
                </Col>
                <Col sm={10} >
                  <Route exact path="/" render={this.authentication.bind(this)}/>
                  <Route exact path="/home" render={this.authentication.bind(this)}/>
                  <Route exact path="/home/productmaster" component={ProductMasterPage}/>
                  <Route exact path="/home/invoice" component={InvoicePage}/>
                  <Route exact path="/home/invoice/:id" component={InvoiceDetail}/>
                  <Route exact path="/home/qrcode" component={QRCodePage}/>
                  <Route exact path="/home/report" component={ReportPage}/>
                  <Route exact path="/home/purchase" component={PurchasePage}/>
                  <Route exact path="/home/purchase/:id" component={PurchaseDetail}/>
                </Col>
              </Row>
            </div>
          </div>
      </div>
    )
  }
}
