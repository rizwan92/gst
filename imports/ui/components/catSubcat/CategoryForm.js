import React, { Component } from 'react';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
export default class CategoryForm extends Component {
  constructor() {
    super();
    this.state={
      category:'',
          }
  }
  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
 }
 handleSubmit(event) {
      event.preventDefault();
      const category = this.state.category.trim();
        Meteor.call('category.insert',category);
      this.setState({
      category:'',
   });
   }

  render(){
    return(
       <div>
       <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
         <FormGroup controlId="formHorizontalEmail">
           <Col componentClass={ControlLabel} sm={2}>
             Category
           </Col>
           <Col sm={10}>
             <FormControl type="text" placeholder="Enter Category" value={this.state.category}  onChange={this.setValue.bind(this, 'category')} required/>
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
