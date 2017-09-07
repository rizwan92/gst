import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const City = new Mongo.Collection('city');
Meteor.methods({
  'city.insert'(city) {
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    City.insert({
      name:city.name,
      stateid:city.stateid,
      createdAt: new Date(), // current time
    });
  },
  'city.remove'(taskId) {
    check(taskId, String);
    City.remove(taskId);    //Logic to delete the item
  },
  // 'tasks.setChecked'(taskId, setChecked) {
  //   check(taskId, String);
  //   check(setChecked, Boolean);
  //
  //   Tasks.update(taskId, { $set: { checked: setChecked } });
  // },
});
if (Meteor.isServer) {
Meteor.publish('city', function userPublication() {
  return City.find();
});}
