Topics   = new Mongo.Collection("topics");
Comments = new Mongo.Collection("comments");

Meteor.subscribe("topics");
Meteor.subscribe("comments");

Meteor.startup(function() {
  GoogleMaps.load();
});

Template.sentimentmap.helpers({
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(23.6260333, -102.5377501),
        zoom: 3,
        disableDefaultUI: true,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false
      };
    }
  }
});

Template.sentimentmap.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('sentimentMap', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
});




Template.body.helpers({
  topics: function () {
    return Topics.find({});
  }
});


Template.commentbox.helpers({
  comments: function () {
    var oid = this.id;
    return Comments.find({topic: oid});
  }
});
// 
//
// Template.loginButtons.rendered = function(){
//     Accounts._loginButtonsSession.set('dropdownVisible', true);
// };

Template.commentbox.events({
  'click .close-comment-box': function (event,template) {
    template.$(".comment-box").removeClass("animated fadeIn").addClass("animated fadeOut");
    template.$(".comment-box").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      template.$(".comment-box").remove();
    });
  }
});

Template.singlecommentbox.helpers({
  sentiment: function () {
    // return this.sentiment;
  }
});


Template.singlecommentbox.rendered = function(){
  switch (this.data.sentiment) {
    case -2:
    this.$(".user-sentiment").css('background-color', '#e5596b');
    break;
    case -1:
    this.$(".user-sentiment").css('background-color', '#e5596b');
    break;
    case 0:
    this.$(".user-sentiment").css('background-color', '#fabe2c');
    break;
    case 1:
    this.$(".user-sentiment").css('background-color', '#1cb970');
    break;
    case 2:
    this.$(".user-sentiment").css('background-color', '#1cb970');
    break;
  }
};


/*
* Insert a Comment to MongoDB from CommentBox.
* Keypressed and OnClick Events...
*/

Template.commentbox.events({
  "click .comment-box-send": function (event, template) {
    var random = _.sample([-2, -1, 0, 1, 2]); //Testing Purposes
    Comments.insert({
      topic: this.id,
      // author: null,
      posted: new Date(),
      loc: {lng: 98.91, lat: 110.23},
      sentiment: null,
      keywords: null,
      text: template.$(".comment-box-input").val(),
      source: "app"
    });
    // Clear form
    template.$(".comment-box-input").val("");

    // Prevent default form submit
    event.stopPropagation();
    return false;
  },

  "keypress paper-input": function (event, template) {
    var random = _.sample([-2, -1, 0, 1, 2]); //Testing Purposes

    if (event.charCode == 13) {
      Comments.insert({
        topic: this.id,
        // author: null,
        posted: new Date(),
        loc: {lng: 98.91, lat: 110.23},
        sentiment: null,
        keywords: null,
        text: template.$(".comment-box-input").val(),
        source: "app"
      });
      // Clear form
      template.$(".comment-box-input").val("");

      // Prevent default form submit
      event.stopPropagation();
      return false;
    }
  }
});

Template.commentbox.rendered = function(){
  switch (this.data.avgsentiment) {
    case 0:
    this.$(".commentbox-sentiment-dot").css('background-color', '#e35a6d');
    break;
    case 1:
    this.$(".commentbox-sentiment-dot").css('background-color', '#e35a6d');
    break;
    case 2:
    this.$(".commentbox-sentiment-dot").css('background-color', '#f4bd57');
    break;
    case 3:
    this.$(".commentbox-sentiment-dot").css('background-color', '#41ca77');
    break;
    case 4:
    this.$(".commentbox-sentiment-dot").css('background-color', '#41ca77');
    break;
  }
};

/** Mongo Queries **/
// db.topics.find()
// db.topics.insert({name: "UDLAP", sentiment: 2, isActive: true,timestamp: new Date(),share: 0	});
// db.topics.insert({name: "Puebla", sentiment: 0, isActive: true,timestamp: new Date(),share: 0	});
// db.topics.insert({name: "Peña Nieto", sentiment: -2, isActive: true,timestamp: new Date(),share: 0	});
/* Positive */
//db.comments.insert({topic: ObjectId("55540d606638db2164f2aca8"), author: null, posted: new Date(), loc: {lng: 98.91, lat: 110.23}, sentiment:2, keywords: ["bonito", "hermoso"], text: "El cielo es bonito y muy hermoso"})
/* Negative */
//db.comments.insert({topic: ObjectId("55539ff2669903184654bd04"), author: null, posted: new Date(), loc: {lng: 98.91, lat: 110.23}, sentiment:-2, keywords: ["malo", "pesimo"], text: "El servicio es pesimo y muy malo"})
