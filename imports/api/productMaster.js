import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const ProductMasterApi = new Mongo.Collection('productMaster');
Meteor.methods({
  'product.insert'(product) {

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    ProductMasterApi.insert({
      productName:product.productName,
      category:product.category,
      subCategory:product.subCategory,
      hsnCode:product.hsnCode,
      mrp:product.mrp,
      uom:product.uom,
      tax:product.tax,
      purchasePrice:product.purchasePrice,
      status:1,
      stock:product.stock,
      createdAt: new Date(), // current time
    });
  },
  'product.remove'(taskId) {
    check(taskId, String);
    ProductMasterApi.remove(taskId);    //Logic to delete the item
  },
  'product.update'(product) {
   ProductMasterApi.update(product._id, product);
  },
  'product.updatequantity'(productid,productquantity) {
    let product = ProductMasterApi.findOne({_id:productid});
    let productQuantity= parseFloat(product.stock);
    let newproductQuantity= productQuantity-productquantity;
    product.stock=newproductQuantity
   ProductMasterApi.update(productid, product);
  },
});
if (Meteor.isServer) {
  Meteor.publish('productMaster', function userPublication() {
    return ProductMasterApi.find();
  });
}
