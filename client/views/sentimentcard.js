/*
* Sentiment Card Logic.
*/

/*
* When an event, do this:
*/
Template.sentimentcard.events({
  'click .card-title': function (event,template) {
    template.$(".sentiment-card").toggleClass('flip');
  },
  'click .comment-card': function (event,template) {
    var avg = parseInt(template.$('.avg-sentiment').text());
    Blaze.renderWithData(Template.commentbox, {id: this._id, name: this.name, avgsentiment: avg}, $("body")[0]);
  }
});


/*
* When reactive, do this:
*/
Template.sentimentcard.helpers({
  commentcounter: function() {
    return Comments.find({ topic: this._id }).count();
  },
  sentimentavg: function() {
    var m = [];
    m[0] = Comments.find({topic: this._id, sentiment: -2}).count();
    m[1] = Comments.find({topic: this._id, sentiment: -1}).count();
    m[2] = Comments.find({topic: this._id, sentiment:  0}).count();
    m[3] = Comments.find({topic: this._id, sentiment:  1}).count();
    m[4] = Comments.find({topic: this._id, sentiment:  2}).count();
    maxValue = Math.max.apply(this, m);
    Session.set("card-avg",maxValue);
    return $.inArray(maxValue,m);
  }
});

/*
* When the card renders, do this:
*/
Template.sentimentcard.rendered = function () {

  var self = this;
  function animateCardBackground(bar) {

    var sf = self.$(".sentiment-card-front");
    var sb = self.$(".sentiment-card-back");
    var ab = self.$(".action-bar");
    var ri = self.$(".ribbon");

    var target =  parseInt(self.$(".avg-sentiment").text());

    // switch (this.data.sentiment) {
    switch (target) {
      case 0: //verynegative
      sf.css('background-color', '#d0495a');
      sb.css('background-color', '#d0495a');
      ab.css('background-color', '#ba4251');
      ri.css('background-color', '#ba4251');
      break;
      case 1: //Negative
      sf.css('background-color', '#f0cf3d');
      sb.css('background-color', '#f0cf3d');
      ab.css('background-color', '#be3a30');
      ri.css('background-color', '#be3a30');
      break;
      case 2: //Neutral
      sf.css('background-color', '#f5be4d');
      sb.css('background-color', '#f5be4d');
      ab.css('background-color', '#dcaa45');
      ri.css('background-color', '#dcaa45');
      break;
      case 3: //Positive
      sf.css('background-color', '#39cb74');
      sb.css('background-color', '#39cb74');
      ab.css('background-color', '#30ad63');
      ri.css('background-color', '#30ad63');
      break;
      case 4: //verypositive
      sf.css('background-color', '#39cb74');
      sb.css('background-color', '#39cb74');
      ab.css('background-color', '#30ad63');
      ri.css('background-color', '#30ad63');
      break;
    }
  }

  Tracker.autorun(function () {
    var bar = Session.get("card-avg");
    animateCardBackground(bar);
  });

};
