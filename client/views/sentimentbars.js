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
    var avg   = Math.round((num/total) * 100);
    Session.set("bar-avg",avg);
    return avg;
  },
  'negative' : function (){
    var num   = Comments.find({topic: this._id, sentiment: -1}).count();
    var total = Comments.find({topic: this._id}).count();
    var avg   = Math.round((num/total) * 100);
    Session.set("bar-avg",avg);
    return avg;
  },
  'neutral' : function (){
    var num   = Comments.find({topic: this._id, sentiment: 0}).count();
    var total = Comments.find({topic: this._id}).count();
    var avg   = Math.round((num/total) * 100);
    Session.set("bar-avg",avg);
    return avg;
  },
  'positive' : function (){
    var num   = Comments.find({topic: this._id, sentiment: 1}).count();
    var total = Comments.find({topic: this._id}).count();
    var avg   = Math.round((num/total) * 100);
    Session.set("bar-avg",avg);
    return avg;
  },
  'vpositive' : function (){
    var num   = Comments.find({topic: this._id, sentiment: 2}).count();
    var total = Comments.find({topic: this._id}).count();
    var avg   = Math.round((num/total) * 100);
    Session.set("bar-avg",avg);
    return avg;
  },
});

/*
* When the card renders, do this:
*/
Template.sentimentbars.rendered = function () {

  var self = this;
  function animateBarHeight(bar) {
    var minval = 25;
    var vnegative = self.$(".vnegative-value").text();
    var negative  = self.$(".negative-value").text();
    var neutral   = self.$(".neutral-value").text();
    var positive  = self.$(".positive-value").text();
    var vpositive = self.$(".vpositive-value").text();

    self.$(".verynegative").animate({'height': minval + parseFloat(vnegative)+'px'});
    self.$(".negative").animate({'height': minval + parseFloat(negative)+'px'});
    self.$(".neutral").animate({'height': minval + parseFloat(neutral)+'px'});
    self.$(".positive").animate({'height': minval + parseFloat(positive)+'px'});
    self.$(".verypositive").animate({'height': minval + parseFloat(vpositive)+'px'});
  }

  Tracker.autorun(function () {
    var bar = Session.get("bar-avg");
    animateBarHeight(bar);
  });

};
