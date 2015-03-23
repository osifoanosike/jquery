function Traversal() {

}

Traversal.prototype = {

  //question 2.2 a: Figure out how many image elements on the page have an alt attribute.
  log_img_attrs: function() {
    var $images = $('img'), count = 0;
    $images.each(function(index) {
      console.log($(this).attr('alt'));
    });

    console.log('2.1 e) Number of images with \'alt\' attribute: ' + count);
  },

  //question 2.2b: Select the search input text box, then traverse up to the form and add a class to the form
  traverse_form: function() {
    var $input = $('input[name=q]');
    $input.parent().addClass('newly_added');
    console.log($input);
  },

  swapListItemClass: function() {
    var class_tag = 'current';
    $('#myList li.current').removeClass(class_tag).next().addClass(class_tag);
  },

  //question 2_2 d: Select the select element inside #specials; traverse your way to the submit button.
  traverse_items: function() {
    var $button = $('div#specials select').parent().next('.buttons').find('input');//.find('input');
    console.log($button.val());
  },

  /*question 2_2 e: Select the first list item in the #slideshow element; 
  add the class “current” to it, and then add a class of “disabled” to its sibling elements.*/
  addClasses: function() {
    $('#slideshow li:first').addClass('current').siblings('li').addClass('disabled');
  }
}



$(document).ready(function(){
  var traversal = new Traversal();
  
  //2.2 a
  traversal.log_img_attrs();

  //2.2 b
  traversal.traverse_form();

  //2.2 c
  traversal.swapListItemClass();

  //Question 2_2 d
  traversal.traverse_items();

  //Question 2.2 e
  traversal.addClasses();
});