import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
export const Shop = new Mongo.Collection('shop');

Meteor.methods({
  'shop.insert' (shodetails, accountdetails) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Shop.insert({
      usserid: Meteor.userId(),
      shopname: shodetails.shopname,
      shopownername: shodetails.shopownername,
      shopgstin: shodetails.shopgstin,
      stateid: shodetails.stateid,
      cityid: shodetails.cityid,
      shopaddress: shodetails.shopaddress,
      shopwebsite: shodetails.shopwebsite,
      accountdetails: accountdetails,
      createdAt: new Date(), // current time
    });
  },
  'shop.remove' (taskId) {
    check(taskId, String);
    Shop.remove(taskId); //Logic to delete the item
  },
  'shop.get' (invoiceid) {
    let invoice = Shop.findOne({_id: invoiceid});
    return invoice;
  }
});
if (Meteor.isServer) {
  Meteor.publish('shop', function userPublication() {
    return Shop.find();
  });
}
