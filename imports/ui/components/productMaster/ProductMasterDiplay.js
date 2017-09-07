import React, { Component } from 'react';
import ProductMasterDiplaySingleItem from './ProductMasterDiplaySingleItem';
 export default class ProductMasterDiplay extends Component {
  constructor() {
    super();
  }

  render(){
    return(
       <div>
       {this.props.products.map((product, i)=>
                <ProductMasterDiplaySingleItem product={product} key={i} />
       )}
       </div>
    );
  }
}
