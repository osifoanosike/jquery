function SelectDivs() {

}

SelectDivs.prototype = {

  //question 2.1.1
  selectModuleDivs: function() {
    var result = $('.module');
    console.log("All elements that have a class of 'module': ");
    console.log(result);
  },

  //question 2.1.2
  selectListItems: function() {
    //selector1
    console.log("\nSelector 1: #myListItem");
    var third_item_1 = $('#myListItem');
    console.log(third_item_1);

    //selector2
    console.log("\nSelector 2: #myList li:nth-child(3)");
    var third_item_2 = $('#myList li:nth-child(3)');
    console.log(third_item_2);

    //selector2
    console.log("\nSelector 3: #myList li).get(2)");
    var third_item_3 = $('#myList li').get(2);
    console.log(third_item_3);

    //best choice
    console.log('My best option is using the list item id: #myListItem\n' +
      'as DOM traversal is minimized and the list item with the specified unique id is directly targeted. \n' + 
      'Also the returned result is a jquery function, thus further DOM operatins can be performed on it.');
  },

  //question 2.1 c
  selectFormLabel: function() {
    var label = $('label[for=q]');
    console.log('Label for search input: ' + label.text());
  },

  //question 2.1 d
  hiddenElementCount: function() {
    var count = $(':hidden').length;
    console.log('Number of hidden input elements: ' + count);
  },

  //question 2.1 e
  imagesWithAltAttr: function() {
    var $images = $('img'), count = 0;
    $images.each(function(index) {
      var img_attr = $(this).attr('alt');
      if ( img_attr !== undefined && img_attr !== false ) {
        count++;
      }
    });

    console.log('2.1 e) Number of images with \'alt\' attribute: ' + count);
  },

  //question 2.1 f
  oddTableRow: function() {
    var oddRows = $('table>tbody tr:odd');
    // console.log('2.1 e) Number of odd rows in tbody: ' + oddRows.forEach(function(item, index, array) { this.html(); }));
  }
}


$(document).ready(function(){
  var selectDivs = new SelectDivs();

  //2.1 a
  selectDivs.selectModuleDivs();

  //2.1 b
  selectDivs.selectListItems();

  //question 2.1 c
  selectDivs.selectFormLabel();

   //question 2.1 d
  selectDivs.hiddenElementCount();

  // question 2.1 e
  selectDivs.imagesWithAltAttr();

  //question 2.1 f
  selectDivs.oddTableRow()
});