/*
 * Comments Ribbon Js
 */
 
Template.commentsribbon.helpers({
  randomcomments: function(){
    var array = Comments.find({topic: this._id}).fetch();
    var randomIndex = Math.floor(Math.random() * array.length);
    var element = array[randomIndex];
    if(element) {
      return element.text;
    }
  }
});
