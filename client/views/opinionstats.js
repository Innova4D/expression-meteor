/*** ***/


Template.opinionstats.events({
  'click .close-stats-box': function (event,template) {
    template.$(".opinionstats-full").removeClass("animated fadeIn").addClass("animated fadeOut");
    template.$(".opinionstats-full").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      template.$(".opinionstats-full").remove();
    });
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
  },
  commentsCount: function () {
    var count = Comments.find({topic: this.id}).count();
    Session.set("stats-comments", count);
    /** Get the data **/
    var positivesKW = Comments.find({topic: this.id, sentiment: { $gt: 0, $lt: 3 }});
    var neutralsKW  = Comments.find({topic: this.id, sentiment: 0});
    var negativesKW = Comments.find({topic: this.id, sentiment: { $gt: -3, $lt: 0 }});
    /** Hope I could use FlatMap **/
    var aPositives = [];
    var aNeutrals  = [];
    var aNegatives = [];
    positivesKW.forEach(function (c, i) { aPositives = aPositives.concat(c.keywords); });
    negativesKW.forEach(function (c, i) { aNegatives = aNegatives.concat(c.keywords); });
    neutralsKW.forEach(function (c, i)  { aNeutrals  = aNeutrals.concat(c.keywords); });
    /**
    * Count them all and pack it
    * (Using Underscore.js) -> http://underscorejs.org/#countBy
    **/
    var oPositives = _.countBy(aPositives, _.identity);
    var oNegatives = _.countBy(aNegatives, _.identity);
    var oNeutrals  = _.countBy(aNeutrals, _.identity);

    var aPositives = [];
    var aNegatives = [];
    var aNeutrals  = [];

    for (var key in oPositives) {
      if (oPositives.hasOwnProperty(key) && key != "")
      aPositives.push([key,oPositives[key]]);
    }

    for (var key in oNegatives) {
      if (oNegatives.hasOwnProperty(key) && key != "")
      aNegatives.push([key,oNegatives[key]]);
    }

    for (var key in oNeutrals) {
      if (oNeutrals.hasOwnProperty(key) && key != "")
      aNeutrals.push([key,oNeutrals[key]]);
    }

    aPositives.sort(function(a, b) { return a[1] <  b[1] ? 1 : -1; });
    aNegatives.sort(function(a, b) { return a[1] <  b[1] ? 1 : -1; });
    aNeutrals.sort(function(a, b) { return a[1] <  b[1] ? 1 : -1; });

    /** Push it as a session variable to simulate reactivity ***/
    Session.set("stats-words-positives", aPositives);
    Session.set("stats-words-negatives", aNegatives);
    Session.set("stats-words-neutrals",  aNeutrals);
    return count;
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

  /** Drawing the word cloud **/
  function drawWordCloud(rows, element, p) {
    data = new google.visualization.DataTable();
    data.addColumn('string', 'Label');
    data.addColumn('number', 'Value');
    data.addRows(rows);
    if(p.length == 1) {
      data.setValue(0, 0, p[0][0]);  data.setValue(0, 1, p[0][1]);
    } else {
      for (i=0; i<rows; i++) {
        data.setValue(i, 0, p[i][0]);  data.setValue(i, 1, p[i][1]);
      }
    }
    var tc = new TermCloud(document.getElementById(element)).draw(data,null);
  }

  /** Render **/
  drawChart(chart);

  window.onresize = function(event) {
    drawChart(chart);
  };

  /*** Track session variables to render "Reactively" ***/
  Tracker.autorun(function () {
    var oPositives = Session.get("stats-words-positives");
    var oNegatives = Session.get("stats-words-negatives");
    var oNeutrals  = Session.get("stats-words-neutrals");

    drawWordCloud(5,"cloud-positives",oPositives);
    drawWordCloud(5,"cloud-negatives",oNegatives);
    drawWordCloud(5,"cloud-neutrals",oNeutrals);
  });

};
