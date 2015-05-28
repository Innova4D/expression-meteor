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
  },
  'click .share-card': function (event,template) {
    var avg = parseInt(template.$('.avg-sentiment').text());
    switch (avg) {
      case 0: template.$('.action-bar').css("background-color", "#ce4a5c"); break;
      case 1: template.$('.action-bar').css("background-color", "#ce4a5c"); break;
      case 2: template.$('.action-bar').css("background-color", "#dcaa45"); break;
      case 3: template.$('.action-bar').css("background-color", "#30ad63"); break;
      case 4: template.$('.action-bar').css("background-color", "#30ad63"); break;
    }
    template.$('.share-card-fa').removeClass("fa-share-alt").addClass("fa-times");
    template.$('.share-card').removeClass("share-card").addClass("dismiss-share-card");
    Blaze.renderWithData(Template.sharecard, {id: this._id, name: this.name, avgsentiment: avg}, template.$('.sentiment-card')[0]);
  },
  'click .dismiss-share-card': function (event,template) {
    template.$('.action-bar-share-card').removeClass("animated fadeIn").addClass("animated fadeOut");
    var avg = parseInt(template.$('.avg-sentiment').text());
    switch (avg) {
      case 0: template.$('.action-bar').css("background-color", "#ce4a5c"); break;
      case 1: template.$('.action-bar').css("background-color", "#ce4a5c"); break;
      case 2: template.$('.action-bar').css("background-color", "#dcaa45"); break;
      case 3: template.$('.action-bar').css("background-color", "#30ad63"); break;
      case 4: template.$('.action-bar').css("background-color", "#30ad63"); break;
    }
    template.$('.share-card-fa').removeClass("fa-times").addClass("fa-share-alt");
    template.$('.action-bar-share-card').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      template.$('.action-bar-share-card').remove();
      template.$('.dismiss-share-card').removeClass("dismiss-share-card").addClass("share-card");
    });
  }
});


/*
* When reactive, do this:
*/
Template.sentimentcard.helpers({
  commentcounter: function() {
    return this.total;
  },
  sentimentavg: function() {
    var m = [];
    m[0] = this.bars.terrible;
    m[1] = this.bars.bad;
    m[2] = this.bars.neutral;
    m[3] = this.bars.good;
    m[4] = this.bars.excellent;
    maxValue = Math.max.apply(this, m);
    Session.set("card-avg",$.inArray(maxValue,m));
    return $.inArray(maxValue,m);
  },
  dataSource: function() {
    if(this.creator == "ReactiveTwitter")
    return "Live from Twitter";
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

    switch (target) {
      case 0: //verynegative
      sf.css('background-color', '#d0495a');
      sb.css('background-color', '#d0495a');
      ab.css('background-color', '#ba4251');
      ri.css('background-color', '#ba4251');
      break;
      case 1: //Negative
      sf.css('background-color', '#d0495a');
      sb.css('background-color', '#d0495a');
      ab.css('background-color', '#ba4251');
      ri.css('background-color', '#ba4251');
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
