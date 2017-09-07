import React, { Component } from 'react';
import Form from 'react-bootstrap/lib/Form';
import { BrowserRouter as Router,Redirect } from 'react-router-dom'
import { Session } from 'meteor/session';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
export default class Login extends Component {
  constructor() {
    super();
    this.state={
      email:'',
      password:'',
          }
  }
  handleSubmit(event) {
     event.preventDefault();
     const email = this.state.email.trim();
     const password = this.state.password.trim();

      Meteor.loginWithPassword(email, password,function(error){
      if (error) {
          Bert.alert( error, 'danger', 'growl-top-right' );
      }else {
            Bert.alert( 'succefull logged in', 'success', 'growl-top-right' );
            if (Meteor.userId) {
            window.location.href = "/";
            }
          }
      });
     this.setState({
       password:'',
     });
   }
   setValue(field, event) {
    let object = {};
    object[field] = event.target.value;
    this.setState(object);
  }
  render(){
    return(
      <Form inline onSubmit={this.handleSubmit.bind(this)}>

      <FormGroup controlId="formInlineEmail">
        <ControlLabel>Email</ControlLabel>
        <FormControl type="email" placeholder="jane.doe@example.com" value={this.state.email}  onChange={this.setValue.bind(this, 'email')} required/>
      </FormGroup>

        <FormGroup controlId="formInlinePassword">
          <ControlLabel>Password</ControlLabel>
          <FormControl type="password" placeholder="Password" value={this.state.password}  onChange={this.setValue.bind(this, 'password')} required/>
        </FormGroup>

        <Button type="submit">
          Login
        </Button>
      </Form>
    );
  }
}
