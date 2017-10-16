import { Meteor } from 'meteor/meteor';
import '../imports/api/productMaster';
import '../imports/api/category';
import '../imports/api/subCategory';
import '../imports/api/tax';
import '../imports/api/unit';
import '../imports/api/state';
import '../imports/api/city';
import '../imports/api/hsnCode';
import '../imports/api/invoice';
import '../imports/api/purchase';
import '../imports/api/shop';
import '../imports/api/user';

Meteor.startup(() => {

  Meteor.publish('productinvoice', function userPublication() {
    return ProductMasterApi.find().forEach(product => {
  let sum = 0
  Invoice.find({products:{$elemMatch:{pid:product._id}}}).forEach(invoice => {
    sum += invoice.products.find(p => p._id == product._id).qty
  })
})
  });
});
