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
      this._setColValue(this.items);
      this._setIronIcon();
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
    /**
     * Properties block, expose attribute values to the DOM via 'reflect'
     *
     * @property properties
     * @type Object
     */
    properties: {
      /**
       * This property keeps track of the main list/array of objects.
       *
       * - object data format:
       *                       [{
         *                         icon:'fa icon of choice', // This can be left blank and no image will display,
         *                                                   // provided a title is in place.
         *                         title: 'Title of thing',  // This could be left blank provided a fa icon is
         *                                                   // in place.
         *                         url: 'url path of choice'
         *                       }]
       */
      items: {
        type: Array,
        notify: true,
        value: function () {
          return [];
        }
      },
      /**
       * This property keeps track of the icons list one it has been transformed and checked for proper data.
       */
      iconsList: {
        type: Array,
        value: function () {
          return [];
        },
        computed: '_computedItems(items, items.*)'
      },
      /**
       * This property keeps track of the boolean for opening and closing of the popover.
       *
       */
      open: {
        type: Boolean,
        value: false
      },
      /**
       * This property keeps track of the boolean displaying as grid.
       * - 'yes': will display in grid format.
       * - 'no' : will display in list format.
       */
      isGrid: {
        type: String,
        value: ''
      },
      /**
       * This property keeps track the display string for open or closing css.
       *
       */
      displayString :{
        type: String,
        notify: true,
        value: ''
      },
      /**
       * This property keeps track the display col spacing value, set to private.
       *
       */
      _colValue:{
        type: String,
        value: ''
      },
      /**
       * This property keeps track the main button image icon. Any fa icon can be passed in if desired.
       * - Default: fa:fa-th
       */
      ironIconImage: {
        type: String,
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
     * Parses an array of strings into an iterative array for the html template.
     *
     * @method computedItems
     */
    _setColValue: function (array) {
      if(this.isgrid.toLowerCase() === 'yes') {
        if(array.length % 3 === 0) {
          this._colValue = 'col-sm-4';
        } else if (array.length % 2 === 0) {
          this._colValue = 'col-sm-3';
        }
      } else {
        this._colValue = 'col-sm-12';
      }
    },
    /**
     * Handles setting of iron icon main button.
     *
     * @method setIronIcon
     */
    _setIronIcon: function () {
      this.ironIconImage = (this.ironiconimage ? this.ironiconimage : 'fa:fa-th')
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
      this.displayString = displayString + (this.isgrid.toLowerCase() === 'yes' ? ' isGrid' : ' isList');
    },

    /**
     * Handles how to display popover element on show.
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
        this.customStyle['--shared-margin'] = '15px';
        this.customStyle['--carat-right'] = '';
        this.customStyle['--carat-left'] = '15px !important;';
      }
      this.updateStyles();
    } ,

    /**
     * Handles how to position popover on screen resize.
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
