function ProductRating(){
  this.products = ['Coffee', 'Tea', 'Sodas'];
  this.ratingValues = ['Love it', 'Like it', 'No views', 'Dislike it', 'Abhor it'];
  this.activeProduct = "";
  this.activeRating = "";
}

ProductRating.prototype = {

  init: function() {
    this.ratingValues.unshift(' ');
    this.createGridStructure();
    this.addEventHandlers();
  },

  createGridStructure: function() {
    var grid = $('<table>', {
      id: "productGrid"
    });

    grid.appendTo($('#container'));
    this.productGrid = grid;

    this.addGridHeaders();
    this.populateGrid();
  },

  addGridHeaders: function() {
    var ratingsHeader = $('<tr>');
    
    for(var i = 0; i < this.ratingValues.length; i++) {
      var headerCell = $('<th>', { 'data-rating': this.ratingValues[i] });
      headerCell.append(this.createHeaderButton('rating', this.ratingValues[i]));
      ratingsHeader.append(headerCell);
    }

    this.productGrid.append(ratingsHeader);
  },

  createHeaderButton: function(headerType, headerProperty) {
    var headerBtn = $('<button>', {
      'data-property': headerProperty,
      text: headerProperty,
      'class': headerType
    });

    return headerBtn;
  },


  clickRatingHeader: function(){
    var that = this
    $('button.rating').on('click', function(){
      $('button.rating.selected').removeClass('selected');
      $(this).addClass('selected');
      that.setActiveRating($(this));

      //if its the rating header that's clicked and there's a selected product
      if(that.activeProduct.length) {
        that.rateProduct();
      }
    });
  },

  clickProductHeader: function(){
    var that = this;
    $('button.product').on('click', function(){
      $('button.product.selected').removeClass('selected');
      $(this).addClass('selected');
      that.setActiveProduct($(this));

      //if its the rating header that's clicked and there's a selected product
      if(that.activeRating.length) {
        that.rateProduct();
      }
    });

    
  },

  clickRatingRadio: function() {
    var that =  this;
    $('input[type="radio"]').on('click', function() {
      that.highlightActiveHeaders(this);
    })
  },

  createRatingInput: function(product, rating) {
    var that = this;
    var ratingCheckbox = $('<input>', {
        'type': 'radio',
        'data-rating': rating,
        'value': rating,
        'name': product
    });
    return ratingCheckbox;
  },

  highlightActiveHeaders: function(button) {
     
    //get and highlight corresponding headers
    $('th button.selected').removeClass('selected');
    $('td.selected').removeClass('selected');

    $('th button[data-property="'+ $(button).data('rating') + '"]').addClass('selected');
    $('td[data-property="'+ $(button).data('product') + '"]').addClass('selected');
  },

  setupProductRating: function(product) {
    var productRow = $('<tr>', {
      'data-product': product
    });

    for(var i = 0; i < this.ratingValues.length; i++) {
      var tableCell = $('<td>');

      if(i == 0) {
        tableCell = $('<td>',{ 'data-property': product });
        tableCell.append(this.createHeaderButton('product', product));
      } else { 
        tableCell.append(this.createRatingInput(product, this.ratingValues[i]));
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

  setActiveProduct: function(selectedProductLabel) {
    this.activeProduct = selectedProductLabel.data('property');
  },

  setActiveRating: function(selectedRating) {
    this.activeRating = selectedRating.data('property');
  },

  rateProduct: function() {
    $('input[name="'+ this.activeProduct +'"][data-rating="'+ this.activeRating +'"]').prop('checked', true);
  },

  addEventHandlers: function() {
    this.clickProductHeader();
    this.clickRatingHeader();
    this.clickRatingRadio();
  }
}

$(document).ready( function(){
  var productRating = new ProductRating();
  productRating.init();
});