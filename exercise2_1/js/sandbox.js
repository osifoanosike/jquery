function SelectDivs() {

}

SelectDivs.prototype = {

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

  //question 2.1 e: Figure out how many image elements on the page have an alt attribute.
  imagesWithAltAttr: function() {

    var img_with_alt = $('img[alt!=""]');
    console.log('2.1 e) Number of images with \'alt\' attribute: ' + img_with_alt.length);
  },

  //question 2.1 f: Select all of the odd table rows in the table body.
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