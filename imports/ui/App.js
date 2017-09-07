import React, { Component } from 'react';
import { Route,Link, NavLink,Switch } from 'react-router-dom';
import  MainLayout  from './layouts/MainLayout';
import  AdminLayout  from './layouts/AdminLayout';
import  LoginLayout  from './layouts/LoginLayout';
import  ShopSelectPage  from './pages/ShopSelectPage';
import  ProfileLayout  from './layouts/ProfileLayout';
export default class App extends Component {
  render(){
   return (
     <div>
      <Switch>
            <Route exact path="/" component={MainLayout} />
            <Route  path="/home" component={MainLayout} />
            <Route  path="/admin" component={AdminLayout} />
            <Route  path="/login" component={LoginLayout} />
            <Route  path="/select" component={ShopSelectPage} />
            <Route  path="/profile" component={ProfileLayout} />
            <Route  path="/profile/:msg" component={ProfileLayout} />
            <Route component={NoMatch}/>
        </Switch>
     </div>
   )
 }
}
const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)
