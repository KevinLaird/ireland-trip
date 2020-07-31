// JavaScript Document

var scrollLink = $('.scroll');
	
	
	scrollLink.click(function(e) {
    e.preventDefault();
    $('body,html').animate({
    scrollTop: $(this.hash).offset().top
    }, 1000 );
  });

$(window).scroll(function(){
	var scrollbarLocation = $(this).scrollTop();
	
		scrollLink.each(function(){
			var sectionOffset = $(this.hash).offset().top;
			if(sectionOffset <= scrollbarLocation){
				$(this).parent().addClass('active');
				$(this).parent().siblings().removeClass('active');
				
			}
		});
	});








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

// Javascript for component Celtic Arrow
// Longest animation for Transition 1 is this;group;down
// Transition 1: From state1 to state2

function mouseenterCelticArrow1Handler(event) {
  var component = document.querySelector('.celtic-arrow');
  if (isCurrentState(component, 'state1')) {
    try {
    //  console.log('Listener for event: mouseenter triggered. State: state1');
      setTimeout(function() {
        var component = document.querySelector('.celtic-arrow');
        component.addEventListener(transitionEvent, transitionCelticArrowstate1tostate2EndedHandler);
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

function transitionCelticArrowstate1tostate2EndedHandler(event) {
  
  if (event.target.className.trim() == 'down' ||
      event.target.className.startsWith('down ')) {
    var component = document.querySelector('.celtic-arrow');
    component.removeEventListener(transitionEvent, transitionCelticArrowstate1tostate2EndedHandler);
    //console.log('transitionCelticArrowstate1tostate2EndedHandler()');
    // click
    // mouseleave
  }
}



// Transition CelticArrow state1-to-state2 Event Listeners
    // mouseenter state1 state1
child = document.querySelector('.celtic-arrow .group');
if (child) {
  child.addEventListener('mouseenter', mouseenterCelticArrow1Handler);
}
else {
  console.log('Could not find element at: .celtic-arrow .group');
}

function resetCelticArrow() {
    //console.log('reset');
    var component = document.querySelector('.celtic-arrow');
    if (!component) { return; }
    component.addEventListener(transitionEvent, transitionCelticArrowstate1tostate2EndedHandler);

    removeAllClassesButFirst(component, 'state1-to-state2');
    addClass(component, 'state2');
    addClass(component, 'state1-to-state2');
}



// Javascript for component Celtic Arrow
// Longest animation for Transition 2 is this;group
// Transition 2: From state2 to state3

function clickCelticArrow2Handler(event) {
  var component = document.querySelector('.celtic-arrow');
  if (isCurrentState(component, 'state2')) {
    try {
    //  console.log('Listener for event: click triggered. State: state2');
      setTimeout(function() {
        var component = document.querySelector('.celtic-arrow');
        component.addEventListener(transitionEvent, transitionCelticArrowstate2tostate3EndedHandler);
        removeAllClassesButFirst(component, 'state2-to-state3');
        addClass(component, 'state3');
        addClass(component, 'state2-to-state3');
      }, 0);
    }
    catch (e) {
      console.log(e)
    }
  }
}

function transitionCelticArrowstate2tostate3EndedHandler(event) {
  
  if (event.target.className.trim() == 'group' ||
      event.target.className.startsWith('group ')) {
    var component = document.querySelector('.celtic-arrow');
    component.removeEventListener(transitionEvent, transitionCelticArrowstate2tostate3EndedHandler);
    //console.log('transitionCelticArrowstate2tostate3EndedHandler()');
    // timer
    setTimeout(function () {
      var component = document.querySelector('.celtic-arrow');
      component.addEventListener(transitionEvent, transitionCelticArrowstate3tostate1EndedHandler);
      removeAllClassesButFirst(component, 'state3-to-state1');
      addClass(component, 'state1');
      addClass(component, 'state3-to-state1');
    }, 0);
  }
}



// Transition CelticArrow state2-to-state3 Event Listeners
    // click state2 state1
child = document.querySelector('.celtic-arrow .group');
if (child) {
  child.addEventListener('click', clickCelticArrow2Handler);
    child.style['cursor'] = 'pointer';
}
else {
  console.log('Could not find element at: .celtic-arrow .group');
}

// Javascript for component Celtic Arrow
// Longest animation for Transition 3 is this;group;shape2
// Transition 3: From state3 to state1


function transitionCelticArrowstate3tostate1EndedHandler(event) {
  
  if (event.target.className.trim() == 'shape2' ||
      event.target.className.startsWith('shape2 ')) {
    var component = document.querySelector('.celtic-arrow');
    component.removeEventListener(transitionEvent, transitionCelticArrowstate3tostate1EndedHandler);
    //console.log('transitionCelticArrowstate3tostate1EndedHandler()');
    // mouseenter
  }
}



// Transition CelticArrow state3-to-state1 Event Listeners
    // timer state3 state1

// Javascript for component Celtic Arrow
// Longest animation for Transition 4 is this;group;shape2
// Transition 4: From state2 to state1

function mouseleaveCelticArrow4Handler(event) {
  var component = document.querySelector('.celtic-arrow');
  if (isCurrentState(component, 'state2')) {
    try {
    //  console.log('Listener for event: mouseleave triggered. State: state2');
      setTimeout(function() {
        var component = document.querySelector('.celtic-arrow');
        component.addEventListener(transitionEvent, transitionCelticArrowstate2tostate1EndedHandler);
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

function transitionCelticArrowstate2tostate1EndedHandler(event) {
  
  if (event.target.className.trim() == 'shape2' ||
      event.target.className.startsWith('shape2 ')) {
    var component = document.querySelector('.celtic-arrow');
    component.removeEventListener(transitionEvent, transitionCelticArrowstate2tostate1EndedHandler);
    //console.log('transitionCelticArrowstate2tostate1EndedHandler()');
    // mouseenter
  }
}



// Transition CelticArrow state2-to-state1 Event Listeners
    // mouseleave state2 state1
child = document.querySelector('.celtic-arrow .group');
if (child) {
  child.addEventListener('mouseleave', mouseleaveCelticArrow4Handler);
}
else {
  console.log('Could not find element at: .celtic-arrow .group');
}

