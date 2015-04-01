// Create a target div after the headline for each blog post and 
//store a reference to it on the headline element using $.fn.data.

function BlogLoader(){

}

BlogLoader.prototype = {
	attach_target_divs: function(){
		var $target_div = $('<div>');
		$('div#blog h3').each(function(index){
			var blog_target = $target_div.clone(true) 
			$(this).after(blog_target.attr('id', 'post' + (index+1) ))
				.data('target_div', blog_target.attr('id') );
		});
	},

	load_target_content: function(headline){
		var href = $(headline).find('a').attr('href').split('#');
		$(headline).next('div').load(href[0] + ' #' + href[1] );
	},

	addEventHandler: function() {
		var that = this;
		$('div#blog ul li a').on('click', function(e){
			e.preventDefault();
			that.load_target_content($(this).parent());
		})
	}
}

$(document).ready(function(){
	var blog_loader = new BlogLoader();
	blog_loader.attach_target_divs();
	blog_loader.addEventHandler();
});