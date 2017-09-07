import React, { Component } from 'react';
import { City } from '../../../api/city';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
export default class CityForm extends Component {
  constructor() {
    super();
    this.state={
      name:'',
      stateid:'',
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
       const stateid = this.state.stateid.trim();
       const city={
         name:name,
         stateid:stateid,
       }
       Meteor.call('city.insert',city);
       this.setState({
       name:'',
       stateid:'',
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
         <FormControl componentClass="select" placeholder="select" value={this.state.stateid}  onChange={this.setValue.bind(this, 'stateid')} required>
           <option value="">select</option>
           {this.props.states.map((state, i) =>
             <option key={i} value={state._id}>{state.name}</option>
           )}
         </FormControl>
          </Col>
       </FormGroup>

         <FormGroup controlId="formHorizontalEmail">
           <Col componentClass={ControlLabel} sm={2}>
            City
           </Col>
           <Col sm={10}>
             <FormControl type="text" placeholder="Enter City" value={this.state.name}  onChange={this.setValue.bind(this, 'name')} required/>
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
