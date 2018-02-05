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
  var n88Child = []
  if(locals.href && locals.src) {
    var n89Child = []
    var n90Child = []
    var props = {attributes: runtime.compileAttrs([{name:'src', val: locals.src}], [])};
    if (props.attributes.id) props.key = props.attributes.id;
    var n90 = h('img', props, n90Child)
    n89Child.push(n90)
    var props = {attributes: runtime.compileAttrs([{name:'href', val: locals.href},{name:'target', val: locals.target}], [])};
    if (props.attributes.id) props.key = props.attributes.id;
    var n89 = h('a', props, n89Child)
    n88Child.push(n89)
  } else {
    if(locals.href && locals.svghref) {
      var n91Child = []
      var n92Child = []
      var n93Child = []
      var props = {attributes: runtime.compileAttrs([{name:'xlink:href', val: locals.svghref}], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n93 = h('use', props, n93Child)
      n92Child.push(n93)
      var props = {attributes: runtime.compileAttrs([], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n92 = h('svg', props, n92Child)
      n91Child.push(n92)
      var props = {attributes: runtime.compileAttrs([{name:'href', val: locals.href}], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n91 = h('a', props, n91Child)
      n88Child.push(n91)
    } else {
      if(locals.href) {
        var n94Child = []
        n94Child.push(locals.content)
        var props = {attributes: runtime.compileAttrs([{name:'href', val: locals.href},{name:'target', val: locals.target}], [])};
        if (props.attributes.id) props.key = props.attributes.id;
        var n94 = h('a', props, n94Child)
        n88Child.push(n94)
      } else {
        if(locals.src) {
          var n95Child = []
          var props = {attributes: runtime.compileAttrs([{name:'src', val: locals.src}], [])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n95 = h('img', props, n95Child)
          n88Child.push(n95)
        } else {
          if(locals.svghref) {
            var n96Child = []
            var n97Child = []
            var props = {attributes: runtime.compileAttrs([{name:'xlink:href', val: locals.svghref}], [])};
            if (props.attributes.id) props.key = props.attributes.id;
            var n97 = h('use', props, n97Child)
            n96Child.push(n97)
            var props = {attributes: runtime.compileAttrs([], [])};
            if (props.attributes.id) props.key = props.attributes.id;
            var n96 = h('svg', props, n96Child)
            n88Child.push(n96)
          } else {
            var n98Child = []
            n98Child.push(locals.content)
            var props = {attributes: runtime.compileAttrs([], [])};
            if (props.attributes.id) props.key = props.attributes.id;
            var n98 = h('span', props, n98Child)
            n88Child.push(n98)
          }
        }
      }
    }
  }
  var n99Child = []
  var n100Child = []
  var props = {attributes: runtime.compileAttrs([], [])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n100 = h('content', props, n100Child)
  n99Child.push(n100)
  var props = {attributes: runtime.compileAttrs([], [locals.$attributes])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n99 = h('Menu', props, n99Child)
  n88Child.push(n99)
  var props = {attributes: runtime.compileAttrs([{name:'class', val: 'menu-item'}], [locals.$attributes, additionalAttributes])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n88 = h('li', props, n88Child)
  n0Child.push(n88)
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
  var n77Child = []
  if(locals.href && locals.src) {
    var n78Child = []
    var n79Child = []
    var props = {attributes: runtime.compileAttrs([{name:'src', val: locals.src}], [])};
    if (props.attributes.id) props.key = props.attributes.id;
    var n79 = h('img', props, n79Child)
    n78Child.push(n79)
    var props = {attributes: runtime.compileAttrs([{name:'href', val: locals.href},{name:'target', val: locals.target}], [])};
    if (props.attributes.id) props.key = props.attributes.id;
    var n78 = h('a', props, n78Child)
    n77Child.push(n78)
  } else {
    if(locals.href && locals.svghref) {
      var n80Child = []
      var n81Child = []
      var n82Child = []
      var props = {attributes: runtime.compileAttrs([{name:'xlink:href', val: locals.svghref}], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n82 = h('use', props, n82Child)
      n81Child.push(n82)
      var props = {attributes: runtime.compileAttrs([], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n81 = h('svg', props, n81Child)
      n80Child.push(n81)
      var props = {attributes: runtime.compileAttrs([{name:'href', val: locals.href}], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n80 = h('a', props, n80Child)
      n77Child.push(n80)
    } else {
      if(locals.href) {
        var n83Child = []
        n83Child.push(locals.content)
        var props = {attributes: runtime.compileAttrs([{name:'href', val: locals.href},{name:'target', val: locals.target}], [])};
        if (props.attributes.id) props.key = props.attributes.id;
        var n83 = h('a', props, n83Child)
        n77Child.push(n83)
      } else {
        if(locals.src) {
          var n84Child = []
          var props = {attributes: runtime.compileAttrs([{name:'src', val: locals.src}], [])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n84 = h('img', props, n84Child)
          n77Child.push(n84)
        } else {
          if(locals.svghref) {
            var n85Child = []
            var n86Child = []
            var props = {attributes: runtime.compileAttrs([{name:'xlink:href', val: locals.svghref}], [])};
            if (props.attributes.id) props.key = props.attributes.id;
            var n86 = h('use', props, n86Child)
            n85Child.push(n86)
            var props = {attributes: runtime.compileAttrs([], [])};
            if (props.attributes.id) props.key = props.attributes.id;
            var n85 = h('svg', props, n85Child)
            n77Child.push(n85)
          } else {
            var n87Child = []
            n87Child.push(locals.content)
            var props = {attributes: runtime.compileAttrs([], [])};
            if (props.attributes.id) props.key = props.attributes.id;
            var n87 = h('span', props, n87Child)
            n77Child.push(n87)
          }
        }
      }
    }
  }
  var props = {attributes: runtime.compileAttrs([{name:'class', val: 'menu-item'}], [locals.$attributes, additionalAttributes])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n77 = h('li', props, n77Child)
  n0Child.push(n77)
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
  var n61Child = []
  var n62Child = []
  var props = {attributes: runtime.compileAttrs([], [])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n62 = h('content', props, n62Child)
  n61Child.push(n62)
  var props = {attributes: runtime.compileAttrs([{name:'class', val: 'menu'}], [locals.$attributes])};
  if (props.attributes.id) props.key = props.attributes.id;
  var n61 = h('ul', props, n61Child)
  n0Child.push(n61)
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
    var n29Child = []
    var props = {attributes: runtime.compileAttrs([{name:'class', val: 'loading'}], [])};
    if (props.attributes.id) props.key = props.attributes.id;
    var n29 = h('div', props, n29Child)
    n0Child.push(n29)
  } else {
    if(locals.isMobile) {
      switch(locals.mobileType) {
        case 'accordion':
          var n30Child = []
          var n31Child = []
          var n32Child = []
          var props = {attributes: runtime.compileAttrs([], [])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n32 = h('content', props, n32Child)
          n31Child.push(n32)
          var props = {attributes: runtime.compileAttrs([], [])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n31 = h('ul', props, n31Child)
          n30Child.push(n31)
          var props = {attributes: runtime.compileAttrs([{name:'class', val: 'responsive-dropdown'},{name:'accordionLabel', val: locals.content},{name:'accordionLabelLink', val: locals.href},{name:'accordionLabelSrc', val: locals.src},{name:'accordionLabelSVGID', val: locals.SVGID}], [locals.$attributes])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n30 = h('AccordionRow', props, n30Child)
          n0Child.push(n30)
          break;
        case 'list':
          var n33Child = []
          var n34Child = []
          var props = {attributes: runtime.compileAttrs([], [])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n34 = h('content', props, n34Child)
          n33Child.push(n34)
          var props = {attributes: runtime.compileAttrs([{name:'class', val: 'list'},{name:'class', val: 'responsive-dropdown'},{name:'class', val: 'mobile'}], [locals.$attributes])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n33 = h('Menu', props, n33Child)
          n0Child.push(n33)
          break;
      }
    } else {
      var n35Child = []
      var n36Child = []
      var props = {attributes: runtime.compileAttrs([], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n36 = h('content', props, n36Child)
      n35Child.push(n36)
      var props = {attributes: runtime.compileAttrs([{name:'class', val: 'responsive-dropdown'},{name:'content', val: locals.content},{name:'href', val: locals.href},{name:'src', val: locals.src},{name:'SVGID', val: locals.SVGID}], [locals.$attributes])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n35 = h('DropdownItem', props, n35Child)
      n0Child.push(n35)
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
    var n1Child = []
    var props = {attributes: runtime.compileAttrs([{name:'class', val: 'loading'}], [])};
    if (props.attributes.id) props.key = props.attributes.id;
    var n1 = h('div', props, n1Child)
    n0Child.push(n1)
  } else {
    if(locals.isMobile) {
      switch(locals.mobileType) {
        case 'accordion':
          var n2Child = []
          var n3Child = []
          var props = {attributes: runtime.compileAttrs([], [])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n3 = h('content', props, n3Child)
          n2Child.push(n3)
          var props = {attributes: runtime.compileAttrs([{name:'class', val: 'responsive-menu'},{name:'class', val: 'mobile'}], [locals.$attributes])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n2 = h('Accordion', props, n2Child)
          n0Child.push(n2)
          break;
        case 'list':
          var n4Child = []
          var n5Child = []
          var props = {attributes: runtime.compileAttrs([], [])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n5 = h('content', props, n5Child)
          n4Child.push(n5)
          var props = {attributes: runtime.compileAttrs([{name:'class', val: 'responsive-menu'},{name:'class', val: 'mobile'}], [locals.$attributes])};
          if (props.attributes.id) props.key = props.attributes.id;
          var n4 = h('Menu', props, n4Child)
          n0Child.push(n4)
          break;
      }
    } else {
      var n6Child = []
      var n7Child = []
      var props = {attributes: runtime.compileAttrs([], [])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n7 = h('content', props, n7Child)
      n6Child.push(n7)
      var props = {attributes: runtime.compileAttrs([{name:'class', val: 'responsive-menu'}], [locals.$attributes])};
      if (props.attributes.id) props.key = props.attributes.id;
      var n6 = h('Menu', props, n6Child)
      n0Child.push(n6)
    }
  }
  return n0Child
}
return render(locals, h);}
},{"pug-vdom/runtime":3}]},{},[24])(24)
});