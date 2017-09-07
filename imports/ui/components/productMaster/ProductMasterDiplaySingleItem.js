import React, { Component } from 'react';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Panel from 'react-bootstrap/lib/Panel';
import ContentEditable from 'react-contenteditable';

 export default class ProductMasterDiplaySingleItem extends Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
      contentstate: true,
      productName:props.product.productName,
      hsnCode:props.product.hsnCode,
      mrp:props.product.mrp,
      tax:props.product.tax,
      purchasePrice:props.product.purchasePrice,
      uom:props.product.uom,
      stock:props.product.stock,
    };
  }
  deleteProduct(){
    let result = confirm("Want to delete?");
      if (result) {
        Meteor.call('product.remove',this.props.product._id);  //Logic to delete the item
        }
  }
  editProduct(){
    this.setState({
      contentstate:!this.state.contentstate
    });
  }
  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
 }
 handleSubmit(event) {
      const productName = this.state.productName.trim();
      const hsnCode = this.state.hsnCode.trim();
      const mrp = this.state.mrp.trim();
      const uom = this.state.uom.trim();
      const tax = this.state.tax.trim();
      const purchasePrice = this.state.purchasePrice.trim();
      const stock = this.state.stock;
      let product=this.props.product
      product.productName=productName
      product.hsnCode=hsnCode
      product.mrp=mrp
      product.uom=uom
      product.tax=tax
      product.purchasePrice=purchasePrice
      product.stock=stock
      Meteor.call('product.update',product);
      this.setState({
        contentstate:!this.state.contentstate
      });
}
  render(){

    return(
         <div className="product-list-div" >
           <div className="product-list-subdiv1" >
               <div className="product-list-subdiv-1">Name :-<ContentEditable className="content-editable" html={this.state.productName} disabled={this.state.contentstate} onChange={this.setValue.bind(this, 'productName')} /></div>
               <div className="product-list-subdiv-1">Sell Price :-<ContentEditable className="content-editable" html={this.state.mrp} disabled={this.state.contentstate} onChange={this.setValue.bind(this, 'mrp')} /></div>
               <div className="product-list-subdiv-1">HSN Code :-<ContentEditable className="content-editable" html={this.state.hsnCode} disabled={this.state.contentstate} onChange={this.setValue.bind(this, 'hsnCode')} /></div>
           </div>
           <div className="product-list-subdiv2" >
               <div className="product-list-subdiv-1">Tax :-<ContentEditable className="content-editable" html={this.state.tax} disabled={this.state.contentstate} onChange={this.setValue.bind(this, 'tax')} /></div>
               <div className="product-list-subdiv-1">Cost Price :-<ContentEditable className="content-editable" html={this.state.purchasePrice} disabled={this.state.contentstate} onChange={this.setValue.bind(this, 'purchasePrice')} /></div>
               <div className="product-list-subdiv-1">Unit :-<ContentEditable className="content-editable" html={this.state.uom} disabled={true} onChange={this.setValue.bind(this, 'uom')} /></div>
               <div className="product-list-subdiv-1">Stock :-<ContentEditable className="content-editable" html={this.state.stock} disabled={this.state.contentstate} onChange={this.setValue.bind(this, 'stock')} /></div>
           </div>
          {
            this.state.contentstate ?
             <div  onClick={ ()=> this.deleteProduct() } style={{position:'relative',top:0,right:2,paddingLeft:20,paddingRight:20,color:'red'}}><span className="glyphicon glyphicon-trash"></span></div>
             :
             <div  onClick={ ()=> this.handleSubmit() } style={{position:'relative',top:0,right:2,paddingLeft:20,paddingRight:20,color:'#40c4ff'}}><span className="glyphicon glyphicon-ok"></span></div>
          }

           <div  onClick={ ()=> this.editProduct() }style={{position:'relative',top:0,right:2,paddingLeft:20,paddingRight:20,color:'blue'}}><span className="glyphicon glyphicon-pencil"></span></div>
         </div>
       );
}
}
