Template.commentbox.events({
  "change .showPositives": function (event) {
    Session.set("showPositives", event.target.checked);
  },
  "change .showNeutrals": function (event) {
    Session.set("showNeutrals", event.target.checked);
  },
  "change .showNegatives": function (event) {
    Session.set("showNegatives", event.target.checked);
  },
  "change .showAll": function (event) {
    Session.set("showAll", event.target.checked);
  }
});

Template.commentbox.helpers({
  comments: function () {
    if(Session.get("showPositives")) {
      return Comments.find({topic: this.id, sentiment: { $gt: 0, $lt: 3 }});
    } else if (Session.get("showNeutrals")) {
      return Comments.find({topic: this.id, sentiment: 0});
    } else if (Session.get("showNegatives")){
      return Comments.find({topic: this.id, sentiment: { $gt: -3, $lt: 0 }});
    } else {
      return Comments.find({topic: this.id}, {sort: {posted:-1}});
    }
  },
  showPositives: function () {
    return Session.set("showPositives", false);
  },
  showNegatives: function() {
    return Session.set("showNegatives", false);
  },
  showNeutrals: function() {
    return Session.set("showNeutrals", false);
  }
});
