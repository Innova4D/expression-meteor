Template.commentbox.events({
  "change .showPositives": function (event) {
    console.log("positives");
    Session.set("showPositives", event.target.checked);
  },
  "change .showNeutrals": function (event) {
    console.log("neutrals");
    Session.set("showNeutrals", event.target.checked);
  },
  "change .showNegatives": function (event) {
    console.log("negatives");
    Session.set("showNegatives", event.target.checked);
  },
  "change .showAll": function (event) {
    console.log("all");
    Session.set("showAll", event.target.checked);
  }
});

Template.commentbox.helpers({
  comments: function () {
    if(Session.get("showPositives")) {
      console.log("Positive-query");
      return Comments.find({topic: this.id, sentiment: { $gt: 0, $lt: 3 }});
    } else if (Session.get("showNeutrals")) {
      console.log("neutral-query");
      return Comments.find({topic: this.id, sentiment: 0});
    } else if (Session.get("showNegatives")){
      console.log("negative-query");
      return Comments.find({topic: this.id, sentiment: { $gt: -3, $lt: 0 }});
    } else {
      console.log("all-query");
      return Comments.find({topic: this.id}, {sort: {posted:-1}});
    }
  },
  showPositives: function () {
    return Session.get("showPositives");
  },
  showNegatives: function() {
    return Session.get("showNegatives");
  },
  showNeutrals: function() {
    return Session.get("showNeutrals");
  }
});
