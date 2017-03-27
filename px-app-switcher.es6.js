(function() {
  Polymer({

    is: 'px-app-switcher',
    ready: function() {
      var distributed = this.firstElementChild;
      var rect = distributed.getBoundingClientRect();
      console.log(rect.top, rect.right, rect.bottom, rect.left);
    },
    properties: {
      /**
      * This property keeps track of the number of clicks.
      *
      * @property counterValue
      */
      items: {
        type: Array,
        notify: true,
        value: function () {
          return [];
        }
      },
      /**
       * This property keeps track of the number ofß clicks.
       *
       * @property counterValue
       */
      iconsList: {
        type: Array,
        value: function () {
          return [];
        },
        computed: '_computedItems(items, items.*)'
      }
    },
    /**
    * Handles click on the element defined in 'on-click' on the template.
    *
    * @method handleClick
    */
    _computedItems: function (items) {
      if (this.items) {
        var computedItemsArr = [];
        if (typeof this.items[0] === 'string') {
          var len = items.length,
            i = 0;
          for (i; i < len; i++) {
            if (this.checkboxMode) {
              //default unchecked if using a string array in check mode
              computedItemsArr.push({val: items[i], checked: false});
            }
            else {
              computedItemsArr.push({val: items[i]});
            }
          }
          return computedItemsArr;
        }
        else {
          //with new array it looks like we need to do a copy of items
          // seems like items can be sparse at this point
          items.forEach(function (item, index) {
            computedItemsArr.push(item);
          });
          return computedItemsArr;
        }
      }
    },
  });
})();
