/*
* Sentiment Card Logic.
*/

/*
* When an event, do this:
*/
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


/*
* Inject data into Meteor’s HTML templates:
*/
Template.sentimentbars.helpers({
  'vnegative' : function (){
    var num   = Comments.find({topic: this._id, sentiment: -2}).count();
    var total = Comments.find({topic: this._id}).count();
    Session.set('reactive-bars', this);
    return Math.round((num/total) * 100) + "%";
  },
  'negative' : function (){
    var num   = Comments.find({topic: this._id, sentiment: -1}).count();
    var total = Comments.find({topic: this._id}).count();
    Session.set('reactive-bars', this);
    return Math.round((num/total) * 100) + "%";
  },
  'neutral' : function (){
    var num   = Comments.find({topic: this._id, sentiment: 0}).count();
    var total = Comments.find({topic: this._id}).count();
    Session.set('reactive-bars', this);
    return Math.round((num/total) * 100) + "%";
  },
  'positive' : function (){
    var num   = Comments.find({topic: this._id, sentiment: 1}).count();
    var total = Comments.find({topic: this._id}).count();
    Session.set('reactive-bars', this);
    return Math.round((num/total) * 100) + "%";
  },
  'vpositive' : function (){
    var num   = Comments.find({topic: this._id, sentiment: 2}).count();
    var total = Comments.find({topic: this._id}).count();
    Session.set('reactive-bars', this);
    return Math.round((num/total) * 100) + "%";
  },
});

/*
* When the card renders, do this:
*/
Template.sentimentbars.rendered = function () {

  var self = this;

  function saySomething(count) {
    console.log(count);
  }

  Tracker.autorun(function () {
    var count = Session.get('items');
    saySomething(count);
  });

};
