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

  function drawWordCloud() {
    data = new google.visualization.DataTable();
    data.addColumn('string', 'Label');
    data.addColumn('number', 'Value');
    data.addRows(5);
    data.setValue(0, 0,'First');  data.setValue(0, 1, 10);
    data.setValue(1, 0,'Second'); data.setValue(1, 1, 30);
    data.setValue(2, 0,'Third');  data.setValue(2, 1, 50);
    data.setValue(3, 0,'Fourth'); data.setValue(3, 1, 20);
    data.setValue(4, 0,'Fifth');  data.setValue(4, 1, 30);
    var tc = new TermCloud(document.getElementById('cloud-positives')).draw(data,null);
    var tc = new TermCloud(document.getElementById('cloud-neutrals')).draw(data,null);
    var tc = new TermCloud(document.getElementById('cloud-negatives')).draw(data,null);
  }
  /** Render **/
  drawChart(chart);
  drawWordCloud();

  window.onresize = function(event) {
    console.log(event.currentTarget.innerWidth);
    drawChart(chart);
    drawWordCloud();
  };
};
