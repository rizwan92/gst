import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Header from '../components/header/Header';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Login from '../components/login/Login';
import Registeration from '../components/registeration/Registeration';
import { Tracker } from 'meteor/tracker';
import {Meteor} from 'meteor/meteor';
import {UserApi} from '../../api/user';

export default class LoginPage extends Component {

  componentDidMount(){
    Tracker.autorun(() => {
      Meteor.subscribe('user');
      const users= UserApi.find().fetch();
      }
    )
  }

  render(){
    return (
      <div >
        <Grid >
            <Row>
            <br />
              <Col sm={12} >
              <Login />
            </Col>
            </Row>
            <br />
            <br />
            <br />
            <br />
            <Row>
              <Col sm={3} className="text-center" ></Col>
              <Col sm={6} className="text-center" >
                <Registeration />
              </Col>
              <Col sm={3} className="text-center" ></Col>
            </Row>

        </Grid>
        </div>
    );
  }
}
