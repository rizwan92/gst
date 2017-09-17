import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
export const ShopApi = new Mongo.Collection('shop');

Meteor.methods({
  'shop.insert' (shopdetail, accdetail,userid) {
    console.log(shopdetail);
    console.log(accdetail);
    ShopApi.insert({
      userid: userid,
      shopname: shopdetail.shopname,
      shopnumber: shopdetail.shopnumber,
      password: shopdetail.password,
      shopownername: shopdetail.shopownername,
      shopgstin: shopdetail.shopgstin,
      stateid: shopdetail.stateid,
      cityid: shopdetail.cityid,
      shopaddress: shopdetail.shopaddress,
      shopwebsite: shopdetail.shopwebsite,
      accdetail: accdetail,
      createdAt: new Date(), // current time
    });
  },
  'shop.remove' (taskId) {
    check(taskId, String);
    ShopApi.remove(taskId); //Logic to delete the item
  },
  'shop.get' (invoiceid) {
    let invoice = ShopApi.findOne({_id: invoiceid});
    return invoice;
  },
  'shop.check' (shopname,password) {
    let shop = ShopApi.findOne({shopname:shopname,password:password});
    return shop;
  }
});
if (Meteor.isServer) {
  Meteor.publish('shop', function userPublication() {
    return ShopApi.find();
  });
}
