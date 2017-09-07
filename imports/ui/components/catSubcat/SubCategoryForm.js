import React, { Component } from 'react';
import Form from 'react-bootstrap/lib/Form';
import { createContainer } from 'meteor/react-meteor-data';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';

export default class SubCategoryForm extends Component {
  constructor() {
    super();
    this.state={
      subCategory:'',
      catid:'',
          }
  }
  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
 }
    handleSubmit(event) {
         event.preventDefault();
         const subCategory = this.state.subCategory.trim();
         const catid = this.state.catid.trim();
        Meteor.call('subcategory.insert',subCategory,catid);
         this.setState({
         subCategory:'',
         catid:'',
      });
      }
  render(){
    return(
       <div>
       <Form horizontal onSubmit={this.handleSubmit.bind(this)}>

       <FormGroup controlId="formControlsSelect">
        <Col componentClass={ControlLabel} sm={2}>
         <ControlLabel>Select</ControlLabel>
         </Col>
          <Col sm={10}>
         <FormControl componentClass="select" placeholder="select" value={this.state.catid}  onChange={this.setValue.bind(this, 'catid')} required>
           <option value="">select</option>
           {this.props.categories.map((category, i) =>
             <option key={i} value={category._id}>{category.name}</option>
           )}
         </FormControl>
          </Col>
       </FormGroup>

         <FormGroup controlId="formHorizontalEmail">
           <Col componentClass={ControlLabel} sm={2}>
            Sub Category
           </Col>
           <Col sm={10}>
             <FormControl type="text" placeholder="Enter Sub Category" value={this.state.subCategory}  onChange={this.setValue.bind(this, 'subCategory')} required/>
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
