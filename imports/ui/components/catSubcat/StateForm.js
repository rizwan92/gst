import React, { Component } from 'react';
import { State } from '../../../api/state';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
export default class StateForm extends Component {
  constructor() {
    super();
    this.state={
      name:'',
      code:'',
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
      const code = this.state.code.trim();
      const state={
        name:name,
        code:code,
      }
      Meteor.call('state.insert',state);
      this.setState({
      name:'',
      code:'',
   });
   }

  render(){
    return(
       <div>
       <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
         <FormGroup controlId="formHorizontalEmail">
           <Col componentClass={ControlLabel} sm={2}>
             Name
           </Col>
           <Col sm={10}>
             <FormControl type="text" placeholder="Enter State Name" value={this.state.name}  onChange={this.setValue.bind(this, 'name')} required/>
           </Col>
         </FormGroup>

         <FormGroup controlId="formHorizontalEmail">
           <Col componentClass={ControlLabel} sm={2}>
             State Code
           </Col>
           <Col sm={10}>
             <FormControl type="text" placeholder="Enter State Code" value={this.state.code}  onChange={this.setValue.bind(this, 'code')} required/>
           </Col>
         </FormGroup>
         <FormGroup>
           <Col smOffset={2} sm={10}>
             <Button type="submit">
               Submit
             </Button>
           </Col>
         </FormGroup>
        </Form>
       </div>
    );
  }
}
