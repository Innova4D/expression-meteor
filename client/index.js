/*
 * Index.js
 * These methods are related to global app configurations
 */
Topics   = new Mongo.Collection("topics");
Comments = new Mongo.Collection("comments");

/*
 * Publish/Suscribe
 * Related to Server index.js (Check server folder)
 */

Meteor.subscribe("topics");
Meteor.subscribe("comments");

/*
 * When the app initiates, start geolocation tracking...
 */
Meteor.startup(function() {
  GoogleMaps.load();
  Tracker.autorun(function () {
    var geo = Geolocation.currentLocation();
    if(geo) {
      Session.set("geo",{lat:geo.coords.latitude, long:geo.coords.longitude});
    }
  });
});

/*
 * Get all the topics (sentiment cards) from Mongo.
 */
Template.body.helpers({
  topics: function () {
    return Topics.find({});
  }
});

/*
 * Catch some events that happen in the app.
 */
Template.body.events ({
  'click .search-header': function (event,template) {
    Blaze.render(Template.searchbox, $("body")[0]);
  },
  'click .tab-pinned': function (event,template) {
    $(".sentiment-card").css("display","none");
    $(".section-message").css("display","flex");
  },
  'click .tab-trending': function (event,template) {
    $(".sentiment-card").css("display","block");
    $(".section-message").css("display","none");
  },
  'click .tab-recommended': function (event,template) {
    $(".sentiment-card").css("display","none");
    $(".section-message").css("display","flex");
  }
});

/** Mongo Queries, for testing Purposes **/
// db.topics.find().pretty()

// Not working ---->
// db.topics.insert({name: "UDLAP", sentiment: 2, isActive: true,timestamp: new Date(),share: 0	});
// db.topics.insert({name: "Puebla", sentiment: 0, isActive: true,timestamp: new Date(),share: 0	});
// db.topics.insert({name: "Peña Nieto", sentiment: -2, isActive: true,timestamp: new Date(),share: 0	});
// <------

// Use this ->
//db.topics.insert({ name : "Francisco", isActive : 1, creator : "Twitter", timestamp : ISODate("2015-07-07T16:03:40.838Z"), avgSen : 0.45081967213114754, total : 252, bars : { excellent : 72, good : 68, neutral : 13, bad : 92, terrible : 7	}, keywords : { Guerrero : 22, crimen : 18, ayudemos : 16, red : 6, rat : 5 }});

/* Positive */
// db.comments.insert({topic: ObjectId("55dca3ae250af98ebba3a443"), author: null, posted: new Date(), loc: {lng: 98.91, lat: 110.23}, sentiment:2, keywords: ["bonito", "hermoso"], text: "El cielo es bonito y muy hermoso"})
/* Negative */
//db.comments.insert({topic: ObjectId("55539ff2669903184654bd04"), author: null, posted: new Date(), loc: {lng: 98.91, lat: 110.23}, sentiment:-2, keywords: ["malo", "pesimo"], text: "El servicio es pesimo y muy malo"})
