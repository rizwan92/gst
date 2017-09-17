import React, { Component } from 'react';
import { Session } from 'meteor/session';
import {BrowserRouter as Router, Route,Link, NavLink,Redirect } from 'react-router-dom';
import Header from '../components/header/Header';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import  CategorySubCategoryPage  from '../pages/CategorySubCategoryPage';
import  ShopPage  from '../pages/ShopPage';
import  AdminPage  from '../pages/AdminPage';

const data = [
  {link:'/admin', name: 'Home'},
  {link:'/admin/category', name: 'Category SubCategory'},
  {link:'/admin/shop', name: 'Shops'},
];
const Links=()=>(
<div>
{data.map((dat,i)=>
  <NavLink  activeClassName="selected" key={i} to={dat.link}><ListGroupItem className="mysidelinklis" onClick={()=> {}} >{dat.name}</ListGroupItem></NavLink>
)}
</div>
);
export default class AdminLayout extends Component {

  authentication(props) {
    return (
      Session.get('user') ?
       <AdminPage />
       :
        <Redirect to={{  pathname: '/login',  state: {  from: props.location  }  }}/>
      )

  }

  render(){
   return (
     <div>
     <div className="container-fluid" >
     <Header name="Accounting" />
         <Row  style={{marginTop:50}}>
           <Col sm={2} className="nopadding" >
           <Links  />
            </Col>
            <Col sm={10} style={{paddingTop:20}} >
            <Route exact path="/admin" render={this.authentication.bind(this)} />
            <Route exact path="/admin/shop" component={ShopPage} />
            <Route exact path="/admin/category" component={CategorySubCategoryPage} />
             </Col>
         </Row>
     </div>
     </div>
   )
 }
}
