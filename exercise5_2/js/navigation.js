function Navigation(menuItems){
	this.menu_items = menuItems;
}

Navigation.prototype = {
	addEventHandler: function() {
		$(this.menu_items).hover(
			function(){
				if($(this).has('ul')){
					$(this).find('ul').show(300);
				}
			},

			function(){
				if($(this).has('ul')){
					$(this).find('ul').hide(600);
				}
			}
		);
	}
}

$(document).ready(function(){
	var $menuItems = $('ul#nav>li');
	var navigation = new Navigation($menuItems);
	navigation.addEventHandler();
});