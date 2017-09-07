import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import CategoryForm from '../components/catSubcat/CategoryForm';
import TaxForm from '../components/catSubcat/TaxForm';
import UnitForm from '../components/catSubcat/UnitForm';
import HSNCodeForm from '../components/catSubcat/HSNCodeForm';
import StateForm from '../components/catSubcat/StateForm';
import CityForm from '../components/catSubcat/CityForm';
import SubCategoryForm from '../components/catSubcat/SubCategoryForm';
import { SubCategoryApi } from '../../api/subCategory';
import { CategoryApi } from '../../api/category';
import { State } from '../../api/state';
import { City } from '../../api/city';
class CategorySubCategoryPage extends Component {
  render(){
    return(
       <div>
      <h1>Category</h1>
        <CategoryForm  />
          <h1>Sub Category</h1>
        <SubCategoryForm  categories={this.props.categories} />
            <h1>Tax</h1>
        <TaxForm />
        <h1>UnitForm</h1>
          <UnitForm />
          <h1>HSN Code</h1>
            <HSNCodeForm />
            <h1>StateForm</h1>
              <StateForm />
            <h1>City Form</h1>
                <CityForm  states={this.props.states}/>
       </div>
    );
  }
}
export default createContainer(() => {
  const todosHandle = Meteor.subscribe('category');
  const todosHandle2 = Meteor.subscribe('subCategory');
  const todosHandle3 = Meteor.subscribe('city');
  const todosHandle4 = Meteor.subscribe('hsnCode');
  const todosHandle5 = Meteor.subscribe('productMaster');
  const todosHandle6 = Meteor.subscribe('tax');
  const todosHandle7 = Meteor.subscribe('unit');
  const todosHandle1 = Meteor.subscribe('state');
    const loading = !todosHandle.ready();
    const loading1 = !todosHandle1.ready();
  return {
    loading,
    loading1,
    categories: CategoryApi.find({}).fetch(),
    states: State.find({}).fetch(),
  };
}, CategorySubCategoryPage);
