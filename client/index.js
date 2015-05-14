Topics   = new Mongo.Collection("topics");
Comments = new Mongo.Collection("comments");

Template.sentimentcard.events({
  'click .card-title': function (event,template) {
    template.$(".sentiment-card").toggleClass('flip');
  }
});

Template.commentbox.events({
  'click .close-comment-box': function (event,template) {
    template.$(".comment-box").remove();
  }
});

Template.sentimentcard.events({
  'click .comment-card': function (event,template) {
    var cardname = template.$(".card-title-front").text();
    Blaze.renderWithData(Template.commentbox, {id: this._id, name: this.name}, $("body")[0]);
  }
});

Template.body.helpers({
  topics: function () {
    return Topics.find({});
  }
});

Template.sentimentcard.helpers({
  commentcounter: function(cardid){
    var oid = new Meteor.Collection.ObjectID(cardid._str);
    return Comments.find({ topic: oid }).count();
  }
});

Template.commentbox.helpers({
  comments: function () {
    var oid = this.id;
    return Comments.find({topic: oid});
  }
});

// Template.singlecommentbox.rendered = function () {
//   console.log("scrolltop is " + $('.comment-box-section').scrollTop());
// }

/*
 * Insert a Comment to MongoDB from CommentBox.
 * Keypressed and OnClick Events...
 */


Template.commentbox.events({
  "click .comment-box-send": function (event, template) {
    Comments.insert({
      topic: this.id,
      // author: null,
      posted: new Date(),
      loc: {lng: 98.91, lat: 110.23},
      sentiment:2,
      keywords: ["bonito", "hermoso"],
      text: template.$(".comment-box-input").val()
    });
    // Clear form
    template.$(".comment-box-input").val("");

    // Prevent default form submit
    event.stopPropagation();
    return false;
  },

  "keypress paper-input": function (event, template) {
    if (event.charCode == 13) {
      Comments.insert({
        topic: this.id,
        // author: null,
        posted: new Date(),
        loc: {lng: 98.91, lat: 110.23},
        sentiment:2,
        keywords: ["bonito", "hermoso"],
        text: template.$(".comment-box-input").val()
      });
      // Clear form
      template.$(".comment-box-input").val("");

      // Prevent default form submit
      event.stopPropagation();
      return false;
    }
  }

});


/** Mongo Queries **/
// db.topics.insert({name: "Sentiment Card",isActive: true,timestamp: new Date(),share: 0	});
/* Positive */
//db.comments.insert({topic: ObjectId("55540d606638db2164f2aca8"), author: null, posted: new Date(), loc: {lng: 98.91, lat: 110.23}, sentiment:2, keywords: ["bonito", "hermoso"], text: "El cielo es bonito y muy hermoso"})
/* Negative */
//db.comments.insert({topic: ObjectId("55539ff2669903184654bd04"), author: null, posted: new Date(), loc: {lng: 98.91, lat: 110.23}, sentiment:-2, keywords: ["malo", "pesimo"], text: "El servicio es pesimo y muy malo"})
