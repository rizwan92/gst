import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const UserApi = new Mongo.Collection('user');

Meteor.methods({
  'user.insert'(user) {
    UserApi.insert({
      name:user.name,
      email:user.email,
      number:user.number,
      password:user.password,
      status:1,
      createdAt: new Date(), // current time
    });
  },
  'user.remove'(taskId) {
    check(taskId, String);
    UserApi.remove(taskId);    //Logic to delete the item
  },
  'user.check'(email,password) {
    let user = UserApi.findOne({email,password});
    return user;
  },
});
if (Meteor.isServer) {
  Meteor.publish('user', function userPublication() {
    return UserApi.find();
  });
}
