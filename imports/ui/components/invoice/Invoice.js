import React, { Component } from 'react';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import { NavLink } from 'react-router-dom';
export default class InvoiceJs  extends Component {
  constructor() {
    super();
      this.state={
          filterText:"",
      }
  }
  deleteProduct(id){
    let result = confirm("Want to delete?");
  if (result) {
   Meteor.call('invoice.remove',id);
    }
}

 setValue(field, event) {
  let object = {};
  object[field] = event.target.value;
  this.setState(object);
}
  render(){

    let filterText=this.props.invoice.filter(
       (invoice)=>{
     return (invoice.to.toLowerCase().indexOf(this.state.filterText.toLowerCase()) !==-1);
   }
 );

    return(
       <div>
       <div style={{display:'flex',flex:1,justifyContent:'flex-start'}} className="invoicesearch">
       <input type="text" placeholder="Search..." className="" value={this.state.filterText}  onChange={this.setValue.bind(this, 'filterText')}/>
       </div>
       {filterText.map((invoice,i)=>
          <div  className='invoice-list-div' key={i} >
            <div className='invoice-list-subdiv-name'> <NavLink  className='invoive-navlink' style={{display:'flex',flex:1}} to={`invoice/${invoice._id}`} >{invoice.to.toUpperCase()}</NavLink></div>
            <div className='invoice-list-subdiv-number'>{invoice.tonumber}</div>
            <div className='invoice-list-subdiv-date'>{`${invoice.createdAt.getDate()}/${invoice.createdAt.getMonth()}/${invoice.createdAt.getFullYear()}`}</div>
            <div  onClick={ ()=> this.deleteProduct(invoice._id) }style={{position:'relative',top:0,right:2,paddingLeft:10,paddingRight:10}}><span className="glyphicon glyphicon-trash"></span></div>
          </div>
       )}
       </div>
    );
  }
}
