Topics   = new Mongo.Collection("topics");
Comments = new Mongo.Collection("comments");

Meteor.publish('topics', function() {
  return Topics.find({});
});

Meteor.publish('comments', function() {
  return Comments.find({});
});

//
// Meteor.startup(function () {
//   Meteor.methods({
//     avgSentiment: function (cardid) {
//       var mongoId = new MongoInternals.NpmModule.ObjectID(cardid._str);
//       var pipeline = [{$match:{topic: mongoId}},{$group:{_id:"promedio", avgSentiment:{$avg: "$sentiment"}}}];
//       return Comments.aggregate(pipeline);
//     }
//   });
// });
