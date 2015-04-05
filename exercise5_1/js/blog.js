function Blog(blog_list) {
  this.blog_list = blog_list;
}

Blog.prototype = {
  show_excerpt: function(headline) {
    $(headline).addClass('active').parent().siblings('p').slideDown();
  },

  hide_other_excerpts: function() {
    this.blog_list.find('a.active').removeClass('active').parent().siblings('p').slideUp();
  },

  add_event_handlers: function() {
    var that = this;
    this.blog_list.on('click', 'li a', function(e){
      e.preventDefault();

      //ensure curently active items dont respond to clicks
      if(!$(this).hasClass('active')){
        that.hide_other_excerpts();
        that.show_excerpt(this);
      }
    });
  }
}

$(document).ready(function(){
  var $blog_list = $('div#blog ul');

  var blog = new Blog($blog_list);
  blog.add_event_handlers();
});
