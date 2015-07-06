/*
 * searchbox.js
 * Francisco Gutiérrez fsalvador23@gmail.com
 */


Template.searchbox.events({
  'click .close-search-box': function (event,template) {
    template.$(".searchbox").removeClass("animated fadeIn").addClass("animated fadeOut");
    template.$(".searchbox").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      template.$(".searchbox").remove();
    });
  }
});
