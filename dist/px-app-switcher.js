'use strict';(function(){Polymer({is:'px-app-switcher',behaviors:[Polymer.IronResizableBehavior],attached:function attached(){Polymer.Gestures.add(document,'tap',null);this._created()},detached:function detached(){this.unlisten(this.firstElementChild.childNodes[1],'tap','_clickButtonEvent');this.unlisten(document,'click','_clickButtonEvent')},properties:{items:{type:Array,notify:true,value:function value(){return[]}},iconsList:{type:Array,value:function value(){return[]},computed:'_computedItems(items, items.*)'},open:{type:Boolean,value:false},displayString:{type:String,notify:true,value:''}},listeners:{'iron-resize':'_onIronResize'},_created:function _created(){this.listen(this.firstElementChild.childNodes[1],'tap','_clickButtonEvent');this.listen(document,'click','_clickButtonEvent')},_computedItems:function _computedItems(items){if(this.items){var computedItemsArr=[];items.forEach(function(item,index){computedItemsArr.push(item)});return computedItemsArr}},_clickButtonEvent:function _clickButtonEvent(event){if(event.type==='click'&&!event.target.classList.contains('menu-button')){this._openOrHideElement(false,'')}else if(event.type==='tap'&&event.target.classList.contains('menu-button')){if(this.open){this._openOrHideElement(false,'')}else{this._setPosition();this._openOrHideElement(true,'open')}}},_openOrHideElement:function _openOrHideElement(displayBoolean,displayString){this.open=displayBoolean;this.displayString=displayString},_setPosition:function _setPosition(){var bodyRect=this.firstElementChild.getBoundingClientRect();var button=this.firstElementChild.childNodes[1].getBoundingClientRect();if(button.right>+window.innerWidth/2){var right=bodyRect.right-button.right+button.width+15;this.customStyle['--shared-position-right']=right+'px !important;';this.customStyle['--shared-position-left']='';this.customStyle['--shared-margin']='50px';this.customStyle['--carat-right']='10px !important;';this.customStyle['--carat-left']=''}else{this.customStyle['--shared-position-left']=button.left+'px !important;';this.customStyle['--shared-position-right']='';this.customStyle['--shared-margin']='20px';this.customStyle['--carat-right']='';this.customStyle['--carat-left']='10px !important;'}this.updateStyles()},_onIronResize:function _onIronResize(){if(this.open){this._setPosition()}}})})();
//# sourceMappingURL=px-app-switcher.js.map
