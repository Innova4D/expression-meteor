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

Template.sentimentribbon.helpers({
  topcomments: function(){
    return Comments.find({sentiment: this.name});
  }
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

Template.commentbox.events({
  'click .close-comment-box': function (event,template) {
    template.$(".comment-box").remove();
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
      sentiment: random,
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
    var random = _.sample([-2, -1, 0, 1, 2]); //Testing Purposes

    if (event.charCode == 13) {
      Comments.insert({
        topic: this.id,
        // author: null,
        posted: new Date(),
        loc: {lng: 98.91, lat: 110.23},
        sentiment: random,
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
// db.topics.find()
// db.topics.insert({name: "UDLAP", sentiment: 2, isActive: true,timestamp: new Date(),share: 0	});
// db.topics.insert({name: "Puebla", sentiment: 0, isActive: true,timestamp: new Date(),share: 0	});
// db.topics.insert({name: "Peña Nieto", sentiment: -2, isActive: true,timestamp: new Date(),share: 0	});
/* Positive */
//db.comments.insert({topic: ObjectId("55540d606638db2164f2aca8"), author: null, posted: new Date(), loc: {lng: 98.91, lat: 110.23}, sentiment:2, keywords: ["bonito", "hermoso"], text: "El cielo es bonito y muy hermoso"})
/* Negative */
//db.comments.insert({topic: ObjectId("55539ff2669903184654bd04"), author: null, posted: new Date(), loc: {lng: 98.91, lat: 110.23}, sentiment:-2, keywords: ["malo", "pesimo"], text: "El servicio es pesimo y muy malo"})



/*** Animations ***/

/**** Sentiment Bars *****/

Template.sentimentbars.events({
  'click': function (event,template) {
    template.$(".positive").animate({left: '10px'});
    template.$(".verypositive").animate({left: '20px'});
    template.$(".negative").animate({right: '10px'});
    template.$(".verynegative").animate({right: '20px'});
    template.$(".sentimentbar").css('box-shadow', '0px 2px 5px 0px rgba(0, 0, 0, 0.45)');
    template.$(".emoticon").removeClass("hidden");
    template.$(".bar-value").removeClass("hidden");
    template.$(".dismiss-bars").removeClass("hidden");
    template.$(".dismiss-bars").addClass("animated zoomIn");
  },
  'click .dismiss-bars': function (event, template) {
    template.$(".positive").animate({left: '0px'});
    template.$(".verypositive").animate({left: '0px'});
    template.$(".negative").animate({right: '0px'});
    template.$(".verynegative").animate({right: '0px'});
    template.$(".sentimentbar").css('box-shadow', '');
    template.$(".emoticon").addClass("hidden");
    template.$(".bar-value").addClass("hidden");
    template.$(".dismiss-bars").addClass("hidden");
  }
});
