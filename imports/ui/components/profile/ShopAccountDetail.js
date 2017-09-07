import React, { Component } from 'react';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
export default class ShopAccountDetail  extends Component {
  constructor() {
    super();
      this.state={
          bankname:'',
          accname:'',
          acctype:'',
          accifsc:'',
      }
  }
  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
 }

 handleSubmit(event) {
        event.preventDefault();
        const bankname = this.state.bankname.trim();
        const accname =this.state.accname.trim();
        const acctype = this.state.acctype.trim();
        const accifsc = this.state.accifsc.trim();
        if (bankname=='') {
          Bert.alert( 'Enter the Bank Name', 'danger', 'growl-top-right' );
          return;
        }
        if (accname=='') {
          Bert.alert( 'Enter the Bank Name', 'danger', 'growl-top-right' );
          return;
        }
        if (acctype=='') {
          Bert.alert( 'Enter the Bank Name', 'danger', 'growl-top-right' );
          return;
        }
        if (accifsc=='') {
          Bert.alert( 'Enter the Bank Name', 'danger', 'growl-top-right' );
          return;
        }

         let accdetail = {
           bankname:bankname,
           accname:accname,
           acctype:acctype,
           accifsc:accifsc,
         }
         let profile=Meteor.user().profile
           profile.shop.accdetail = accdetail;
          Meteor.users.update(Meteor.userId(), {$set: {profile: profile}});
          Bert.alert( `Account Details Has been updates successfully`, 'success', 'growl-top-right' );
        this.setState({
          bankname:'',
          accname:'',
          acctype:'',
          accifsc:'',
     });
     }

  render(){
    return(
       <div>
         <h3>Shop Account Detail</h3>
       <Form onSubmit={this.handleSubmit.bind(this)}>

           <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={4}>
             <ControlLabel>Bank Name</ControlLabel>
             </Col>
              <Col sm={8}>
             <FormControl componentClass="select" placeholder="Bank" value={this.state.bankname}  onChange={this.setValue.bind(this, 'bankname')} required>
               <option value="">select</option>
               <option value="HDFC">HDFC</option>
               <option value="SBI">SBI</option>
               <option value="Union">Union</option>
               <option value="Bank of Baroda">Bank of Baroda</option>
             </FormControl>
               </Col>
            </FormGroup>


              <FormGroup >
                 <Col componentClass={ControlLabel} sm={4}>
                     A/C Name
                 </Col>
                 <Col sm={8}>
                 <FormControl type="text"  placeholder="   A/C Name" value={this.state.accname} onChange={this.setValue.bind(this, 'accname')} required/>
                 </Col>
              </FormGroup>

           <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={4}>
             <ControlLabel>Accout Type</ControlLabel>
             </Col>
              <Col sm={8}>
             <FormControl componentClass="select" placeholder="Type" value={this.state.acctype}  onChange={this.setValue.bind(this, 'acctype')} required>
               <option value="">select</option>
               <option value="Saving">Saving</option>
               <option value="Current">Current</option>
             </FormControl>
               </Col>
            </FormGroup>

            <FormGroup >
               <Col componentClass={ControlLabel} sm={4}>
                  IFSC Code
               </Col>
               <Col sm={8}>
               <FormControl type="text"  placeholder="IFSC Code" value={this.state.accifsc}onChange={this.setValue.bind(this, 'accifsc')} required/>
               </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={4} sm={8} >
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
