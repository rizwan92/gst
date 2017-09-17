import React, { Component } from 'react';
import Form from 'react-bootstrap/lib/Form';
import { BrowserRouter as Router,Redirect,withRouter } from 'react-router-dom'
import { Session } from 'meteor/session';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import {Meteor} from 'meteor/meteor';
class Login extends Component {
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
      const router=this;

      Meteor.call('user.check',email,password,(error,result)=>{
        if (result) {
            Bert.alert( 'succefull logged in', 'success', 'growl-top-right' );
            Session.setPersistent('user', result)
            router.props.history.push('/admin')
        }else {
              Meteor.call('shop.check',email,password,function (error,result){
                if (result) {
                  Session.setPersistent('shop', result)
                  router.props.history.push('/home')
                }else {
                  Bert.alert( 'email password doesnt match', 'danger', 'growl-top-right' );
                }
              });
        }
      }
    )
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
        <FormControl type="text" placeholder="jane.doe@example.com" value={this.state.email}  onChange={this.setValue.bind(this, 'email')} required/>
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
export default withRouter(Login);
