function DOMManipulation() {

}

DOMManipulation.prototype = {

  //2.3 a: Add five new list items to the end of the unordered list #myList
  addListItems: function() {
    var list_items = [];
    for(var i = 0; i < 5; i++ ) {
      list_items.push('<li>List item ' + (i + 8) + '</li>');
    }

    //join the new items to the existing ul
    $('#myList').append(list_items.join(''));
  },

  //2.3b: Remove the odd list items
  remove_odd_items: function() {
    $('#myList li:odd').remove();
  },

  //2.3 c: Add another h2 and another paragraph to the last div.module
  add_to_div_module: function() {
    $('div.module:last')
      .append('<h2>Newly added h2 element</h2>')
      .append('<p>Newly added paragraph</p>');
  },

  //2.3 d: Add another option to the select element; give the option the value “Wednesday”
  add_select_option:  function() {
    $('<option>', { 
      'value': 'wednesday',
      'text': 'wednesday'
     }).appendTo($('div#specials form select'));
  },

  /* 2.3 e: Add a new div.module to the page after the last one;
  put a copy of one of the existing images inside of it.*/
  add_div_with_image: function() { $('<div>', { 'class': 'module added'})
    .insertAfter($('div.module:last')).append($('img:first').clone());
  }
}



$(document).ready(function(){
  var dom_manupulate = new DOMManipulation();

  // 2.3 a
  dom_manupulate.addListItems();

  // 2.3 b
  dom_manupulate.remove_odd_items();

  // 2.3 c
  dom_manupulate.add_to_div_module();

  //2.3 d
  dom_manupulate.add_select_option();

  //2.3 e
  dom_manupulate.add_div_with_image();
});