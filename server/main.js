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
import '../imports/api/shop';

Meteor.startup(() => {
  Meteor.publish("myuser", function () {
  return Meteor.users.find({ _id: Meteor.userId() });
  });
});
