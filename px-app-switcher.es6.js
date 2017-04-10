(function() {
  Polymer({

    is: 'px-app-switcher',
    behaviors: [
      Polymer.IronResizableBehavior
    ],
    /**
     * attaches listeners when popover is created
     *
     * @method attached
     */
    attached: function() {
      // Enable document-wide tap recognizer.
      Polymer.Gestures.add(document, 'tap', null);
      this._created();
    },
    /**
     * removes listeners when popover is destroyed
     *
     * @method detached
     */
    detached: function () {
      this.unlisten(this.firstElementChild.childNodes[1], 'tap', '_clickButtonEvent');
      this.unlisten(document, 'click', '_clickButtonEvent');
    },
    properties: {
      /**
       * This property keeps track of the number items in the main list.
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
       * This property keeps track of the icons list.
       *
       * @property iconsList
       */
      iconsList: {
        type: Array,
        value: function () {
          return [];
        },
        computed: '_computedItems(items, items.*)'
      },
      /**
       * This property keeps track of the boolean for open and closing of the popover.
       *
       * @property open
       */
      open: {
        type: Boolean,
        value: false
      },
      /**
       * This property keeps track the display string for open or closing css.
       *
       * @property displayString
       */
      displayString :{
        type: String,
        notify: true,
        value: ''
      }
    },
    /**
     * Adds a listener for resizing the window.
     *
     * @method handleClick
     */
    listeners: {
      'iron-resize': '_onIronResize'
    },

    /**
     * Adds listener events to document and element.
     *
     * @method created
     */
    _created: function () {
      this.listen(this.firstElementChild.childNodes[1], 'tap', '_clickButtonEvent');
      this.listen(document, 'click', '_clickButtonEvent');
    },

    /**
     * Parses an array of strings into an iterative array for the html template.
     *
     * @method computedItems
     */
    _computedItems: function (items) {
      if (this.items) {
        var computedItemsArr = [];
          items.forEach(function (item, index) {
            computedItemsArr.push(item);
          });
          return computedItemsArr;
      }
    },

    /**
     * Handles click on the element to either hide or show popover.
     *
     * @method handleButtonEvent
     */
    _clickButtonEvent: function (event) {
      if(event.type === 'click' && !event.target.classList.contains("menu-button")) {
        this._openOrHideElement(false, '');
      } else if(event.type === 'tap' && event.target.classList.contains("menu-button")) {
        if (this.open){
          this._openOrHideElement(false, '');
        } else {
          this._setPosition();
          this._openOrHideElement(true, 'open');
        }
      }
    },

    /**
     * Handles how to show ors hide the element on off click/ or secondary button click.
     *
     * @method hide
     */
    _openOrHideElement: function(displayBoolean, displayString) {
      this.open = displayBoolean
      this.displayString = displayString;
    },

    /**
     * Handleshow to display popover element on show.
     *
     * @method setPosition
     */
    _setPosition: function() {
      var bodyRect = this.firstElementChild.getBoundingClientRect();
      var button = this.firstElementChild.childNodes[1].getBoundingClientRect();

      if(button.right >  + window.innerWidth / 2) {
        var right = ((bodyRect.right - button.right) + (button.width)) + 15;
        this.customStyle['--shared-position-right'] = right + 'px !important;';
        this.customStyle['--shared-position-left'] = '';
        this.customStyle['--shared-margin'] = '50px';
        this.customStyle['--carat-right'] = '10px !important;';
        this.customStyle['--carat-left'] = '';
      } else {
        this.customStyle['--shared-position-left'] = button.left + 'px !important;';
        this.customStyle['--shared-position-right'] = '';
        this.customStyle['--shared-margin'] = '20px';
        this.customStyle['--carat-right'] = '';
        this.customStyle['--carat-left'] = '10px !important;';
      }
      this.updateStyles();
    } ,

    /**
     * Handles how to position popover on screen resize
     *
     * @method onIronResize
     */
    _onIronResize: function () {
      if(this.open) {
        this._setPosition();
      }
    }
  });
})();
