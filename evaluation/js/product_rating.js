function ProductRating(){
  this.products = ['Coffee', 'Tea', 'Sodas'];
  this.ratingValues = ['Love it', 'Like it', 'No views', 'Dislike it', 'Abhor it'];
  this.activeProduct = "";
}

ProductRating.prototype = {

  init: function() {
    this.ratingValues.unshift(' ');
    this.createGridStructure();
    this.addGridHeaders();
    this.populateGrid();
    // this.disableAllRatings();
  },

  createGridStructure: function() {
    var grid = $('<table>', {
      id: "productGrid"
    });

    grid.appendTo($('#container'))
    this.productGrid = grid;
  },

  addGridHeaders: function() {
    var ratingsHeader = $('<tr>');
    
    for(var i = 0; i < this.ratingValues.length; i++) {
      var headerCell = $('<th>', { 'data-rating': this.ratingValues[i] });
      headerCell.append(this.createClickableButton(this.ratingValues[i]));
      ratingsHeader.append(headerCell);
    }    
    this.productGrid.append(ratingsHeader);
  },

  createClickableButton: function(property) {
    var that = this;
    var productButton = $('<button>', {
      'data-property': property,
      text: property
    });

    productButton.on('click', function(){
      

      if($(this).parent().prop('tagName') == 'TD') {
        $(this).parent().addClass('selected').parent('tr').siblings().find('td').removeClass('selected');
        that.activateRow($(this));
      } else {
        $(this).addClass('selected').parent().siblings().find('button').removeClass('selected');
         
        //if its the rating header that's clicked and there's a selected product
        if(that.activeProduct.length) {
          that.setProductRating(that.activeProduct, $(this).data('property'))
        }
      } 
    })

    return productButton;
  },

  createRatingCheckbox: function(product, rating) {
    var that = this;
    var ratingCheckbox = $('<input>', {
        'type': 'radio',
        'data-product': product,
        'data-rating': rating,
        'value': rating,
        'name': product
    });

    ratingCheckbox.on('click', function() {
      that.highlightActiveHeaders(this)
    })
    return ratingCheckbox;
  },

  highlightActiveHeaders: function(button) {
     //get and highlight corresponding headers
      $('th button.selected').removeClass('selected');
      $('td.selected').removeClass('selected');

      $('th button[data-property="'+ $(button).data('rating') + '"]').addClass('selected');
      $('td[data-property="'+ $(button).data('product') + '"]').addClass('selected')
  },
  
  setupProductRating: function(product) {
    var productRow = $('<tr>', {
      'data-product': product
    });

    for(var i = 0; i < this.ratingValues.length; i++) {
      var tableCell = $('<td>');

      if(i == 0) {
        tableCell = $('<td>',{ 'data-property': product });
        tableCell.append(this.createClickableButton(product));
      } else { 
        tableCell.append(this.createRatingCheckbox(product, this.ratingValues[i]));
      }

      //creates each td containing the chkbox and append it to the row
      productRow.append(tableCell);
    }
    return productRow;
  },

  populateGrid: function() {
    for(var i = 0; i < this.products.length; i++) {
      this.productGrid.append(this.setupProductRating(this.products[i]));
    }
  },

  // disableRating: function(relatedProduct) {
  //   var rowELement = $('#productGrid tr');
  //   var input = $('tr [data-product="'+ relatedProduct +'"]');
  //   input.prop('disable', true);
  // },

  // disableAllRatings: function(){
  //   var that = this;
  //   $('#productGrid tr').each(function(){
  //     $(this).find('input').attr('disabled', "");
  //   })
  // },

  activateRow: function(selectedProductLabel) {
    // this.disableAllRatings();

    var x = selectedProductLabel.closest('tr').find('input').each(function(){
      $(this).removeAttr('disabled');
    });
    this.activeProduct = selectedProductLabel.data('property');
  },

  setProductRating: function(product, rating) {
    var xyz = $('tr[data-product="'+ product +'"]').find('td input[data-rating="' + rating +'"]').prop('checked', true);
  }
}

$(document).ready( function(){
  var productRating = new ProductRating();
  productRating.init();
});