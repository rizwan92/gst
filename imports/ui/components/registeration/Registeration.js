import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
class Registeration extends Component {
  constructor() {
    super();
    this.state={
      name:'',
      mobile:'',
      email:'',
      password:'',
      confirmPassword:'',
          }
  }
  handleSubmit(event) {
     event.preventDefault();
     const name = this.state.name.trim();
     const number =this.state.mobile.trim();
     const email = this.state.email.trim();
     const password = this.state.password.trim();
     const confirmPassword = this.state.confirmPassword.trim();
      if (password===confirmPassword) {

        Meteor.call('user.check',email,password ,(error,result)=>{
          if (result) {
             Bert.alert( 'Email already Exist', 'danger', 'growl-top-right' );
          }else {
            const user={
              name,email,number,password
            }
            Meteor.call('user.insert',user,(er,res)=>{
              if (!er) {
                Bert.alert( `Successfull Registered`, 'success', 'growl-top-right' );
              }
            });
          }
        });
    }else {
      Bert.alert( `password doesn't match`, 'danger', 'growl-top-right' );

    }
     this.setState({
       password:'',
       confirmPassword:'',
  });
  }
  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
 }
  render(){
    return(
      <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={4}>
          Name
          </Col>
          <Col sm={8}>
            <FormControl type="text" placeholder="Name" required value={this.state.name}  onChange={this.setValue.bind(this, 'name')} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={4}>
            Mobile
          </Col>
          <Col sm={8}>
            <FormControl type="text" placeholder="Mobile" required value={this.state.mobile}  onChange={this.setValue.bind(this, 'mobile')}/>
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={4}>
          Email
          </Col>
          <Col sm={8}>
            <FormControl type="email" placeholder="Email" required value={this.state.email}  onChange={this.setValue.bind(this, 'email')}/>
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={4}>
          Password
          </Col>
          <Col sm={8}>
            <FormControl type="Password" placeholder="Password" required value={this.state.password}  onChange={this.setValue.bind(this, 'password')}/>
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={4}>
        Confirm Password
          </Col>
          <Col sm={8}>
            <FormControl type="Password" placeholder="Confirm Password" required value={this.state.confirmPassword}  onChange={this.setValue.bind(this, 'confirmPassword')}/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={4} sm={8}>
            <Button type="submit">
              Register
            </Button>
          </Col>
        </FormGroup>
      </Form>

    );
  }
}
export default withRouter(Registeration);
