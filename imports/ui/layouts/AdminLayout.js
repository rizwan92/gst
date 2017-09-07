import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Link, NavLink } from 'react-router-dom';
import Header from '../components/header/Header';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import  CategorySubCategoryPage  from '../pages/CategorySubCategoryPage';
import  AdminPage  from '../pages/AdminPage';
const data = [
  {link:'/admin', name: 'Home'},
  {link:'/admin/category', name: 'Category SubCategory'},
];
const Links=()=>(
<div>
{data.map((dat,i)=>
  <NavLink  activeClassName="selected" key={i} to={dat.link}><ListGroupItem className="mysidelinklis" onClick={()=> {}} >{dat.name}</ListGroupItem></NavLink>
)}
</div>
);
export default class AdminLayout extends Component {
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
            <Route  path="/admin" component={AdminPage} />
            <Route  path="/admin/category" component={CategorySubCategoryPage} />
             </Col>
         </Row>
     </div>
     </div>
   )
 }
}
