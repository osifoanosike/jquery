function Navigation(menuItems){
  this.menuItems = menuItems;
}

Navigation.prototype = {
  addEventHandler: function() {
    $(this.menuItems).hover(function() { 
      $(this).toggleClass('hover').find('ul').toggle(400); });
  }
}

$(document).ready(function(){
  var $menuItems = $('ul#nav>li');
  var navigation = new Navigation($menuItems);
  navigation.addEventHandler();
});