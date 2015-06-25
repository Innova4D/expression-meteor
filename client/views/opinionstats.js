/*** ***/


Template.opinionstats.events({
  'click .close-stats-box': function (event,template) {
    template.$(".opinionstats-full").removeClass("animated fadeIn").addClass("animated fadeOut");
    template.$(".opinionstats-full").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      template.$(".opinionstats-full").remove();
    });
  },
  'click .stats-expand-positives' : function (event,template) {
    /// Smart stuff...
  }
});

Template.opinionstats.helpers({
  title: function () {
    return this.name;
  },
  positivesPercent: function () {
    var currentTime = new Date();
    var total = Comments.find({topic: this.id}).count();
    var sentiment = Comments.find({topic: this.id, sentiment: { $gt: 0, $lt: 3 }}).count();
    return ((sentiment/total) * 100).toFixed(2);
  },
  neutralsPercent: function () {
    var currentTime = new Date();
    var total = Comments.find({topic: this.id}).count();
    var sentiment = Comments.find({topic: this.id, sentiment: 0}).count();
    return ((sentiment/total) * 100).toFixed(2);
  },
  negativesPercent: function() {
    var currentTime = new Date();
    var total = Comments.find({topic: this.id}).count();
    var sentiment = Comments.find({topic: this.id, sentiment: { $gt: -3, $lt: 0 }}).count();
    return ((sentiment/total) * 100).toFixed(2);
  },
  positivesCount: function () {
    var currentTime = new Date();
    return Comments.find({topic: this.id, sentiment: { $gt: 0, $lt: 3 }}).count();
  },
  neutralsCount: function () {
    var currentTime = new Date();
    return Comments.find({topic: this.id, sentiment: 0}).count();
  },
  negativesCount: function() {
    var currentTime = new Date();
    return Comments.find({topic: this.id, sentiment: { $gt: -3, $lt: 0 }}).count();
  }
});

Template.opinionstats.rendered = function () {
  chart = {
    target: 'stats-chart',
    type: 'LineChart',
    columns: [
      ['string', 'Hours'],
      ['number', 'Positives'],
      ['number', 'Neutral'],
      ['number', 'Negatives']
    ],
    rows: [
      ['24' , 42, 10, 20],
      ['18' , 12, 30, 25],
      ['12' , 15, 40, 35],
      ['6 ' , 11, 15, 15],
      ['Now',  3, 10, 10]
    ],
    options: {
      // width: 450,
      height: 260,
      curveType: 'function',
      legend: { position: 'bottom' },
      colors: ['#48c97a', '#fdb325', '#d64942'],
    }
  };

  drawChart(chart);
  window.onresize = function(event) {
    console.log(event.currentTarget.innerWidth);
    drawChart(chart);
  };
};
