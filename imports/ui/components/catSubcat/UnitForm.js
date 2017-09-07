import React, { Component } from 'react';
import { Unit } from '../../../api/unit';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
export default class UnitForm extends Component {
  constructor() {
    super();
    this.state={
      name:'',
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
      Unit.insert({
        name:name,
        createdAt: new Date(), // current time
      });
      this.setState({
      name:'',
   });
   }

  render(){
    return(
       <div>
       <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
         <FormGroup controlId="formHorizontalEmail">
           <Col componentClass={ControlLabel} sm={2}>
             Unit
           </Col>
           <Col sm={10}>
             <FormControl type="text" placeholder="Enter Unit" value={this.state.name}  onChange={this.setValue.bind(this, 'name')} required/>
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
