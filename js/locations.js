// JavaScript Document

if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}

if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback/*, thisArg*/) {

    var T, k;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    // 1. Let O be the result of calling toObject() passing the
    // |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get() internal
    // method of O with the argument "length".
    // 3. Let len be toUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If isCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let
    // T be undefined.
    if (arguments.length > 1) {
      T = arguments[1];
    }

    // 6. Let k be 0.
    k = 0;

    // 7. Repeat while k < len.
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //    This is implicit for LHS operands of the in operator.
      // b. Let kPresent be the result of calling the HasProperty
      //    internal method of O with argument Pk.
      //    This step can be combined with c.
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal
        // method of O with argument Pk.
        kValue = O[k];

        // ii. Call the Call internal method of callback with T as
        // the this value and argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined.
  };
}

function toArray(obj) {
  var array = [];
  // iterate backwards ensuring that length is an UInt32
  for (var i = obj.length >>> 0; i--;) {
    array[i] = obj[i];
  }
  return array;
}

function addClass (object, className) {
  object.classList ? object.classList.add(className) : object.className += ' ' + className;
}

function removeAllClassesButFirst (component, skipClass) {
  var classList = component.classList;
  var componentClass = classList.item(0);
  var toRemove = [];
  var beforeComponent = true;
  toArray(classList).forEach(function(className) {
    beforeComponent = beforeComponent && className != 'component'
    if (className != skipClass && className != componentClass && className != 'component' && !beforeComponent) {
      toRemove.push(className);
    }
  });
  toRemove.forEach(function(className) {
    classList.remove(className);
  });
}

function applyState (component, stateClass) {
  var componentClass = component.classList.item(0);
  component.className = componentClass;
  component.classList.add(stateClass);
}

function isCurrentState (component, state) {
  var classList = component.classList;
  var rv = false;
  toArray(classList).forEach(function (className) {
    if (className.endsWith(state)) {
      rv = true;
    }
  })
  return rv;
}

function whichTransitionEvent(){
  var t,
      el = document.createElement("fakeelement");

  var transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  }

  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}


var transitionEvent = whichTransitionEvent();

// Javascript for component CastleFill
// Longest animation for Transition 1 is this;group;castleHomeFill
// Transition 1: From state2 to state1

function mouseleaveCastleFill1Handler(event) {
  var component = document.querySelector('.castlefill');
  if (isCurrentState(component, 'state2')) {
    try {
    //  console.log('Listener for event: mouseleave triggered. State: state2');
      setTimeout(function() {
        var component = document.querySelector('.castlefill');
        component.addEventListener(transitionEvent, transitionCastleFillstate2tostate1EndedHandler);
        removeAllClassesButFirst(component, 'state2-to-state1');
        addClass(component, 'state1');
        addClass(component, 'state2-to-state1');
      }, 0);
    }
    catch (e) {
      console.log(e)
    }
  }
}

function transitionCastleFillstate2tostate1EndedHandler(event) {
  
  if (event.target.className.trim() == 'castlehomefill' ||
      event.target.className.startsWith('castlehomefill ')) {
    var component = document.querySelector('.castlefill');
    component.removeEventListener(transitionEvent, transitionCastleFillstate2tostate1EndedHandler);
    //console.log('transitionCastleFillstate2tostate1EndedHandler()');
    // mouseenter
  }
}



// Transition CastleFill state2-to-state1 Event Listeners
    // mouseleave state2 state1
child = document.querySelector('.castlefill .group');
if (child) {
  child.addEventListener('mouseleave', mouseleaveCastleFill1Handler);
}
else {
  console.log('Could not find element at: .castlefill .group');
}

// Javascript for component CastleFill
// Longest animation for Transition 2 is this;group;hOME
// Transition 2: From state1 to state2

function mouseenterCastleFill2Handler(event) {
  var component = document.querySelector('.castlefill');
  if (isCurrentState(component, 'state1')) {
    try {
    //  console.log('Listener for event: mouseenter triggered. State: state1');
      setTimeout(function() {
        var component = document.querySelector('.castlefill');
        component.addEventListener(transitionEvent, transitionCastleFillstate1tostate2EndedHandler);
        removeAllClassesButFirst(component, 'state1-to-state2');
        addClass(component, 'state2');
        addClass(component, 'state1-to-state2');
      }, 0);
    }
    catch (e) {
      console.log(e)
    }
  }
}

function transitionCastleFillstate1tostate2EndedHandler(event) {
  
  if (event.target.className.trim() == 'home' ||
      event.target.className.startsWith('home ')) {
    var component = document.querySelector('.castlefill');
    component.removeEventListener(transitionEvent, transitionCastleFillstate1tostate2EndedHandler);
    //console.log('transitionCastleFillstate1tostate2EndedHandler()');
    // mouseleave
  }
}



// Transition CastleFill state1-to-state2 Event Listeners
    // mouseenter state1 state1
child = document.querySelector('.castlefill .group');
if (child) {
  child.addEventListener('mouseenter', mouseenterCastleFill2Handler);
}
else {
  console.log('Could not find element at: .castlefill .group');
}

function resetCastleFill() {
    //console.log('reset');
    var component = document.querySelector('.castlefill');
    if (!component) { return; }
    component.addEventListener(transitionEvent, transitionCastleFillstate1tostate2EndedHandler);

    removeAllClassesButFirst(component, 'state1-to-state2');
    addClass(component, 'state2');
    addClass(component, 'state1-to-state2');
}




if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}

if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback/*, thisArg*/) {

    var T, k;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    // 1. Let O be the result of calling toObject() passing the
    // |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get() internal
    // method of O with the argument "length".
    // 3. Let len be toUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If isCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let
    // T be undefined.
    if (arguments.length > 1) {
      T = arguments[1];
    }

    // 6. Let k be 0.
    k = 0;

    // 7. Repeat while k < len.
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //    This is implicit for LHS operands of the in operator.
      // b. Let kPresent be the result of calling the HasProperty
      //    internal method of O with argument Pk.
      //    This step can be combined with c.
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal
        // method of O with argument Pk.
        kValue = O[k];

        // ii. Call the Call internal method of callback with T as
        // the this value and argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined.
  };
}

function toArray(obj) {
  var array = [];
  // iterate backwards ensuring that length is an UInt32
  for (var i = obj.length >>> 0; i--;) {
    array[i] = obj[i];
  }
  return array;
}

function addClass (object, className) {
  object.classList ? object.classList.add(className) : object.className += ' ' + className;
}

function removeAllClassesButFirst (component, skipClass) {
  var classList = component.classList;
  var componentClass = classList.item(0);
  var toRemove = [];
  var beforeComponent = true;
  toArray(classList).forEach(function(className) {
    beforeComponent = beforeComponent && className != 'component'
    if (className != skipClass && className != componentClass && className != 'component' && !beforeComponent) {
      toRemove.push(className);
    }
  });
  toRemove.forEach(function(className) {
    classList.remove(className);
  });
}

function applyState (component, stateClass) {
  var componentClass = component.classList.item(0);
  component.className = componentClass;
  component.classList.add(stateClass);
}

function isCurrentState (component, state) {
  var classList = component.classList;
  var rv = false;
  toArray(classList).forEach(function (className) {
    if (className.endsWith(state)) {
      rv = true;
    }
  })
  return rv;
}

function whichTransitionEvent(){
  var t,
      el = document.createElement("fakeelement");

  var transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  }

  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}


var transitionEvent = whichTransitionEvent();

// Javascript for component blackCelticArrow
// Longest animation for Transition 1 is this;group;combinedShape1
// Transition 1: From state1 to state2

function mouseenterblackCelticArrow1Handler(event) {
  var component = document.querySelector('.blackcelticarrow');
  if (isCurrentState(component, 'state1')) {
    try {
    //  console.log('Listener for event: mouseenter triggered. State: state1');
      setTimeout(function() {
        var component = document.querySelector('.blackcelticarrow');
        component.addEventListener(transitionEvent, transitionblackCelticArrowstate1tostate2EndedHandler);
        removeAllClassesButFirst(component, 'state1-to-state2');
        addClass(component, 'state2');
        addClass(component, 'state1-to-state2');
      }, 0);
    }
    catch (e) {
      console.log(e)
    }
  }
}

function transitionblackCelticArrowstate1tostate2EndedHandler(event) {
  
  if (event.target.className.trim() == 'combinedshape1' ||
      event.target.className.startsWith('combinedshape1 ')) {
    var component = document.querySelector('.blackcelticarrow');
    component.removeEventListener(transitionEvent, transitionblackCelticArrowstate1tostate2EndedHandler);
    //console.log('transitionblackCelticArrowstate1tostate2EndedHandler()');
    // mouseleave
  }
}



// Transition blackCelticArrow state1-to-state2 Event Listeners
    // mouseenter state1 state1
child = document.querySelector('.blackcelticarrow .group');
if (child) {
  child.addEventListener('mouseenter', mouseenterblackCelticArrow1Handler);
}
else {
  console.log('Could not find element at: .blackcelticarrow .group');
}

function resetblackCelticArrow() {
    //console.log('reset');
    var component = document.querySelector('.blackcelticarrow');
    if (!component) { return; }
    component.addEventListener(transitionEvent, transitionblackCelticArrowstate1tostate2EndedHandler);

    removeAllClassesButFirst(component, 'state1-to-state2');
    addClass(component, 'state2');
    addClass(component, 'state1-to-state2');
}



// Javascript for component blackCelticArrow
// Longest animation for Transition 2 is this;group;combinedShape2
// Transition 2: From state2 to state1

function mouseleaveblackCelticArrow2Handler(event) {
  var component = document.querySelector('.blackcelticarrow');
  if (isCurrentState(component, 'state2')) {
    try {
    //  console.log('Listener for event: mouseleave triggered. State: state2');
      setTimeout(function() {
        var component = document.querySelector('.blackcelticarrow');
        component.addEventListener(transitionEvent, transitionblackCelticArrowstate2tostate1EndedHandler);
        removeAllClassesButFirst(component, 'state2-to-state1');
        addClass(component, 'state1');
        addClass(component, 'state2-to-state1');
      }, 0);
    }
    catch (e) {
      console.log(e)
    }
  }
}

function transitionblackCelticArrowstate2tostate1EndedHandler(event) {
  
  if (event.target.className.trim() == 'combinedshape2' ||
      event.target.className.startsWith('combinedshape2 ')) {
    var component = document.querySelector('.blackcelticarrow');
    component.removeEventListener(transitionEvent, transitionblackCelticArrowstate2tostate1EndedHandler);
    //console.log('transitionblackCelticArrowstate2tostate1EndedHandler()');
    // mouseenter
  }
}



// Transition blackCelticArrow state2-to-state1 Event Listeners
    // mouseleave state2 state1
child = document.querySelector('.blackcelticarrow .group');
if (child) {
  child.addEventListener('mouseleave', mouseleaveblackCelticArrow2Handler);
}
else {
  console.log('Could not find element at: .blackcelticarrow .group');
}



