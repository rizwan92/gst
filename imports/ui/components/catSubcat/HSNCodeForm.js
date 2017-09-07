import React, { Component } from 'react';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
export default class HSNCodeForm extends Component {
  constructor() {
    super();
    this.state={
      name:'',
      value:'',
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
      const value = this.state.value.trim();
      const hsn={
        name:name,
        value:value,
      }
     Meteor.call('hsn.insert',hsn);
      this.setState({
      name:'',
      value:'',
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
             <FormControl type="text" placeholder="HSN Code Name" value={this.state.name}  onChange={this.setValue.bind(this, 'name')} required/>
           </Col>
         </FormGroup>

         <FormGroup controlId="formHorizontalEmail">
           <Col componentClass={ControlLabel} sm={2}>
             Value
           </Col>
           <Col sm={10}>
             <FormControl type="text" placeholder="HSN Code Value" value={this.state.value}  onChange={this.setValue.bind(this, 'value')} required/>
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
