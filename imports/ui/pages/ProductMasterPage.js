import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ProductMaster from '../components/productMaster/ProductMaster';
import { CategoryApi } from '../../api/category';
import { SubCategoryApi } from '../../api/subCategory';
import { ProductMasterApi } from '../../api/productMaster';
class ProductMasterPage extends Component {
  constructor() {
    super();
  }

  render(){
    return(
       <div>
          <ProductMaster categories={this.props.categories} subcategories={this.props.subcategories}  products={this.props.products} />
       </div>
    );
  }
}
export default createContainer(() => {

  const todosHandle = Meteor.subscribe('category');
  const todosHandle1 = Meteor.subscribe('subCategory');
  const todosHandle2 = Meteor.subscribe('productMaster');

  return {
    products: ProductMasterApi.find({}, {sort: {createdAt: -1}}).fetch(),
    categories: CategoryApi.find({}).fetch(),
    subcategories: SubCategoryApi.find({}).fetch(),
 };
}, ProductMasterPage);
