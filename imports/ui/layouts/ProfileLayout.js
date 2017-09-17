import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import CircularProgressbar from 'react-circular-progressbar';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Meteor } from 'meteor/meteor'
import { StateApi } from '../../api/state';
import { CityApi } from '../../api/city';
import  ProfilePage  from '../pages/ProfilePage';
import Header from '../components/header/Header';

class ProfileLayout  extends Component {
  constructor() {
    super();
  }
  render(){
    return(
       <div>
       {
         this.props.loading ?  <CircularProgressbar percentage={100} initialAnimation/>  :
        <div className="container-fluid" >
          <Header name="Accounting" />
            <Row  style={{marginTop:50}}>
                 <Col sm={2}  >

                 </Col>
                 <Col sm={8}   >
                    <ProfilePage user={this.props.user} states={this.props.states} city={this.props.city}/>
                 </Col>
                 <Col sm={2}  >

                 </Col>
           </Row>
         </div>
       }
       </div>
    );
  }
}
export default createContainer(() => {
  const todosHandle = Meteor.subscribe('myuser');
  const todosHandle2 = Meteor.subscribe('city');
  const todosHandle3 = Meteor.subscribe('state');

  const loading = !todosHandle.ready();
  return {
    loading,
    user:  Meteor.users.findOne({ _id: Meteor.userId() }),
    states: StateApi.find({}).fetch(),
    city: CityApi.find({}).fetch(),
 };
}, ProfileLayout);
