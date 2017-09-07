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
import ShopSelectPage from '../pages/ShopSelectPage';
import ProductMasterPage from '../pages/ProductMasterPage';
import CategorySubCategoryPage from '../pages/CategorySubCategoryPage';
import QRCodePage from '../pages/QRCodePage';
import InvoicePage from '../pages/InvoicePage';
import InvoiceDetail from '../components/invoice/InvoiceDetail';
import {ProductMasterApi} from '../../api/productMaster';
import {Invoice} from '../../api/invoice';
import {Shop} from '../../api/shop';
import {Meteor} from 'meteor/meteor'
const data = [
  {
    link: '/home',
    name: 'Home'
  }, {
    link: '/home/productmaster',
    name: 'Product Master'
  }, {
    link: '/home/qrcode',
    name: 'QRCodes'
  }, {
    link: '/home/invoice',
    name: 'Invoice'
  }
];
const Links = (props) => (
  <div>
    {data.map((dat, i) => <NavLink activeClassName="selected" key={i} to={dat.link}>{dat.name}</NavLink>)}
  </div>
);

class MainLayout extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    // let shop=Session.get('shop');
    // console.log(shop);
    // if(shop){
    //   this.setState=({shop:shop},()=>{console.log(this.state)});
    // }
  }
  authentication(props) {
    return (

        this.props.user  ?
        this.props.shopcount !== 1  ?
       <HomePage user={this.props.user} products={this.props.products} shop={this.props.shops[0]}/>
          :
        <Redirect to={{  pathname: '/profile',  state: {from: props.location}}}/>
          :
        <Redirect to={{  pathname: '/login',  state: {  from: props.location  }  }}/>
      )

  }

  render() {
    return (
      <div className="showgrid" style={{  height: '100%'}}>
        {this.props.loading  ?

          <ReactLoading type="spin" color="yellow" height={100} width={100} className="reactloading"/>
            :
             <div>
            <Header name="Accounting"/>
            <div className="container-fluid">
              <Row style={{  marginTop: 50  }}>
                <Col sm={2} className="nopadding sidebar">
                  <Links match={this.props.match}/>
                </Col>
                <Col sm={10}>
                  <Route exact path="/" render={this.authentication.bind(this)}/>
                  <Route exact path="/home" render={this.authentication.bind(this)}/>
                  <Route exact path="/home/productmaster" component={ProductMasterPage}/>
                  <Route exact path="/home/invoice" component={InvoicePage}/>
                  <Route exact path="/home/invoice/:id" component={InvoiceDetail}/>
                  <Route exact path="/home/qrcode" component={QRCodePage}/>
                </Col>
              </Row>
            </div>
          </div>
        }
      </div>
    )
  }
}
export default createContainer(() => {
  const todosHandle = Meteor.subscribe('productMaster');
  const todosHandle1 = Meteor.subscribe('myuser');
  const todosHandle2 = Meteor.subscribe('invoice');
  const todosHandle3 = Meteor.subscribe('shop');
  const loading = !todosHandle.ready();
  return {
    loading,
    user: Meteor.users.findOne({_id: Meteor.userId()}),
    products: ProductMasterApi.find({}, {  sort: {  createdAt: -1  }}).fetch(),
    shopcount: Shop.find({usserid: Meteor.userId()}).count(),
    shops: Shop.find({usserid: Meteor.userId()}).fetch()
  };
}, withRouter(MainLayout));
