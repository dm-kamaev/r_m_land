var Slider = function() {
  this.initialize.apply(this, arguments);
};
Slider.prototype = {

  initialize: function(slider) {
    this.ul = slider.children[0];
    this.li = this.ul.children;
    // console.log('this.ul = ', this.ul);
    // console.log('this.li = ', this.li);
    // make <ul> as large as all <li>’s
    this.ul.style.width = (this.li[0].clientWidth * this.li.length) + 'px';
    this.currentIndex = 0;
    this.goTo(1); this.goTo(0); /* это делаем для того чтобы избавиться от отсутсвия эфеекта пролистывания при переходе к первому слайду*/
    // console.log('this.ul.style.width =', this.ul.style.width);
  },

  goTo: function(index) {
    // filter invalid indices
    if (index < 0 || index > this.li.length - 1) return;

    // move <ul> left
    this.ul.style.left = '-' + (100 * index) + '%';
    // console.log(this.ul.style.left)
    this.currentIndex = index;
  },

  goToPrev: function() {
    this.goTo(this.currentIndex - 1);
  },

  goToNext: function() {
    this.goTo(this.currentIndex + 1);
  },
  carousel: function (delay) {
    var self = this;
    setTimeout(function() {
      var new_index = self.currentIndex+1;
      var index = (new_index > (self.li.length-1)) ? 0 : new_index;
      self.goTo(index);
      self.carousel(delay)
    }, delay);
  }
};