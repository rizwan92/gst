import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
export default class Profile  extends Component {
  constructor(props) {
    super(props);
      this.state={
            name:props.user.profile.name,
            email:props.user.emails[0].address,
            number:props.user.profile.mobile,
      }
  }
  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
 }
 handleSubmit(event) {
        event.preventDefault();
        const name = this.state.name.trim();
         let profile=Meteor.user().profile
         profile.name=name;
         if (name=='') {
           Bert.alert( 'name field is blank', 'danger', 'growl-top-right' );
           return
         }
         Meteor.users.update(Meteor.userId(), {$set: {profile: profile}});
         Bert.alert( `name has updated to ${name}`, 'success', 'growl-top-right' );
     }
  render(){
    return(
       <div>
         <h3>Profile</h3>
          <Form onSubmit={this.handleSubmit.bind(this)} >
              <FormGroup >
                 <Col componentClass={ControlLabel} sm={4}>
                     Name
                 </Col>
                 <Col sm={8}>
                 <FormControl type="text"  placeholder="Name" value={this.state.name}onChange={this.setValue.bind(this, 'name')} />
                 </Col>
              </FormGroup>
              <FormGroup >
              <FormGroup controlId="formHorizontalEmail">
                 <Col componentClass={ControlLabel} sm={4}>
                   Email
                 </Col>
                 <Col sm={8}>
                   <FormControl type="email"  placeholder="Email" value={this.state.email}  onChange={this.setValue.bind(this, 'email')} readOnly/>
                 </Col>
               </FormGroup>
                 <Col componentClass={ControlLabel} sm={4}>
                     Number
                 </Col>
                 <Col sm={8}>
                 <FormControl type="number"  placeholder="Number" value={this.state.number}onChange={this.setValue.bind(this, 'number')}  readOnly/>
                 </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={4} sm={12} >
                  <Button type="submit" bsStyle="info" style={{margin:10}}>
                  Save
                  </Button>
                </Col>
              </FormGroup>
            </Form>
       </div>
    );
  }
}
