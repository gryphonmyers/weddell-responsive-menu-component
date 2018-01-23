(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.WeddellResponsiveMenu = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */

module.exports = function debounce(func, wait, immediate) {
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function debounced() {
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  debounced.flush = function () {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;

      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};

},{}],2:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var FindParent = {
  byMatcher: function byMatcher(element, func, opts) {
    if (opts === undefined) {
      opts = {};
    }

    if (opts === null || Array.isArray(opts) || (typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) !== 'object') {
      throw new Error('Expected opts to be an object.');
    }

    if (!element || element === document) {
      if (opts.throwOnMiss) {
        throw new Error('Expected to find parent node, but none was found.');
      }

      return undefined;
    }

    if (func(element)) {
      return element;
    }

    return this.byMatcher(element.parentNode, func, opts);
  },

  byClassName: function byClassName(element, className, opts) {
    return this.byMatcher(element, function (el) {
      return el.classList.contains(className);
    }, opts);
  },

  withDataAttribute: function withDataAttribute(element, attName, opts) {
    return this.byMatcher(element, function (el) {
      return el.dataset.hasOwnProperty(attName);
    }, opts);
  }
};

module.exports = FindParent;

},{}],3:[function(require,module,exports){
'use strict';

require('./src/runtime');

},{"./src/runtime":4}],4:[function(require,module,exports){
(function (global){
'use strict';

var mergeAttrs = { class: 1 };

exports.compileAttrs = compileAttrs;
global.pugVDOMRuntime = exports;

function compileAttrs(attrs, attrBlocks) {
    var attrsObj = attrBlocks.reduce(function (finalObj, currObj) {
        for (var propName in currObj) {
            finalObj[propName] = finalObj[propName] ? finalObj[propName].concat(currObj[propName]) : [currObj[propName]];
        }
        return finalObj;
    }, attrs.reduce(function (finalObj, attr) {
        var val = attr.val;
        finalObj[attr.name] = finalObj[attr.name] ? finalObj[attr.name].concat(val) : [val];
        return finalObj;
    }, {}));

    for (var propName in attrsObj) {
        attrsObj[propName] = mergeAttrs[propName] ? attrsObj[propName].join(' ') : attrsObj[propName].pop();
    }

    return attrsObj;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
module.exports = ".accordion-row {\n    \n}"
},{}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (Component) {
    return function (_Component) {
        _inherits(AccordionRow, _Component);

        function AccordionRow(opts) {
            _classCallCheck(this, AccordionRow);

            return _possibleConstructorReturn(this, (AccordionRow.__proto__ || Object.getPrototypeOf(AccordionRow)).call(this, Object.assign(opts, {
                state: {
                    accordionLabel: '',
                    accordionLabelLink: null,
                    accordionLabelSrc: null,
                    type: 'checkbox',
                    expanderStyle: 'plus-minus'
                },
                inputs: ['expanderStyle', 'type', 'accordionLabel', 'accordionLabelLink', 'accordionLabelSrc'],
                markupTemplate: require('./index.pug'),
                components: {
                    // AccordionRow: require('./accordion-row')
                }
            })));
        }

        _createClass(AccordionRow, [{
            key: 'onInit',
            value: function onInit() {}
        }], [{
            key: 'styles',
            get: function get() {
                return require('./index.css');
            }
        }]);

        return AccordionRow;
    }(Component);
};

},{"./index.css":5,"./index.pug":7}],7:[function(require,module,exports){
require('pug-vdom/runtime');
 module.exports = function(locals, h){function render(context, h) {
  if (!pugVDOMRuntime) throw "pug-vdom runtime not found.";
  var runtime = pugVDOMRuntime
  var locals = context;
  var self = locals;
  for (var prop in locals) eval('var ' + prop + ' =  locals.' + prop)
  var n0Child = []
  var n209Child = []
  var n210Child = []
  var props = {attributes: runtime.compileAttrs([{name:'class', val: 'accordion'},{name:'name', val: 'sections-accordion'},{name:'type', val: locals.type},{name:'id', val: 'accordion-'+locals.$componentID + locals.$id+'-checkbox'}], [])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n210 = h('input', props, n210Child)
  n209Child.push(n210)
  var n211Child = []
  var n212Child = []
  var props = {attributes: runtime.compileAttrs([{name:'class', val: 'expander'}], [])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n212 = h('div', props, n212Child)
  n211Child.push(n212)
  var n213Child = []
  if(locals.accordionLabelLink && locals.accordionLabelSrc) {
    var n214Child = []
    var n215Child = []
    var props = {attributes: runtime.compileAttrs([{name:'src', val: locals.accordionLabelSrc}], [])};
    if (props.attributes.id) props.key = props.attributes.id;
    var n215 = h('img', props, n215Child)
    n214Child.push(n215)
    var props = {attributes: runtime.compileAttrs([{name:'href', val: locals.accordionLabelLink}], [])};
    if (props.attributes.id) props.key = props.attributes.id;
    var n214 = h('a', props, n214Child)
    n213Child.push(n214)
  } else {
    if(locals.accordionLabelLink) {
      var n216Child = []
      n216Child.push(locals.accordionLabel)
      var props = {attributes: runtime.compileAttrs([{name:'href', val: locals.accordionLabelLink}], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n216 = h('a', props, n216Child)
      n213Child.push(n216)
    } else {
      if(locals.accordionLabelSrc) {
        var n217Child = []
        var props = {attributes: runtime.compileAttrs([{name:'src', val: locals.accordionLabelSrc}], [])};
        if (props.attributes.id) props.key = props.attributes.id;
        var n217 = h('img', props, n217Child)
        n213Child.push(n217)
      } else {
        var n218Child = []
        n218Child.push(locals.accordionLabel)
        var props = {attributes: runtime.compileAttrs([], [])};
        if (props.attributes.id) props.key = props.attributes.id;
        var n218 = h('span', props, n218Child)
        n213Child.push(n218)
      }
    }
  }
  var props = {attributes: runtime.compileAttrs([], [])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n213 = h('h3', props, n213Child)
  n211Child.push(n213)
  var props = {attributes: runtime.compileAttrs([{name:'class', val: 'accordion-label'},{name:'for', val: 'accordion-' + locals.$componentID + locals.$id + '-checkbox'}], [])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n211 = h('label', props, n211Child)
  n209Child.push(n211)
  var n219Child = []
  var n220Child = []
  var props = {attributes: runtime.compileAttrs([], [])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n220 = h('content', props, n220Child)
  n219Child.push(n220)
  var props = {attributes: runtime.compileAttrs([{name:'class', val: 'accordion-content'}], [])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n219 = h('div', props, n219Child)
  n209Child.push(n219)
  var props = {attributes: runtime.compileAttrs([{name:'class', val: 'accordion-row'},{name:'class', val: locals.expanderStyle}], [locals.$attributes])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n209 = h('div', props, n209Child)
  n0Child.push(n209)
  return n0Child
}
return render(locals, h);}
},{"pug-vdom/runtime":3}],8:[function(require,module,exports){
module.exports = ".accordion-wrapper .expander, .accordion-wrapper .expander::before, .accordion-wrapper .expander::after {\n    background-color: red;\n}\n.accordion-wrapper .accordion-row {\n    border-color: transparent;\n}\n.accordion-wrapper .accordion-row.plus-minus > .accordion-label .expander {\n    width: 24px;\n}\n.accordion-wrapper .accordion-row.plus-minus > .accordion-label .expander::after {\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n}\n.accordion-wrapper .accordion-row.plus-minus > .accordion-label .expander::before {\n    -webkit-transform: translate(-50%, -50%) rotate(90deg);\n            transform: translate(-50%, -50%) rotate(90deg);\n}\n.accordion-wrapper .accordion-row.plus-minus > .accordion-label .expander::before, .accordion-wrapper .accordion-row.plus-minus > .accordion-label .expander::after {\n    content: '';\n    position: absolute;\n    display: block;\n    width: 24px;\n    height: 2px;\n    opacity: 1;\n    -webkit-transition: opacity 500ms;\n    transition: opacity 500ms;\n}\n.accordion-wrapper .accordion-row.plus-minus > .accordion[type=radio]:checked + .accordion-label .expander,\n                .accordion-wrapper .accordion-row.plus-minus > .accordion[type=radio]:checked + .accordion-label .expander {\n    opacity: 0;\n}\n.accordion-wrapper .accordion-row.plus-minus > .accordion[type=checkbox]:checked  + .accordion-label .expander::before {\n    opacity: 0;\n}\n.accordion-wrapper .accordion-row.hamburger > .accordion-label .expander {\n    margin-left: 7.5px;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n    width: 35px;\n    height: 5px;\n    background-clip: content-box;\n    -webkit-box-sizing: content-box;\n            box-sizing: content-box;\n    padding: 10px 0;\n    -webkit-transition: .1s background-color ease-in-out;\n    transition: .1s background-color ease-in-out;\n}\n.accordion-wrapper .accordion-row.hamburger > .accordion-label .expander::after, .accordion-wrapper .accordion-row.hamburger > .accordion-label .expander::before {\n    content: '';\n    display: block;\n    position: absolute;\n    border-radius: 1px;\n    height: 5px;\n    width: 35px;\n    -webkit-transition: all .1s ease-in-out;\n    transition: all .1s ease-in-out;\n}\n.accordion-wrapper .accordion-row.hamburger > .accordion-label .expander::after {\n    bottom: 0;\n}\n.accordion-wrapper .accordion-row.hamburger > .accordion-label .expander::before {\n    top: 0;\n}\n.accordion-wrapper .accordion-row.hamburger > .accordion:checked  + .accordion-label .expander {\n    background-color: transparent;\n}\n.accordion-wrapper .accordion-row.hamburger > .accordion:checked  + .accordion-label .expander::after {\n    -webkit-transform: rotate(-55deg);\n            transform: rotate(-55deg);\n    bottom: 50%;\n    margin-bottom: -2.5px;\n}\n.accordion-wrapper .accordion-row.hamburger > .accordion:checked  + .accordion-label .expander::before {\n    -webkit-transform: rotate(55deg);\n            transform: rotate(55deg);\n    top: 50%;\n    margin-top: -2.5px;\n}\n.accordion-wrapper .accordion-row.expander-left > .accordion-label {\n    padding: 10px 15px 10px 50px;\n}\n.accordion-wrapper .accordion-row.expander-left > .accordion-label .expander {\n    left: 0;\n    right: auto;\n}\n.accordion-wrapper .accordion-label {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    position: relative;\n    padding: 10px 50px 10px 15px;\n    position: relative;\n    margin-bottom: 5px;\n    -webkit-transition: border-bottom 0s 500ms,\n                    margin-bottom 0s 500ms,\n                    background-color 500ms;\n    transition: border-bottom 0s 500ms,\n                    margin-bottom 0s 500ms,\n                    background-color 500ms;\n    border: 1px solid;\n    border-color: inherit;\n    /* /// Open/Close indicators //// */\n}\n.accordion-wrapper .accordion-label .expander {\n    position: absolute;\n    right: 0;\n    display: block;\n}\n.accordion-wrapper .accordion[type=checkbox] + .accordion-label {\n    cursor: pointer;\n}\n.accordion-wrapper .accordion[type=radio]:not(:checked) + .accordion-label {\n    cursor: pointer;\n}\n.accordion-wrapper .accordion {\n    display: none;\n}\n.accordion-wrapper .accordion + .accordion-content,\n        .accordion-wrapper .accordion + .accordion-label + .accordion-content {\n    overflow: hidden;\n    -webkit-transition: max-height 500ms 0s,\n                        padding-left 0s 500ms,\n                        padding-right 0s 500ms,\n                        padding-top 500ms,\n                        padding-bottom 500ms,\n                        border 0s 500ms,\n                        margin-bottom 0s 500ms,\n                        background-color 500ms;\n    transition: max-height 500ms 0s,\n                        padding-left 0s 500ms,\n                        padding-right 0s 500ms,\n                        padding-top 500ms,\n                        padding-bottom 500ms,\n                        border 0s 500ms,\n                        margin-bottom 0s 500ms,\n                        background-color 500ms;\n}\n.accordion-wrapper .accordion:checked + .accordion-content,\n            .accordion-wrapper .accordion:checked + .accordion-label + .accordion-content {\n    max-height: 1500px;\n    padding-top: 10px;\n    padding-bottom: 10px;\n    padding-left: 30px;\n    padding-right: 15px;\n    -webkit-transition: max-height 500ms 0s,\n                            padding-left 0s,\n                            padding-right 0s,\n                            padding-top 500ms,\n                            padding-bottom 500ms,\n                            background-color 500ms;\n    transition: max-height 500ms 0s,\n                            padding-left 0s,\n                            padding-right 0s,\n                            padding-top 500ms,\n                            padding-bottom 500ms,\n                            background-color 500ms;\n}\n.accordion-wrapper .accordion:checked + .accordion-label {\n    border-bottom: none;\n    margin-bottom: 0;\n    -webkit-transition: margin-bottom 0s;\n    transition: margin-bottom 0s;\n}\n.accordion-wrapper .accordion:checked + .accordion-label + .accordion-content {\n    border: 1px solid;\n    border-color: inherit;\n    border-top: none;\n    margin-bottom: 5px;\n}\n.accordion-wrapper .accordion:not(:checked) + .accordion-content,\n            .accordion-wrapper .accordion:not(:checked) + .accordion-label + .accordion-content {\n    max-height: 0;\n    border: 0px solid transparent;\n    margin-bottom: 0;\n}\n"
},{}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var findParent = require('find-parent');

module.exports = function (Component) {
    return function (_Component) {
        _inherits(Accordion, _Component);

        function Accordion(opts) {
            _classCallCheck(this, Accordion);

            return _possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call(this, Object.assign(opts, {
                state: {
                    collapseOnClick: true
                },
                inputs: ['accordionName', 'type', 'collapseOnClick'],
                markupTemplate: require('./index.pug'),
                components: {
                    AccordionRow: [require('../accordion-row'), { type: 'type' }]
                }
            })));
        }

        _createClass(Accordion, [{
            key: 'handleClick',
            value: function handleClick(evt) {
                if (this.state.collapseOnClick && findParent.byMatcher(evt.target, function (el) {
                    return el.tagName === 'A';
                })) {
                    var els = evt.currentTarget.querySelectorAll('#accordion-' + this.state.$id + ' > .accordion-row > input.accordion[type="checkbox"]');
                    Array.from(els).forEach(function (el) {
                        el.checked = false;
                    });
                }
            }
        }, {
            key: 'onInit',
            value: function onInit() {}
        }], [{
            key: 'styles',
            get: function get() {
                return require('./index.css');
            }
        }]);

        return Accordion;
    }(Component);
};

},{"../accordion-row":6,"./index.css":8,"./index.pug":10,"find-parent":2}],10:[function(require,module,exports){
require('pug-vdom/runtime');
 module.exports = function(locals, h){function render(context, h) {
  if (!pugVDOMRuntime) throw "pug-vdom runtime not found.";
  var runtime = pugVDOMRuntime
  var locals = context;
  var self = locals;
  for (var prop in locals) eval('var ' + prop + ' =  locals.' + prop)
  var n0Child = []
  var n75Child = []
  var n76Child = []
  var props = {attributes: runtime.compileAttrs([], [])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n76 = h('content', props, n76Child)
  n75Child.push(n76)
  var props = {attributes: runtime.compileAttrs([{name:'class', val: 'accordion-wrapper'},{name:'id', val: "accordion-"+locals.$id},{name:'onclick', val: $bind("this.handleClick(event)")}], [locals.$attributes])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n75 = h('div', props, n75Child)
  n0Child.push(n75)
  return n0Child
}
return render(locals, h);}
},{"pug-vdom/runtime":3}],11:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuItemComponentFactory = require('./menu-item');

module.exports = function (Component) {
    return function (_MenuItemComponentFac) {
        _inherits(DropdownItemComponent, _MenuItemComponentFac);

        function DropdownItemComponent(opts) {
            _classCallCheck(this, DropdownItemComponent);

            return _possibleConstructorReturn(this, (DropdownItemComponent.__proto__ || Object.getPrototypeOf(DropdownItemComponent)).call(this, Object.assign({
                state: {},
                markupTemplate: require('./templates/dropdown-item.pug'),
                components: {
                    Menu: require('./menu')
                }
            }, opts)));
        }

        _createClass(DropdownItemComponent, null, [{
            key: 'styles',
            get: function get() {
                return require('./styles/dropdown-item.css');
            }
        }]);

        return DropdownItemComponent;
    }(MenuItemComponentFactory(Component));
};

},{"./menu":13,"./menu-item":12,"./styles/dropdown-item.css":14,"./templates/dropdown-item.pug":17}],12:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (Component) {
    return function (_Component) {
        _inherits(MenuItemComponent, _Component);

        function MenuItemComponent(opts) {
            _classCallCheck(this, MenuItemComponent);

            return _possibleConstructorReturn(this, (MenuItemComponent.__proto__ || Object.getPrototypeOf(MenuItemComponent)).call(this, Object.assign({
                state: {},
                inputs: ['src', 'href', 'content', 'target'], //TODO add support for svg sprite handle
                markupTemplate: require('./templates/menu-item.pug')
            }, opts)));
        }

        _createClass(MenuItemComponent, null, [{
            key: 'styles',
            get: function get() {
                return require('./styles/menu-item.css');
            }
        }]);

        return MenuItemComponent;
    }(Component);
};

},{"./styles/menu-item.css":15,"./templates/menu-item.pug":18}],13:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (Component) {
    return function (_Component) {
        _inherits(MenuComponent, _Component);

        function MenuComponent(opts) {
            _classCallCheck(this, MenuComponent);

            return _possibleConstructorReturn(this, (MenuComponent.__proto__ || Object.getPrototypeOf(MenuComponent)).call(this, Object.assign(opts, {
                state: {},
                inputs: ['listItems'],
                markupTemplate: require('./templates/menu.pug'),
                components: {
                    MenuItem: require('./menu-item'),
                    DropdownItem: require('./dropdown-item')
                }
            })));
        }

        _createClass(MenuComponent, null, [{
            key: 'styles',
            get: function get() {
                return require('./styles/menu.css');
            }
        }]);

        return MenuComponent;
    }(Component);
};

},{"./dropdown-item":11,"./menu-item":12,"./styles/menu.css":16,"./templates/menu.pug":19}],14:[function(require,module,exports){
module.exports = ".has-dropdown {\n    position: relative\n}\n.has-dropdown .menu-item {\n    display: block;\n}\n.has-dropdown .menu {\n    opacity: 0;\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    -webkit-transition: visibility 0s linear 0.25s, opacity 0.15s linear;\n    transition: visibility 0s linear 0.25s, opacity 0.15s linear;\n    visibility: hidden;\n    position: absolute;\n    z-index: 1\n}\n.has-dropdown .menu.align-center {\n    position: absolute;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%);\n}\n.has-dropdown .menu.align-left {\n    left: 0;\n}\n.has-dropdown .menu.align-right {\n    right: 0;\n}\n.has-dropdown:hover > ul, .has-dropdown:focus > ul {\n    opacity: 1;\n    visibility: visible;\n    -webkit-transition-delay:0s;\n            transition-delay:0s;\n}\n"
},{}],15:[function(require,module,exports){
module.exports = ".menu-item {\n    -ms-flex-preferred-size: 100%;\n        flex-basis: 100%;\n}\n"
},{}],16:[function(require,module,exports){
module.exports = ".menu {\n    \n}\n"
},{}],17:[function(require,module,exports){
require('pug-vdom/runtime');
 module.exports = function(locals, h){function render(context, h) {
  if (!pugVDOMRuntime) throw "pug-vdom runtime not found.";
  var runtime = pugVDOMRuntime
  var locals = context;
  var self = locals;
  for (var prop in locals) eval('var ' + prop + ' =  locals.' + prop)
  var n0Child = []
  var additionalAttributes = {};
  additionalAttributes.class = 'has-dropdown'
  var n160Child = []
  if(locals.href && locals.src) {
    var n161Child = []
    var n162Child = []
    var props = {attributes: runtime.compileAttrs([{name:'src', val: locals.src}], [])};
    if (props.attributes.id) props.key = props.attributes.id;
    var n162 = h('img', props, n162Child)
    n161Child.push(n162)
    var props = {attributes: runtime.compileAttrs([{name:'href', val: locals.href},{name:'target', val: locals.target}], [])};
    if (props.attributes.id) props.key = props.attributes.id;
    var n161 = h('a', props, n161Child)
    n160Child.push(n161)
  } else {
    if(locals.href && locals.svghref) {
      var n163Child = []
      var n164Child = []
      var n165Child = []
      var props = {attributes: runtime.compileAttrs([{name:'xlink:href', val: locals.svghref}], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n165 = h('use', props, n165Child)
      n164Child.push(n165)
      var props = {attributes: runtime.compileAttrs([], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n164 = h('svg', props, n164Child)
      n163Child.push(n164)
      var props = {attributes: runtime.compileAttrs([{name:'href', val: locals.href}], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n163 = h('a', props, n163Child)
      n160Child.push(n163)
    } else {
      if(locals.href) {
        var n166Child = []
        n166Child.push(locals.content)
        var props = {attributes: runtime.compileAttrs([{name:'href', val: locals.href},{name:'target', val: locals.target}], [])};
        if (props.attributes.id) props.key = props.attributes.id;
        var n166 = h('a', props, n166Child)
        n160Child.push(n166)
      } else {
        if(locals.src) {
          var n167Child = []
          var props = {attributes: runtime.compileAttrs([{name:'src', val: locals.src}], [])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n167 = h('img', props, n167Child)
          n160Child.push(n167)
        } else {
          if(locals.svghref) {
            var n168Child = []
            var n169Child = []
            var props = {attributes: runtime.compileAttrs([{name:'xlink:href', val: locals.svghref}], [])};
            if (props.attributes.id) props.key = props.attributes.id;
            var n169 = h('use', props, n169Child)
            n168Child.push(n169)
            var props = {attributes: runtime.compileAttrs([], [])};
            if (props.attributes.id) props.key = props.attributes.id;
            var n168 = h('svg', props, n168Child)
            n160Child.push(n168)
          } else {
            var n170Child = []
            n170Child.push(locals.content)
            var props = {attributes: runtime.compileAttrs([], [])};
            if (props.attributes.id) props.key = props.attributes.id;
            var n170 = h('span', props, n170Child)
            n160Child.push(n170)
          }
        }
      }
    }
  }
  var n171Child = []
  var n172Child = []
  var props = {attributes: runtime.compileAttrs([], [])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n172 = h('content', props, n172Child)
  n171Child.push(n172)
  var props = {attributes: runtime.compileAttrs([], [locals.$attributes])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n171 = h('Menu', props, n171Child)
  n160Child.push(n171)
  var props = {attributes: runtime.compileAttrs([{name:'class', val: 'menu-item'}], [locals.$attributes, additionalAttributes])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n160 = h('li', props, n160Child)
  n0Child.push(n160)
  return n0Child
}
return render(locals, h);}
},{"pug-vdom/runtime":3}],18:[function(require,module,exports){
require('pug-vdom/runtime');
 module.exports = function(locals, h){function render(context, h) {
  if (!pugVDOMRuntime) throw "pug-vdom runtime not found.";
  var runtime = pugVDOMRuntime
  var locals = context;
  var self = locals;
  for (var prop in locals) eval('var ' + prop + ' =  locals.' + prop)
  var n0Child = []
  var additionalAttributes = {};
  var n149Child = []
  if(locals.href && locals.src) {
    var n150Child = []
    var n151Child = []
    var props = {attributes: runtime.compileAttrs([{name:'src', val: locals.src}], [])};
    if (props.attributes.id) props.key = props.attributes.id;
    var n151 = h('img', props, n151Child)
    n150Child.push(n151)
    var props = {attributes: runtime.compileAttrs([{name:'href', val: locals.href},{name:'target', val: locals.target}], [])};
    if (props.attributes.id) props.key = props.attributes.id;
    var n150 = h('a', props, n150Child)
    n149Child.push(n150)
  } else {
    if(locals.href && locals.svghref) {
      var n152Child = []
      var n153Child = []
      var n154Child = []
      var props = {attributes: runtime.compileAttrs([{name:'xlink:href', val: locals.svghref}], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n154 = h('use', props, n154Child)
      n153Child.push(n154)
      var props = {attributes: runtime.compileAttrs([], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n153 = h('svg', props, n153Child)
      n152Child.push(n153)
      var props = {attributes: runtime.compileAttrs([{name:'href', val: locals.href}], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n152 = h('a', props, n152Child)
      n149Child.push(n152)
    } else {
      if(locals.href) {
        var n155Child = []
        n155Child.push(locals.content)
        var props = {attributes: runtime.compileAttrs([{name:'href', val: locals.href},{name:'target', val: locals.target}], [])};
        if (props.attributes.id) props.key = props.attributes.id;
        var n155 = h('a', props, n155Child)
        n149Child.push(n155)
      } else {
        if(locals.src) {
          var n156Child = []
          var props = {attributes: runtime.compileAttrs([{name:'src', val: locals.src}], [])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n156 = h('img', props, n156Child)
          n149Child.push(n156)
        } else {
          if(locals.svghref) {
            var n157Child = []
            var n158Child = []
            var props = {attributes: runtime.compileAttrs([{name:'xlink:href', val: locals.svghref}], [])};
            if (props.attributes.id) props.key = props.attributes.id;
            var n158 = h('use', props, n158Child)
            n157Child.push(n158)
            var props = {attributes: runtime.compileAttrs([], [])};
            if (props.attributes.id) props.key = props.attributes.id;
            var n157 = h('svg', props, n157Child)
            n149Child.push(n157)
          } else {
            var n159Child = []
            n159Child.push(locals.content)
            var props = {attributes: runtime.compileAttrs([], [])};
            if (props.attributes.id) props.key = props.attributes.id;
            var n159 = h('span', props, n159Child)
            n149Child.push(n159)
          }
        }
      }
    }
  }
  var props = {attributes: runtime.compileAttrs([{name:'class', val: 'menu-item'}], [locals.$attributes, additionalAttributes])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n149 = h('li', props, n149Child)
  n0Child.push(n149)
  return n0Child
}
return render(locals, h);}
},{"pug-vdom/runtime":3}],19:[function(require,module,exports){
require('pug-vdom/runtime');
 module.exports = function(locals, h){function render(context, h) {
  if (!pugVDOMRuntime) throw "pug-vdom runtime not found.";
  var runtime = pugVDOMRuntime
  var locals = context;
  var self = locals;
  for (var prop in locals) eval('var ' + prop + ' =  locals.' + prop)
  var n0Child = []
  var n67Child = []
  var n68Child = []
  var props = {attributes: runtime.compileAttrs([], [])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n68 = h('content', props, n68Child)
  n67Child.push(n68)
  var props = {attributes: runtime.compileAttrs([{name:'class', val: 'menu'}], [locals.$attributes])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n67 = h('ul', props, n67Child)
  n0Child.push(n67)
  return n0Child
}
return render(locals, h);}
},{"pug-vdom/runtime":3}],20:[function(require,module,exports){
module.exports = ".responsive-dropdown.list {\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n}\n.responsive-dropdown.list.horizontal {\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n}\n"
},{}],21:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debounce = require('debounce');

module.exports = function (Component) {
    return function (_Component) {
        _inherits(ResponsiveDropdown, _Component);

        function ResponsiveDropdown(opts) {
            _classCallCheck(this, ResponsiveDropdown);

            return _possibleConstructorReturn(this, (ResponsiveDropdown.__proto__ || Object.getPrototypeOf(ResponsiveDropdown)).call(this, Object.assign(opts, {
                state: Object.assign(opts.state || {}, {
                    breakpoint: 640,
                    isMobile: false,
                    isLoading: false,
                    mobileType: 'accordion'
                }),
                store: Object.assign(opts.store, {}),
                markupTemplate: require('./index.pug'),
                inputs: ['breakpoint', 'content', 'href', 'src', 'mobileType'],
                components: {
                    MenuItem: require('weddell-menu-component/src/menu-item'),
                    Menu: require('weddell-menu-component/'),
                    Accordion: require('weddell-accordion-component')
                }
            })));
        }

        _createClass(ResponsiveDropdown, [{
            key: 'onMount',
            value: function onMount() {
                this.onResize = this.checkViewport.bind(this);
                window.addEventListener('resize', this.onResize);
                this.checkViewport();
            }
        }, {
            key: 'onUnmount',
            value: function onUnmount() {
                window.removeEventListener('resize', this.onResize);
                this.onResize = null;
            }
        }, {
            key: 'onInit',
            value: function onInit() {
                var _this2 = this;

                this.state.watch('isMobile', function (isMobile) {
                    _this2.state.isLoading = true;
                    _this2.awaitRender().then(function () {
                        _this2.state.isLoading = false;
                    });
                });
            }
        }, {
            key: 'checkViewport',
            value: function checkViewport() {
                this.state.isMobile = window.innerWidth < Number(this.state.breakpoint);
            }
        }], [{
            key: 'styles',
            get: function get() {
                return (_get(ResponsiveDropdown.__proto__ || Object.getPrototypeOf(ResponsiveDropdown), 'styles', this) || '') + require('./index.css');
            }
        }]);

        return ResponsiveDropdown;
    }(Component);
};

},{"./index.css":20,"./index.pug":22,"debounce":1,"weddell-accordion-component":9,"weddell-menu-component/":13,"weddell-menu-component/src/menu-item":12}],22:[function(require,module,exports){
require('pug-vdom/runtime');
 module.exports = function(locals, h){function render(context, h) {
  if (!pugVDOMRuntime) throw "pug-vdom runtime not found.";
  var runtime = pugVDOMRuntime
  var locals = context;
  var self = locals;
  for (var prop in locals) eval('var ' + prop + ' =  locals.' + prop)
  var n0Child = []
  if(locals.isLoading) {
    var n53Child = []
    var props = {attributes: runtime.compileAttrs([{name:'class', val: 'loading'}], [])};
    if (props.attributes.id) props.key = props.attributes.id;
    var n53 = h('div', props, n53Child)
    n0Child.push(n53)
  } else {
    if(locals.isMobile) {
      switch(locals.mobileType) {
        case 'accordion':
          var n54Child = []
          var n55Child = []
          var n56Child = []
          var props = {attributes: runtime.compileAttrs([], [])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n56 = h('content', props, n56Child)
          n55Child.push(n56)
          var props = {attributes: runtime.compileAttrs([], [])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n55 = h('ul', props, n55Child)
          n54Child.push(n55)
          var props = {attributes: runtime.compileAttrs([{name:'class', val: 'responsive-dropdown'},{name:'accordionLabel', val: locals.content},{name:'accordionLabelLink', val: locals.href},{name:'accordionLabelSrc', val: locals.src}], [locals.$attributes])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n54 = h('AccordionRow', props, n54Child)
          n0Child.push(n54)
          break;
        case 'list':
          var n57Child = []
          var n58Child = []
          var props = {attributes: runtime.compileAttrs([], [])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n58 = h('content', props, n58Child)
          n57Child.push(n58)
          var props = {attributes: runtime.compileAttrs([{name:'class', val: 'list'},{name:'class', val: 'responsive-dropdown'},{name:'class', val: 'mobile'}], [locals.$attributes])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n57 = h('Menu', props, n57Child)
          n0Child.push(n57)
          break;
      }
    } else {
      var n59Child = []
      var n60Child = []
      var props = {attributes: runtime.compileAttrs([], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n60 = h('content', props, n60Child)
      n59Child.push(n60)
      var props = {attributes: runtime.compileAttrs([{name:'class', val: 'responsive-dropdown'},{name:'content', val: locals.content},{name:'href', val: locals.href},{name:'src', val: locals.src}], [locals.$attributes])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n59 = h('DropdownItem', props, n59Child)
      n0Child.push(n59)
    }
  }
  return n0Child
}
return render(locals, h);}
},{"pug-vdom/runtime":3}],23:[function(require,module,exports){
module.exports = ".responsive-menu {\n}\n"
},{}],24:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debounce = require('debounce');

module.exports = function (Component) {
    return function (_Component) {
        _inherits(ResponsiveMenu, _Component);

        function ResponsiveMenu(opts) {
            _classCallCheck(this, ResponsiveMenu);

            return _possibleConstructorReturn(this, (ResponsiveMenu.__proto__ || Object.getPrototypeOf(ResponsiveMenu)).call(this, Object.assign(opts, {
                state: Object.assign(opts.state || {}, {
                    breakpoint: 640,
                    isMobile: false,
                    isLoading: false,
                    mobileType: 'accordion'
                }),
                store: Object.assign(opts.store, {}),
                markupTemplate: require('./index.pug'),
                inputs: ['breakpoint', 'mobileType'],
                components: {
                    Menu: require('weddell-menu-component'),
                    Accordion: require('weddell-accordion-component'),
                    ResponsiveDropdown: [require('./components/responsive-dropdown'), { breakpoint: 'breakpoint', mobileType: 'mobileType' }]
                }
            })));
        }

        _createClass(ResponsiveMenu, [{
            key: 'onInit',
            value: function onInit() {
                var _this2 = this;

                this.state.watch('isMobile', function (isMobile) {
                    _this2.state.isLoading = true;
                    _this2.awaitRender().then(function () {
                        _this2.state.isLoading = false;
                    });
                });
            }
        }, {
            key: 'onMount',
            value: function onMount() {
                this.onResize = this.checkViewport.bind(this);
                window.addEventListener('resize', this.onResize);
                this.checkViewport();
            }
        }, {
            key: 'onUnmount',
            value: function onUnmount() {
                window.removeEventListener('resize', this.onResize);
                this.onResize = null;
            }
        }, {
            key: 'checkViewport',
            value: function checkViewport() {
                this.state.isMobile = window.innerWidth < Number(this.state.breakpoint);
            }
        }], [{
            key: 'styles',
            get: function get() {
                return (_get(ResponsiveMenu.__proto__ || Object.getPrototypeOf(ResponsiveMenu), 'styles', this) || '') + require('./index.css');
            }
        }]);

        return ResponsiveMenu;
    }(Component);
};

},{"./components/responsive-dropdown":21,"./index.css":23,"./index.pug":25,"debounce":1,"weddell-accordion-component":9,"weddell-menu-component":13}],25:[function(require,module,exports){
require('pug-vdom/runtime');
 module.exports = function(locals, h){function render(context, h) {
  if (!pugVDOMRuntime) throw "pug-vdom runtime not found.";
  var runtime = pugVDOMRuntime
  var locals = context;
  var self = locals;
  for (var prop in locals) eval('var ' + prop + ' =  locals.' + prop)
  var n0Child = []
  if(locals.isLoading) {
    var n22Child = []
    var props = {attributes: runtime.compileAttrs([{name:'class', val: 'loading'}], [])};
    if (props.attributes.id) props.key = props.attributes.id;
    var n22 = h('div', props, n22Child)
    n0Child.push(n22)
  } else {
    if(locals.isMobile) {
      switch(locals.mobileType) {
        case 'accordion':
          var n23Child = []
          var n24Child = []
          var props = {attributes: runtime.compileAttrs([], [])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n24 = h('content', props, n24Child)
          n23Child.push(n24)
          var props = {attributes: runtime.compileAttrs([{name:'class', val: 'responsive-menu'},{name:'class', val: 'mobile'}], [locals.$attributes])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n23 = h('Accordion', props, n23Child)
          n0Child.push(n23)
          break;
        case 'list':
          var n25Child = []
          var n26Child = []
          var props = {attributes: runtime.compileAttrs([], [])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n26 = h('content', props, n26Child)
          n25Child.push(n26)
          var props = {attributes: runtime.compileAttrs([{name:'class', val: 'responsive-menu'},{name:'class', val: 'mobile'}], [locals.$attributes])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n25 = h('Menu', props, n25Child)
          n0Child.push(n25)
          break;
      }
    } else {
      var n27Child = []
      var n28Child = []
      var props = {attributes: runtime.compileAttrs([], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n28 = h('content', props, n28Child)
      n27Child.push(n28)
      var props = {attributes: runtime.compileAttrs([{name:'class', val: 'responsive-menu'}], [locals.$attributes])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n27 = h('Menu', props, n27Child)
      n0Child.push(n27)
    }
  }
  return n0Child
}
return render(locals, h);}
},{"pug-vdom/runtime":3}]},{},[24])(24)
});