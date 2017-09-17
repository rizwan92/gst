import React, {Component} from 'react';
import Form from 'react-bootstrap/lib/Form';
import { Session } from 'meteor/session';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
export default class ShopDetail extends Component {
  constructor() {
    super();
    this.state = {
      shopname: '',
      password: '',
      shopnumber: '',
      shopownername: '',
      shopgstin: '',
      stateid: '',
      cityid: '',
      shopaddress: '',
      shopwebsite: '',
      bankname: '',
      accname: '',
      acctype: '',
      accifsc: ''
    }
  }
  setValue(field, event) {
    let object = {};
    object[field] = event.target.value;
    this.setState(object);
  }
  handleSubmit(event) {
    event.preventDefault();
    const shopname = this.state.shopname.trim();
    const password = this.state.password.trim();
    const shopnumber = this.state.password.trim();
    const shopownername = this.state.shopownername.trim();
    const shopgstin = this.state.shopgstin.trim();
    const stateid = this.state.stateid.trim();
    const cityid = this.state.cityid.trim();
    const shopaddress = this.state.shopaddress.trim();
    const shopwebsite = this.state.shopwebsite.trim();
    const bankname = this.state.bankname.trim();
    const accname = this.state.accname.trim();
    const acctype = this.state.acctype.trim();
    const accifsc = this.state.accifsc.trim();

    if (shopname == '') {
      Bert.alert('Enter the Shop Name', 'danger', 'growl-top-right');
      return;
    }
    if (shopownername == '') {
      Bert.alert('Enter the Owner Name', 'danger', 'growl-top-right');
      return;
    }
    if (shopgstin == '') {
      Bert.alert('Enter the GSTIN ', 'danger', 'growl-top-right');
      return;
    }
    if (stateid == '') {
      Bert.alert('Enter the State', 'danger', 'growl-top-right');
      return;
    }

    let shopdetail = {
      shopname: shopname,
      password: password,
      shopnumber: shopnumber,
      shopownername: shopownername,
      shopgstin: shopgstin,
      stateid: stateid,
      cityid: cityid,
      shopaddress: shopaddress,
      shopwebsite: shopwebsite
    }
    let accdetail = {
      bankname: bankname,
      accname: accname,
      acctype: acctype,
      accifsc: accifsc
    }
    Meteor.call('shop.insert', shopdetail, accdetail,Session.get('user')._id);
    Bert.alert(`Account Details Has been updates successfully`, 'success', 'growl-top-right');
    this.setState({
      shopname: '',
      password: '',
      shopnumber: '',
      shopownername: '',
      shopgstin: '',
      stateid: '',
      cityid: '',
      shopaddress: '',
      shopwebsite: '',
      bankname: '',
      accname: '',
      acctype: '',
      accifsc: ''
    });
  }

  render() {
    return (
      <div>
        <h3>Shop Detail</h3>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup >
            <Col componentClass={ControlLabel} sm={4}>
              Shop Name
            </Col>
            <Col sm={8}>
              <FormControl type="text" placeholder="Shop Name" value={this.state.shopname} onChange={this.setValue.bind(this, 'shopname')} required/>
            </Col>
          </FormGroup>

          <FormGroup >
            <Col componentClass={ControlLabel} sm={4}>
            Password
            </Col>
            <Col sm={8}>
              <FormControl type="password" placeholder="password" value={this.state.password} onChange={this.setValue.bind(this, 'password')} required/>
            </Col>
          </FormGroup>

          <FormGroup >
            <Col componentClass={ControlLabel} sm={4}>
            Number
            </Col>
            <Col sm={8}>
              <FormControl type="text" placeholder="Number" value={this.state.shopnumber} onChange={this.setValue.bind(this, 'shopnumber')} required/>
            </Col>
          </FormGroup>

          <FormGroup >
            <Col componentClass={ControlLabel} sm={4}>
              Owner Name
            </Col>
            <Col sm={8}>
              <FormControl type="text" placeholder="Owner Name" value={this.state.shopownername} onChange={this.setValue.bind(this, 'shopownername')} required/>
            </Col>
          </FormGroup>

          <FormGroup >
            <Col componentClass={ControlLabel} sm={4}>
              GSTIN
            </Col>
            <Col sm={8}>
              <FormControl type="number" placeholder="GSTIN" value={this.state.shopgstin} onChange={this.setValue.bind(this, 'shopgstin')} required/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={4}>
              <ControlLabel>State</ControlLabel>
            </Col>
            <Col sm={8}>
              <FormControl componentClass="select" placeholder="select" value={this.state.stateid} onChange={this.setValue.bind(this, 'stateid')} required>
                <option value="">select</option>
                {this.props.states.map((state, i) => <option key={i} value={state._id}>{state.name}</option>)}
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={4}>
              <ControlLabel>City</ControlLabel>
            </Col>
            <Col sm={8}>
              <FormControl componentClass="select" placeholder="City" value={this.state.cityid} onChange={this.setValue.bind(this, 'cityid')} required>
                <option value="">select</option>
                {this.props.city.map((city, i) => {
                  if (city.stateid == this.state.stateid) {
                    return (
                      <option key={i} value={city._id}>{city.name}</option>
                    );
                  }
                })}
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup >
            <Col componentClass={ControlLabel} sm={4}>
              Address
            </Col>
            <Col sm={8}>
              <FormControl type="text" placeholder="Address" value={this.state.shopaddress} onChange={this.setValue.bind(this, 'shopaddress')} required/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={4}>
              Web Site
            </Col>
            <Col sm={8}>
              <FormControl type="text" placeholder="Web Site If You Have" value={this.state.shopwebsite} onChange={this.setValue.bind(this, 'shopwebsite')} required/>
            </Col>
          </FormGroup>

          <h3>Account Detail</h3>

          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={4}>
              <ControlLabel>Bank Name</ControlLabel>
            </Col>
            <Col sm={8}>
              <FormControl componentClass="select" placeholder="Bank" value={this.state.bankname} onChange={this.setValue.bind(this, 'bankname')} required>
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
              <FormControl type="text" placeholder="   A/C Name" value={this.state.accname} onChange={this.setValue.bind(this, 'accname')} required/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={4}>
              <ControlLabel>Accout Type</ControlLabel>
            </Col>
            <Col sm={8}>
              <FormControl componentClass="select" placeholder="Type" value={this.state.acctype} onChange={this.setValue.bind(this, 'acctype')} required>
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
              <FormControl type="text" placeholder="IFSC Code" value={this.state.accifsc} onChange={this.setValue.bind(this, 'accifsc')} required/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={4} sm={8}>
              <Button type="submit" bsStyle="info" style={{
                margin: 10
              }}>
                Save
              </Button>
            </Col>
          </FormGroup>

        </Form>
      </div>
    );
  }
}
