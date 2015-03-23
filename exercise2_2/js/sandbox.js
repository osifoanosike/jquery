function Traversal() {

}

Traversal.prototype = {

  //question 2.1.1: Select all of the div elements that have a class of “module”.
  selectModuleDivs: function() {
    var result = $('.module');
    console.log("All elements that have a class of 'module': ");
    console.log(result);
  },

  /**Question 2.1.2
    Come up with three selectors that you could use to get the third item in the #myList unordered list. 
    Which is the best to use? Why?**/
  selectListItems: function() {
    //selector1
    console.log("\nSelector 1: #myListItem");
    var third_item_1 = $('#myListItem');
    console.log(third_item_1);

    //selector2
    console.log("\nSelector 2: #myList li:nth-child(3)");
    var third_item_2 = $('#myList li:nth-child(3)');
    console.log(third_item_2);

    //selector3
    console.log("\nSelector 3: #myList li).get(2)");
    var third_item_3 = $('#myList li').get(2);
    console.log(third_item_3);

    //best choice
    console.log('My best option is using the list item id: #myListItem\n' +
      'as DOM traversal is minimized and the list item with the specified unique id is directly targeted. \n' + 
      'Also the returned result is a jquery function, thus further DOM operatins can be performed on it.');
  },

  //question 2.1 c: Select the label for the search input using an attribute selector.
  selectFormLabel: function() {
    var label = $('label[for=q]');
    console.log('Label for search input: ' + label.text());
  },

  //question 2.1 d: Figure out how many elements on the page are hidden
  hiddenElementCount: function() {
    var count = $(':hidden').length;
    console.log('Number of hidden input elements: ' + count);
  },

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