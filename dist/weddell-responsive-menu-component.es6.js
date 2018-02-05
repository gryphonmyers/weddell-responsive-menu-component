(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.WeddellResponsiveMenu = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

module.exports = function debounce(func, wait, immediate){
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

  var debounced = function(){
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

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  debounced.flush = function() {
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

var FindParent = {
  byMatcher: function(element, func, opts) {
    if (opts === undefined) {
      opts = {};
    }

    if (opts === null || Array.isArray(opts) || typeof opts !== 'object') {
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

  byClassName: function(element, className, opts) {
    return this.byMatcher(element, function(el) {
      return el.classList.contains(className);
    }, opts);
  },

  withDataAttribute: function(element, attName, opts) {
    return this.byMatcher(element, function(el) {
      return el.dataset.hasOwnProperty(attName);
    }, opts);
  }
};

module.exports = FindParent;

},{}],3:[function(require,module,exports){
require('./src/runtime')

},{"./src/runtime":4}],4:[function(require,module,exports){
(function (global){
var mergeAttrs = {class: 1};

exports.compileAttrs = compileAttrs;
global.pugVDOMRuntime = exports

function compileAttrs(attrs, attrBlocks) {
    var attrsObj = attrBlocks
        .reduce(function(finalObj, currObj) {
            for (var propName in currObj) {
                finalObj[propName] = finalObj[propName] ? finalObj[propName].concat(currObj[propName]) : [currObj[propName]];
            }
            return finalObj;
        }, attrs.reduce(function(finalObj, attr) {
            var val = attr.val;
            finalObj[attr.name] = finalObj[attr.name] ? finalObj[attr.name].concat(val) : [val]
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
module.exports = Component => class AccordionRow extends Component {
    constructor(opts) {
        super(Object.assign(opts, {
            state: {
                accordionLabel: '',
                accordionLabelLink: null,
                accordionLabelSrc: null,
                type: 'checkbox',
                expanderStyle: 'plus-minus'
            },
            inputs: ['expanderStyle','type', 'accordionLabel', 'accordionLabelLink', 'accordionLabelSrc'],
            markupTemplate: require('./index.pug'),
            components: {
                // AccordionRow: require('./accordion-row')
            }
        }));
    }

    static get styles() {
        return require('./index.css')
    }

    onInit(){
    }
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
  var n185Child = []
  var n186Child = []
  var props = {attributes: runtime.compileAttrs([{name:'class', val: 'accordion'},{name:'name', val: 'sections-accordion'},{name:'type', val: locals.type},{name:'id', val: 'accordion-'+locals.$componentID + locals.$id+'-checkbox'}], [])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n186 = h('input', props, n186Child)
  n185Child.push(n186)
  var n187Child = []
  var n188Child = []
  var props = {attributes: runtime.compileAttrs([{name:'class', val: 'expander'}], [])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n188 = h('div', props, n188Child)
  n187Child.push(n188)
  var n189Child = []
  if(locals.accordionLabelLink && locals.accordionLabelSrc) {
    var n190Child = []
    var n191Child = []
    var props = {attributes: runtime.compileAttrs([{name:'src', val: locals.accordionLabelSrc}], [])};
    if (props.attributes.id) props.key = props.attributes.id;
    var n191 = h('img', props, n191Child)
    n190Child.push(n191)
    var props = {attributes: runtime.compileAttrs([{name:'href', val: locals.accordionLabelLink}], [])};
    if (props.attributes.id) props.key = props.attributes.id;
    var n190 = h('a', props, n190Child)
    n189Child.push(n190)
  } else {
    if(locals.accordionLabelLink) {
      var n192Child = []
      n192Child.push(locals.accordionLabel)
      var props = {attributes: runtime.compileAttrs([{name:'href', val: locals.accordionLabelLink}], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n192 = h('a', props, n192Child)
      n189Child.push(n192)
    } else {
      if(locals.accordionLabelSrc) {
        var n193Child = []
        var props = {attributes: runtime.compileAttrs([{name:'src', val: locals.accordionLabelSrc}], [])};
        if (props.attributes.id) props.key = props.attributes.id;
        var n193 = h('img', props, n193Child)
        n189Child.push(n193)
      } else {
        var n194Child = []
        n194Child.push(locals.accordionLabel)
        var props = {attributes: runtime.compileAttrs([], [])};
        if (props.attributes.id) props.key = props.attributes.id;
        var n194 = h('span', props, n194Child)
        n189Child.push(n194)
      }
    }
  }
  var props = {attributes: runtime.compileAttrs([], [])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n189 = h('h3', props, n189Child)
  n187Child.push(n189)
  var props = {attributes: runtime.compileAttrs([{name:'class', val: 'accordion-label'},{name:'for', val: 'accordion-' + locals.$componentID + locals.$id + '-checkbox'}], [])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n187 = h('label', props, n187Child)
  n185Child.push(n187)
  var n195Child = []
  var n196Child = []
  var props = {attributes: runtime.compileAttrs([], [])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n196 = h('content', props, n196Child)
  n195Child.push(n196)
  var props = {attributes: runtime.compileAttrs([{name:'class', val: 'accordion-content'}], [])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n195 = h('div', props, n195Child)
  n185Child.push(n195)
  var props = {attributes: runtime.compileAttrs([{name:'class', val: 'accordion-row'},{name:'class', val: locals.expanderStyle}], [locals.$attributes])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n185 = h('div', props, n185Child)
  n0Child.push(n185)
  return n0Child
}
return render(locals, h);}
},{"pug-vdom/runtime":3}],8:[function(require,module,exports){
module.exports = ".accordion-wrapper .expander, .accordion-wrapper .expander::before, .accordion-wrapper .expander::after {\n    background-color: red;\n}\n.accordion-wrapper .accordion-row {\n    border-color: transparent;\n}\n.accordion-wrapper .accordion-row.plus-minus > .accordion-label .expander {\n    width: 24px;\n}\n.accordion-wrapper .accordion-row.plus-minus > .accordion-label .expander::after {\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n}\n.accordion-wrapper .accordion-row.plus-minus > .accordion-label .expander::before {\n    -webkit-transform: translate(-50%, -50%) rotate(90deg);\n            transform: translate(-50%, -50%) rotate(90deg);\n}\n.accordion-wrapper .accordion-row.plus-minus > .accordion-label .expander::before, .accordion-wrapper .accordion-row.plus-minus > .accordion-label .expander::after {\n    content: '';\n    position: absolute;\n    display: block;\n    width: 24px;\n    height: 2px;\n    opacity: 1;\n    -webkit-transition: opacity 500ms;\n    transition: opacity 500ms;\n}\n.accordion-wrapper .accordion-row.plus-minus > .accordion[type=radio]:checked + .accordion-label .expander,\n                .accordion-wrapper .accordion-row.plus-minus > .accordion[type=radio]:checked + .accordion-label .expander {\n    opacity: 0;\n}\n.accordion-wrapper .accordion-row.plus-minus > .accordion[type=checkbox]:checked  + .accordion-label .expander::before {\n    opacity: 0;\n}\n.accordion-wrapper .accordion-row.hamburger > .accordion-label .expander {\n    margin-left: 7.5px;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n    width: 35px;\n    height: 5px;\n    background-clip: content-box;\n    -webkit-box-sizing: content-box;\n            box-sizing: content-box;\n    padding: 10px 0;\n    -webkit-transition: .1s background-color ease-in-out;\n    transition: .1s background-color ease-in-out;\n}\n.accordion-wrapper .accordion-row.hamburger > .accordion-label .expander::after, .accordion-wrapper .accordion-row.hamburger > .accordion-label .expander::before {\n    content: '';\n    display: block;\n    position: absolute;\n    border-radius: 1px;\n    height: 5px;\n    width: 35px;\n    -webkit-transition: all .1s ease-in-out;\n    transition: all .1s ease-in-out;\n}\n.accordion-wrapper .accordion-row.hamburger > .accordion-label .expander::after {\n    bottom: 0;\n}\n.accordion-wrapper .accordion-row.hamburger > .accordion-label .expander::before {\n    top: 0;\n}\n.accordion-wrapper .accordion-row.hamburger > .accordion:checked  + .accordion-label .expander {\n    background-color: transparent;\n}\n.accordion-wrapper .accordion-row.hamburger > .accordion:checked  + .accordion-label .expander::after {\n    -webkit-transform: rotate(-55deg);\n            transform: rotate(-55deg);\n    bottom: 50%;\n    margin-bottom: -2.5px;\n}\n.accordion-wrapper .accordion-row.hamburger > .accordion:checked  + .accordion-label .expander::before {\n    -webkit-transform: rotate(55deg);\n            transform: rotate(55deg);\n    top: 50%;\n    margin-top: -2.5px;\n}\n.accordion-wrapper .accordion-row.expander-left > .accordion-label {\n    padding: 10px 15px 10px 50px;\n}\n.accordion-wrapper .accordion-row.expander-left > .accordion-label .expander {\n    left: 0;\n    right: auto;\n}\n.accordion-wrapper .accordion-label {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    position: relative;\n    padding: 10px 50px 10px 15px;\n    position: relative;\n    margin-bottom: 5px;\n    -webkit-transition: border-bottom 0s 500ms,\n                    margin-bottom 0s 500ms,\n                    background-color 500ms;\n    transition: border-bottom 0s 500ms,\n                    margin-bottom 0s 500ms,\n                    background-color 500ms;\n    border: 1px solid;\n    border-color: inherit;\n    /* /// Open/Close indicators //// */\n}\n.accordion-wrapper .accordion-label .expander {\n    position: absolute;\n    right: 0;\n    display: block;\n}\n.accordion-wrapper .accordion[type=checkbox] + .accordion-label {\n    cursor: pointer;\n}\n.accordion-wrapper .accordion[type=radio]:not(:checked) + .accordion-label {\n    cursor: pointer;\n}\n.accordion-wrapper .accordion {\n    display: none;\n}\n.accordion-wrapper .accordion + .accordion-content,\n        .accordion-wrapper .accordion + .accordion-label + .accordion-content {\n    overflow: hidden;\n    -webkit-transition: max-height 500ms 0s,\n                        padding-left 0s 500ms,\n                        padding-right 0s 500ms,\n                        padding-top 500ms,\n                        padding-bottom 500ms,\n                        border 0s 500ms,\n                        margin-bottom 0s 500ms,\n                        background-color 500ms;\n    transition: max-height 500ms 0s,\n                        padding-left 0s 500ms,\n                        padding-right 0s 500ms,\n                        padding-top 500ms,\n                        padding-bottom 500ms,\n                        border 0s 500ms,\n                        margin-bottom 0s 500ms,\n                        background-color 500ms;\n}\n.accordion-wrapper .accordion:checked + .accordion-content,\n            .accordion-wrapper .accordion:checked + .accordion-label + .accordion-content {\n    max-height: 1500px;\n    padding-top: 10px;\n    padding-bottom: 10px;\n    padding-left: 30px;\n    padding-right: 15px;\n    -webkit-transition: max-height 500ms 0s,\n                            padding-left 0s,\n                            padding-right 0s,\n                            padding-top 500ms,\n                            padding-bottom 500ms,\n                            background-color 500ms;\n    transition: max-height 500ms 0s,\n                            padding-left 0s,\n                            padding-right 0s,\n                            padding-top 500ms,\n                            padding-bottom 500ms,\n                            background-color 500ms;\n}\n.accordion-wrapper .accordion:checked + .accordion-label {\n    border-bottom: none;\n    margin-bottom: 0;\n    -webkit-transition: margin-bottom 0s;\n    transition: margin-bottom 0s;\n}\n.accordion-wrapper .accordion:checked + .accordion-label + .accordion-content {\n    border: 1px solid;\n    border-color: inherit;\n    border-top: none;\n    margin-bottom: 5px;\n}\n.accordion-wrapper .accordion:not(:checked) + .accordion-content,\n            .accordion-wrapper .accordion:not(:checked) + .accordion-label + .accordion-content {\n    max-height: 0;\n    border: 0px solid transparent;\n    margin-bottom: 0;\n}\n"
},{}],9:[function(require,module,exports){
var findParent = require('find-parent');

module.exports = Component => class Accordion extends Component {
    constructor(opts) {
        super(Object.assign(opts, {
            state: {
                collapseOnClick: true
            },
            inputs: ['accordionName','type', 'collapseOnClick'],
            markupTemplate: require('./index.pug'),
            components: {
                AccordionRow: [require('../accordion-row'), {type: 'type'}]
            }
        }));
    }

    handleClick(evt) {
        if (this.state.collapseOnClick && findParent.byMatcher(evt.target, el => el.tagName === 'A')) {
            var els = evt.currentTarget.querySelectorAll('#accordion-' + this.state.$id + ' > .accordion-row > input.accordion[type="checkbox"]');
            Array.from(els).forEach(el => {
                el.checked = false;
            });
        }
    }

    static get styles() {
        return require('./index.css');
    }

    onInit(){
    }
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
  var n71Child = []
  var n72Child = []
  var props = {attributes: runtime.compileAttrs([], [])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n72 = h('content', props, n72Child)
  n71Child.push(n72)
  var props = {attributes: runtime.compileAttrs([{name:'class', val: 'accordion-wrapper'},{name:'id', val: "accordion-"+locals.$id},{name:'onclick', val: $bind("this.handleClick(event)")}], [locals.$attributes])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n71 = h('div', props, n71Child)
  n0Child.push(n71)
  return n0Child
}
return render(locals, h);}
},{"pug-vdom/runtime":3}],11:[function(require,module,exports){
var MenuItemComponentFactory = require('./menu-item');

module.exports = Component => class DropdownItemComponent extends MenuItemComponentFactory(Component) {
    constructor(opts) {
        super(Object.assign({
            state: {},
            markupTemplate: require('./templates/dropdown-item.pug'),
            components: {
                Menu: require('./menu')
            }
        }, opts));
    }

    static get styles() {
        return require('./styles/dropdown-item.css');
    }
};

},{"./menu":13,"./menu-item":12,"./styles/dropdown-item.css":14,"./templates/dropdown-item.pug":17}],12:[function(require,module,exports){
module.exports = Component => class MenuItemComponent extends Component {
    constructor(opts) {
        super(Object.assign({
            state: {},
            inputs: ['src', 'href', 'content', 'target'], //TODO add support for svg sprite handle
            markupTemplate: require('./templates/menu-item.pug')
        }, opts));
    }

    static get styles() {
        return require('./styles/menu-item.css');
    }
};

},{"./styles/menu-item.css":15,"./templates/menu-item.pug":18}],13:[function(require,module,exports){
module.exports = Component => class MenuComponent extends Component {
    constructor(opts) {
        super(Object.assign(opts, {
            state: {},
            inputs: ['listItems'],
            markupTemplate: require('./templates/menu.pug'),
            components: {
                MenuItem: require('./menu-item'),
                DropdownItem: require('./dropdown-item')
            }
        }));
    }

    static get styles() {
        return require('./styles/menu.css');
    }
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
  var n112Child = []
  if(locals.href && locals.src) {
    var n113Child = []
    var n114Child = []
    var props = {attributes: runtime.compileAttrs([{name:'src', val: locals.src}], [])};
    if (props.attributes.id) props.key = props.attributes.id;
    var n114 = h('img', props, n114Child)
    n113Child.push(n114)
    var props = {attributes: runtime.compileAttrs([{name:'href', val: locals.href},{name:'target', val: locals.target}], [])};
    if (props.attributes.id) props.key = props.attributes.id;
    var n113 = h('a', props, n113Child)
    n112Child.push(n113)
  } else {
    if(locals.href && locals.svghref) {
      var n115Child = []
      var n116Child = []
      var n117Child = []
      var props = {attributes: runtime.compileAttrs([{name:'xlink:href', val: locals.svghref}], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n117 = h('use', props, n117Child)
      n116Child.push(n117)
      var props = {attributes: runtime.compileAttrs([], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n116 = h('svg', props, n116Child)
      n115Child.push(n116)
      var props = {attributes: runtime.compileAttrs([{name:'href', val: locals.href}], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n115 = h('a', props, n115Child)
      n112Child.push(n115)
    } else {
      if(locals.href) {
        var n118Child = []
        n118Child.push(locals.content)
        var props = {attributes: runtime.compileAttrs([{name:'href', val: locals.href},{name:'target', val: locals.target}], [])};
        if (props.attributes.id) props.key = props.attributes.id;
        var n118 = h('a', props, n118Child)
        n112Child.push(n118)
      } else {
        if(locals.src) {
          var n119Child = []
          var props = {attributes: runtime.compileAttrs([{name:'src', val: locals.src}], [])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n119 = h('img', props, n119Child)
          n112Child.push(n119)
        } else {
          if(locals.svghref) {
            var n120Child = []
            var n121Child = []
            var props = {attributes: runtime.compileAttrs([{name:'xlink:href', val: locals.svghref}], [])};
            if (props.attributes.id) props.key = props.attributes.id;
            var n121 = h('use', props, n121Child)
            n120Child.push(n121)
            var props = {attributes: runtime.compileAttrs([], [])};
            if (props.attributes.id) props.key = props.attributes.id;
            var n120 = h('svg', props, n120Child)
            n112Child.push(n120)
          } else {
            var n122Child = []
            n122Child.push(locals.content)
            var props = {attributes: runtime.compileAttrs([], [])};
            if (props.attributes.id) props.key = props.attributes.id;
            var n122 = h('span', props, n122Child)
            n112Child.push(n122)
          }
        }
      }
    }
  }
  var n123Child = []
  var n124Child = []
  var props = {attributes: runtime.compileAttrs([], [])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n124 = h('content', props, n124Child)
  n123Child.push(n124)
  var props = {attributes: runtime.compileAttrs([], [locals.$attributes])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n123 = h('Menu', props, n123Child)
  n112Child.push(n123)
  var props = {attributes: runtime.compileAttrs([{name:'class', val: 'menu-item'}], [locals.$attributes, additionalAttributes])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n112 = h('li', props, n112Child)
  n0Child.push(n112)
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
  var n101Child = []
  if(locals.href && locals.src) {
    var n102Child = []
    var n103Child = []
    var props = {attributes: runtime.compileAttrs([{name:'src', val: locals.src}], [])};
    if (props.attributes.id) props.key = props.attributes.id;
    var n103 = h('img', props, n103Child)
    n102Child.push(n103)
    var props = {attributes: runtime.compileAttrs([{name:'href', val: locals.href},{name:'target', val: locals.target}], [])};
    if (props.attributes.id) props.key = props.attributes.id;
    var n102 = h('a', props, n102Child)
    n101Child.push(n102)
  } else {
    if(locals.href && locals.svghref) {
      var n104Child = []
      var n105Child = []
      var n106Child = []
      var props = {attributes: runtime.compileAttrs([{name:'xlink:href', val: locals.svghref}], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n106 = h('use', props, n106Child)
      n105Child.push(n106)
      var props = {attributes: runtime.compileAttrs([], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n105 = h('svg', props, n105Child)
      n104Child.push(n105)
      var props = {attributes: runtime.compileAttrs([{name:'href', val: locals.href}], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n104 = h('a', props, n104Child)
      n101Child.push(n104)
    } else {
      if(locals.href) {
        var n107Child = []
        n107Child.push(locals.content)
        var props = {attributes: runtime.compileAttrs([{name:'href', val: locals.href},{name:'target', val: locals.target}], [])};
        if (props.attributes.id) props.key = props.attributes.id;
        var n107 = h('a', props, n107Child)
        n101Child.push(n107)
      } else {
        if(locals.src) {
          var n108Child = []
          var props = {attributes: runtime.compileAttrs([{name:'src', val: locals.src}], [])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n108 = h('img', props, n108Child)
          n101Child.push(n108)
        } else {
          if(locals.svghref) {
            var n109Child = []
            var n110Child = []
            var props = {attributes: runtime.compileAttrs([{name:'xlink:href', val: locals.svghref}], [])};
            if (props.attributes.id) props.key = props.attributes.id;
            var n110 = h('use', props, n110Child)
            n109Child.push(n110)
            var props = {attributes: runtime.compileAttrs([], [])};
            if (props.attributes.id) props.key = props.attributes.id;
            var n109 = h('svg', props, n109Child)
            n101Child.push(n109)
          } else {
            var n111Child = []
            n111Child.push(locals.content)
            var props = {attributes: runtime.compileAttrs([], [])};
            if (props.attributes.id) props.key = props.attributes.id;
            var n111 = h('span', props, n111Child)
            n101Child.push(n111)
          }
        }
      }
    }
  }
  var props = {attributes: runtime.compileAttrs([{name:'class', val: 'menu-item'}], [locals.$attributes, additionalAttributes])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n101 = h('li', props, n101Child)
  n0Child.push(n101)
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
  var n63Child = []
  var n64Child = []
  var props = {attributes: runtime.compileAttrs([], [])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n64 = h('content', props, n64Child)
  n63Child.push(n64)
  var props = {attributes: runtime.compileAttrs([{name:'class', val: 'menu'}], [locals.$attributes])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n63 = h('ul', props, n63Child)
  n0Child.push(n63)
  return n0Child
}
return render(locals, h);}
},{"pug-vdom/runtime":3}],20:[function(require,module,exports){
module.exports = ".responsive-dropdown.list {\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n}\n.responsive-dropdown.list.horizontal {\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n}\n"
},{}],21:[function(require,module,exports){
var debounce = require('debounce');

module.exports = Component => class ResponsiveDropdown extends Component {
    constructor(opts) {
        super(Object.assign(opts, {
            state: Object.assign(opts.state || {}, {
                breakpoint: 640,
                isMobile: false,
                isLoading: false,
                mobileType: 'accordion'
            }),
            store: Object.assign(opts.store, {
            }),
            markupTemplate: require('./index.pug'),
            inputs: ['breakpoint', 'content', 'href', 'src', 'mobileType', 'SVGID'],
            components: {
                MenuItem: require('weddell-menu-component/src/menu-item'),
                Menu: require('weddell-menu-component/'),
                Accordion: require('weddell-accordion-component')
            }
        }))
    }

    static get styles() {
        return (super.styles || '') + require('./index.css');
    }

    onMount() {
        this.onResize = this.checkViewport.bind(this)
        window.addEventListener('resize', this.onResize);
        this.checkViewport();
    }

    onUnmount() {
        window.removeEventListener('resize', this.onResize);
        this.onResize = null;
    }

    onInit() {
        this.state.watch('isMobile', isMobile => {
            this.state.isLoading = true;
            this.awaitRender()
                .then(() => {
                    this.state.isLoading = false;
                })
        })
    }

    checkViewport() {
        this.state.isMobile = window.innerWidth < Number(this.state.breakpoint);
    }
}

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
    var n37Child = []
    var props = {attributes: runtime.compileAttrs([{name:'class', val: 'loading'}], [])};
    if (props.attributes.id) props.key = props.attributes.id;
    var n37 = h('div', props, n37Child)
    n0Child.push(n37)
  } else {
    if(locals.isMobile) {
      switch(locals.mobileType) {
        case 'accordion':
          var n38Child = []
          var n39Child = []
          var n40Child = []
          var props = {attributes: runtime.compileAttrs([], [])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n40 = h('content', props, n40Child)
          n39Child.push(n40)
          var props = {attributes: runtime.compileAttrs([], [])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n39 = h('ul', props, n39Child)
          n38Child.push(n39)
          var props = {attributes: runtime.compileAttrs([{name:'class', val: 'responsive-dropdown'},{name:'accordionLabel', val: locals.content},{name:'accordionLabelLink', val: locals.href},{name:'accordionLabelSrc', val: locals.src},{name:'accordionLabelSVGID', val: locals.SVGID}], [locals.$attributes])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n38 = h('AccordionRow', props, n38Child)
          n0Child.push(n38)
          break;
        case 'list':
          var n41Child = []
          var n42Child = []
          var props = {attributes: runtime.compileAttrs([], [])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n42 = h('content', props, n42Child)
          n41Child.push(n42)
          var props = {attributes: runtime.compileAttrs([{name:'class', val: 'list'},{name:'class', val: 'responsive-dropdown'},{name:'class', val: 'mobile'}], [locals.$attributes])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n41 = h('Menu', props, n41Child)
          n0Child.push(n41)
          break;
      }
    } else {
      var n43Child = []
      var n44Child = []
      var props = {attributes: runtime.compileAttrs([], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n44 = h('content', props, n44Child)
      n43Child.push(n44)
      var props = {attributes: runtime.compileAttrs([{name:'class', val: 'responsive-dropdown'},{name:'content', val: locals.content},{name:'href', val: locals.href},{name:'src', val: locals.src},{name:'SVGID', val: locals.SVGID}], [locals.$attributes])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n43 = h('DropdownItem', props, n43Child)
      n0Child.push(n43)
    }
  }
  return n0Child
}
return render(locals, h);}
},{"pug-vdom/runtime":3}],23:[function(require,module,exports){
module.exports = ".responsive-menu {\n}\n"
},{}],24:[function(require,module,exports){
var debounce = require('debounce');

module.exports = Component => class ResponsiveMenu extends Component {
    constructor(opts) {
        super(Object.assign(opts, {
            state: Object.assign(opts.state || {}, {
                breakpoint: 640,
                isMobile: false,
                isLoading: false,
                mobileType: 'accordion'
            }),
            store: Object.assign(opts.store, {
            }),
            markupTemplate: require('./index.pug'),
            inputs: ['breakpoint', 'mobileType'],
            components: {
                Menu: require('weddell-menu-component'),
                Accordion: require('weddell-accordion-component'),
                ResponsiveDropdown: [require('./components/responsive-dropdown'), {breakpoint: 'breakpoint', mobileType: 'mobileType'}]
            }
        }))
    }

    static get styles() {
        return (super.styles || '') + require('./index.css');
    }

    onInit() {
        this.state.watch('isMobile', isMobile => {
            this.state.isLoading = true;
            this.awaitRender()
                .then(() => {
                    this.state.isLoading = false;
                })
        })        
    }

    onMount() {
        this.onResize = this.checkViewport.bind(this);
        window.addEventListener('resize', this.onResize);
        this.checkViewport();
    }

    onUnmount() {
        window.removeEventListener('resize', this.onResize);
        this.onResize = null;
    }

    checkViewport() {
        this.state.isMobile = window.innerWidth < Number(this.state.breakpoint);
    }
}

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
    var n8Child = []
    var props = {attributes: runtime.compileAttrs([{name:'class', val: 'loading'}], [])};
    if (props.attributes.id) props.key = props.attributes.id;
    var n8 = h('div', props, n8Child)
    n0Child.push(n8)
  } else {
    if(locals.isMobile) {
      switch(locals.mobileType) {
        case 'accordion':
          var n9Child = []
          var n10Child = []
          var props = {attributes: runtime.compileAttrs([], [])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n10 = h('content', props, n10Child)
          n9Child.push(n10)
          var props = {attributes: runtime.compileAttrs([{name:'class', val: 'responsive-menu'},{name:'class', val: 'mobile'}], [locals.$attributes])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n9 = h('Accordion', props, n9Child)
          n0Child.push(n9)
          break;
        case 'list':
          var n11Child = []
          var n12Child = []
          var props = {attributes: runtime.compileAttrs([], [])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n12 = h('content', props, n12Child)
          n11Child.push(n12)
          var props = {attributes: runtime.compileAttrs([{name:'class', val: 'responsive-menu'},{name:'class', val: 'mobile'}], [locals.$attributes])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n11 = h('Menu', props, n11Child)
          n0Child.push(n11)
          break;
      }
    } else {
      var n13Child = []
      var n14Child = []
      var props = {attributes: runtime.compileAttrs([], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n14 = h('content', props, n14Child)
      n13Child.push(n14)
      var props = {attributes: runtime.compileAttrs([{name:'class', val: 'responsive-menu'}], [locals.$attributes])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n13 = h('Menu', props, n13Child)
      n0Child.push(n13)
    }
  }
  return n0Child
}
return render(locals, h);}
},{"pug-vdom/runtime":3}]},{},[24])(24)
});