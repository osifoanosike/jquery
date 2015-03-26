// Create a target div after the headline for each blog post and 
//store a reference to it on the headline element using $.fn.data.

function BlogLoader(){

}

BlogLoader.prototype = {
	attach_target_divs: function(){
		console.log('about to attach target divs');
		var $target_div = $('<div>');
		$('div#blog h3').each(function(){
			$(this).after($target_div.clone(true))
				.data('target_div', $($target_div));

			// console.log($(this).data('target_div'));
		});
	},

	load_target_content: function(headline){
		var href = $(headline).find('a').attr('href').split('#');
		$(headline).next('div').load(href[0] + ' #' + href[1] );
	},

	addEventHandler: function() {
		var that = this;
		$('div#blog ul li a').on('click', function(e){
			console.log(e.target.tagName);
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